import { ChallengeData, ChallengeTimeStatus } from 'types/api/challenge';
import { getRelativeTime } from './time';

const TIME_REWARD_PERCENTAGE = 20;

export const getChallengeStatus = (
    challenge: ChallengeData,
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

export const getChallengeExpiresIn = (challenge: ChallengeData): string => {
    const now = new Date(Date.now());
    const endDate = new Date(challenge.endDate);

    const status = getChallengeStatus(challenge);

    if (status !== 'active') {
        return null;
    }

    return getRelativeTime(endDate.getTime() - now.getTime());
};

export const getChallengeStartsIn = (challenge: ChallengeData): string => {
    const now = new Date(Date.now());
    const startDate = new Date(challenge.startDate);

    const status = getChallengeStatus(challenge);

    if (status !== 'pending') {
        return null;
    }

    return getRelativeTime(startDate.getTime() - now.getTime());
};

export const getChallengeExpiredAgo = (challenge: ChallengeData): string => {
    const now = new Date(Date.now());
    const endDate = new Date(challenge.endDate);

    const status = getChallengeStatus(challenge);

    if (status !== 'expired') {
        return null;
    }

    return getRelativeTime(endDate.getTime() - now.getTime());
};

export const getChallengeProgress = (challenge: ChallengeData): number => {
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

export const getChallengeBonus = (challenge: ChallengeData): number => {
    const maxBonus = challenge.rewardValue * (TIME_REWARD_PERCENTAGE / 100);
    const progress = 100 - getChallengeProgress(challenge);

    if (progress === 0) {
        return maxBonus;
    }

    return Math.floor(maxBonus * (progress / 100));
};
