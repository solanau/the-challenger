import { ChallengePayload, SubmissionPayload } from 'types/api';
import {
    ActiveChallenge,
    BaseChallenge,
    ChallengeReviewStatus,
    ChallengeTimeStatus,
    ChallengeView,
    ExpiredChallenge,
    PendingChallenge,
} from 'types/challenge';
import { Issue } from 'types/github';
import { getRelativeTime } from './time';

const TIME_REWARD_PERCENTAGE = 20;

export const isActiveChallenge = (
    challenge: BaseChallenge,
): challenge is ActiveChallenge => challenge.timeStatus === 'active';

export const isPendingChallenge = (
    challenge: BaseChallenge,
): challenge is PendingChallenge => challenge.timeStatus === 'pending';

export const isExpiredChallenge = (
    challenge: BaseChallenge,
): challenge is ExpiredChallenge => challenge.timeStatus === 'expired';

export const getChallengeStatus = (
    challenge: ChallengePayload,
): ChallengeTimeStatus => {
    const now = new Date(Date.now());
    const startDate = new Date(challenge.startDate);
    const endDate = new Date(challenge.endDate);

    if (now.getTime() > endDate.getTime()) {
        return 'expired';
    }

    if (startDate.getTime() <= now.getTime()) {
        return 'active';
    }

    return 'pending';
};

export const getChallengeAlreadySubmitted = async (
    issuesByAssignee: Issue[],
    challenge: ChallengePayload,
): Promise<boolean> => {
    for (const labels of issuesByAssignee.map(issue => issue.labels)) {
        for (const labelName of labels.map(label => label.name)) {
            if (labelName === `challengeId:${challenge.id}`) {
                return true;
            }
        }
    }
    return false;
};

export const getChallengeAlreadySubmittedFirebase = (
    userSubmissions: SubmissionPayload[],
    challenge: ChallengePayload,
): boolean => {
    for (const sub of userSubmissions) {
        if (sub.challengeId === challenge.uid) {
            return true;
        }
    }
    return false;
};

export const getChallengeExpiresIn = (challenge: ChallengePayload): string => {
    const now = new Date(Date.now());
    const endDate = new Date(challenge.endDate);

    const status = getChallengeStatus(challenge);

    if (status !== 'active') {
        return null;
    }

    return getRelativeTime(endDate.getTime() - now.getTime());
};

export const getChallengeStartsIn = (challenge: ChallengePayload): string => {
    const now = new Date(Date.now());
    const startDate = new Date(challenge.startDate);

    const status = getChallengeStatus(challenge);

    if (status !== 'pending') {
        return null;
    }

    return getRelativeTime(startDate.getTime() - now.getTime());
};

export const getChallengeExpiredAgo = (challenge: ChallengePayload): string => {
    const now = new Date(Date.now());
    const endDate = new Date(challenge.endDate);

    const status = getChallengeStatus(challenge);

    if (status !== 'expired') {
        return null;
    }

    return getRelativeTime(endDate.getTime() - now.getTime());
};

export const getChallengeProgress = (challenge: ChallengePayload): number => {
    const now = new Date(Date.now());
    const startDate = new Date(challenge.startDate);
    const endDate = new Date(challenge.endDate);

    if (now.getTime() < startDate.getTime()) {
        return 0;
    } else if (now.getTime() < endDate.getTime()) {
        const total = endDate.getTime() - startDate.getTime();
        const elapsed = now.getTime() - startDate.getTime();

        return Math.floor((elapsed / total) * 100);
    } else {
        return 100;
    }
};

export const getChallengeBonus = (challenge: ChallengePayload): number => {
    const maxBonus = challenge.rewardValue * (TIME_REWARD_PERCENTAGE / 100);
    const progress = 100 - getChallengeProgress(challenge);

    if (progress === 0) {
        return maxBonus;
    }

    return Math.floor(maxBonus * (progress / 100));
};

