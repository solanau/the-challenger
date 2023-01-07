import {
    ActiveChallenge,
    BaseChallenge,
    Challenge,
    ChallengeCategory,
    ChallengeDifficulty,
    ChallengePayload,
    ChallengeSettingsFormData,
    ChallengeTimeStatus,
    CreateSubmissionPayload,
    EventPayload,
    ExpiredChallenge,
    PendingChallenge,
    SubmissionPayload,
} from 'types';
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
    event: EventPayload,
): ChallengeTimeStatus => {
    const now = new Date(Date.now());
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

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

export const getChallengeExpiresIn = (event: EventPayload): string => {
    const now = new Date(Date.now());
    const endDate = new Date(event.endDate);

    const status = getChallengeStatus(event);

    if (status !== 'active') {
        return null;
    }

    return getRelativeTime(endDate.getTime() - now.getTime());
};

export const getChallengeStartsIn = (event: EventPayload): string => {
    const now = new Date(Date.now());
    const startDate = new Date(event.startDate);

    const status = getChallengeStatus(event);

    if (status !== 'pending') {
        return null;
    }

    return getRelativeTime(startDate.getTime() - now.getTime());
};

export const getChallengeExpiredAgo = (event: EventPayload): string => {
    const now = new Date(Date.now());
    const endDate = new Date(event.endDate);

    const status = getChallengeStatus(event);

    if (status !== 'expired') {
        return null;
    }

    return getRelativeTime(endDate.getTime() - now.getTime());
};

export const getChallengeProgress = (event: EventPayload): number => {
    const now = new Date(Date.now());
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

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

export const getChallengeBonus = (
    event: EventPayload,
    challenge: ChallengePayload,
): number => {
    const maxBonus = challenge.points * (TIME_REWARD_PERCENTAGE / 100);
    const progress = 100 - getChallengeProgress(event);

    if (progress === 0) {
        return maxBonus;
    }

    return Math.floor(maxBonus * (progress / 100));
};

export const toChallenge = (
    event: EventPayload,
    challenge: ChallengePayload,
    submissions: SubmissionPayload[],
    position: number,
): Challenge => {
    const challengeSubmissions = submissions.filter(
        submission => submission.challengeId === challenge.id,
    );
    const isSubmitted =
        submissions.length > 0 && challengeSubmissions.length > 0;
    let submissionStatus = undefined;
    if (isSubmitted) {
        for (const sub of challengeSubmissions) {
            submissionStatus = sub.status;
            if (sub.status == 'completed') break;
        }
    }
    return {
        ...challenge,
        position,
        startDate: event.startDate,
        endDate: event.endDate,
        timeStatus: getChallengeStatus(event),
        expiresIn: getChallengeExpiresIn(event),
        startsIn: getChallengeStartsIn(event),
        expiredAgo: getChallengeExpiredAgo(event),
        progress: getChallengeProgress(event),
        bonus: getChallengeBonus(event, challenge),
        isSubmitted,
        submissionStatus,
    };
};

export const fromChallengeSettingsFormData = (
    values: ChallengeSettingsFormData,
) => ({
    ...values,
    difficulty: values.difficulty as ChallengeDifficulty,
    category: values.category as ChallengeCategory,
    fieldsConfig: values.fieldsConfig.map(fieldConfig => {
        switch (fieldConfig.type) {
            case 'text': {
                return {
                    name: fieldConfig.name,
                    label: fieldConfig.label,
                    placeholder: fieldConfig.placeholder,
                    type: fieldConfig.type,
                    maxLength: fieldConfig.maxLength,
                };
            }

            case 'textArea': {
                return {
                    name: fieldConfig.name,
                    label: fieldConfig.label,
                    placeholder: fieldConfig.placeholder,
                    type: fieldConfig.type,
                    maxLength: fieldConfig.maxLength,
                    rows: fieldConfig.rows,
                };
            }

            default: {
                return {
                    name: fieldConfig.name,
                    label: fieldConfig.label,
                    placeholder: fieldConfig.placeholder,
                    type: fieldConfig.type,
                };
            }
        }
    }),
});
