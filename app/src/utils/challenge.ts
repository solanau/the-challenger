import { ChallengePayload, CreateSubmissionPayload } from 'types/api';
import {
    ActiveChallenge,
    BaseChallenge, Challenge, ChallengeTimeStatus, ExpiredChallenge,
    PendingChallenge
} from 'types/challenge';
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


export const getChallengeAlreadySubmittedFirebase = (
    userSubmissions: CreateSubmissionPayload[],
    challenge: ChallengePayload,
): boolean => {
    for (const sub of userSubmissions) {
        if (sub.challengeId === challenge.id) {
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


export const toChallenge = (
    userSubmissions: CreateSubmissionPayload[],
    challenge: ChallengePayload,
): Challenge => ({
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