export const toChallenge = async (
    issuesByAssignee: Issue[],
    challenge: ChallengePayload,
): Promise<ChallengeView> => ({
    ...challenge,
    timeStatus: getChallengeStatus(challenge),
    submittedStatus: await getChallengeAlreadySubmitted(
        issuesByAssignee,
        challenge,
    ),
    expiresIn: getChallengeExpiresIn(challenge),
    startsIn: getChallengeStartsIn(challenge),
    expiredAgo: getChallengeExpiredAgo(challenge),
    progress: getChallengeProgress(challenge),
    bonus: getChallengeBonus(challenge),
});

export const toChallengeFirebase = (
    userSubmissions: SubmissionPayload[],
    challenge: ChallengePayload,
): ChallengeView => ({
    ...challenge,
    timeStatus: getChallengeStatus(challenge),
    submittedStatus: getChallengeAlreadySubmittedFirebase(
        userSubmissions,
        challenge,
    ),
    expiresIn: getChallengeExpiresIn(challenge),
    startsIn: getChallengeStartsIn(challenge),
    expiredAgo: getChallengeExpiredAgo(challenge),
    progress: getChallengeProgress(challenge),
    bonus: getChallengeBonus(challenge),
});

export const getChallengeIdAndCompletionStatusForIssue = (
    issue: Issue,
): [string, ChallengeReviewStatus] => {
    let challengeId: string = null;
    let completionStatus: ChallengeReviewStatus = 'pending';

    for (const label of issue.labels) {
        if (label.name.match(RegExp('challengeId:'))) {
            challengeId = label.name.replace('challengeId:', '');
        }
        if (label.name === 'completed') {
            completionStatus = 'accepted';
        } else if (label.name === 'incorrect') {
            completionStatus = 'incorrect';
        } else if (label.name === 'invalid') {
            completionStatus = 'invalid';
        }
    }

    return [challengeId, completionStatus];
};

export const mapifyChallengePayloadList = (
    challengePayloadList: Omit<
        ChallengePayload,
        'pubkey' | 'eventPubkey' | 'eventId'
    >[],
) => {
    const map = new Map<
        string,
        Omit<ChallengePayload, 'pubkey' | 'eventPubkey' | 'eventId'>
    >();
    for (const c of challengePayloadList) {
        if (!map.has(c.id)) map.set(c.id, c);
    }
    return map;
};

export const getSubmittedChallengesForUserWithStatus = (
    userIssues: Issue[],
    challengesList: Omit<
        ChallengePayload,
        'pubkey' | 'eventPubkey' | 'eventId'
    >[],
): [
    Omit<ChallengePayload, 'pubkey' | 'eventPubkey' | 'eventId'>[],
    Omit<ChallengePayload, 'pubkey' | 'eventPubkey' | 'eventId'>[],
    Omit<ChallengePayload, 'pubkey' | 'eventPubkey' | 'eventId'>[],
    Omit<ChallengePayload, 'pubkey' | 'eventPubkey' | 'eventId'>[],
] => {
    const challengeMap = mapifyChallengePayloadList(challengesList);

    const completedChallenges: Omit<
        ChallengePayload,
        'pubkey' | 'eventPubkey' | 'eventId'
    >[] = [];
    const incorrectChallenges: Omit<
        ChallengePayload,
        'pubkey' | 'eventPubkey' | 'eventId'
    >[] = [];
    const invalidChallenges: Omit<
        ChallengePayload,
        'pubkey' | 'eventPubkey' | 'eventId'
    >[] = [];
    const pendingChallenges: Omit<
        ChallengePayload,
        'pubkey' | 'eventPubkey' | 'eventId'
    >[] = [];

    userIssues
        .map(i => getChallengeIdAndCompletionStatusForIssue(i))
        .forEach(([challengeId, completionStatus]) => {
            const val = challengeMap.get(challengeId);
            if (val) {
                if (completionStatus === 'accepted') {
                    completedChallenges.push(val);
                }
                if (completionStatus === 'incorrect') {
                    incorrectChallenges.push(val);
                }
                if (completionStatus === 'invalid') {
                    invalidChallenges.push(val);
                }
                if (completionStatus === 'pending') {
                    pendingChallenges.push(val);
                }
            }
        });

    return [
        completedChallenges,
        incorrectChallenges,
        invalidChallenges,
        pendingChallenges,
    ];
};
