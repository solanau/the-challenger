import { FieldConfig } from './form';

export type ChallengeTimeStatus = 'active' | 'pending' | 'expired';

export type ChallengeReviewStatus =
    | 'accepted'
    | 'incorrect'
    | 'invalid'
    | 'pending';

export type ChallengeType =
    | 'Social'
    | 'NFT'
    | 'Game'
    | 'Deploy'
    | 'SPL Token'
    | 'Solana'
    | 'Video'
    | 'Wallet'
    | 'Concept'
    | 'Staking'
    | 'Client'
    | 'SDK'
    | 'Feedback';

export interface BaseChallenge {
    createdAt: string;
    description: string;
    shortDescription: string;
    githubUrl: string;
    difficulty: string;
    uid?: string;
    id: string;
    pubkey: string;
    key: number;
    type: ChallengeType;
    title: string;
    rewardValue: number;
    rewardType: string;
    startDate: string;
    endDate: string;
    timeStatus: ChallengeTimeStatus;
    submittedStatus: boolean;
    progress: number;
    bonus: number;
    iconKey: number;
    iconSize: number;
    formComponents: FieldConfig[];
    authorTwitter?: string;
    authorGithub?: string;
    eventPubkey: string;
}

export type ActiveChallenge = BaseChallenge & {
    timeStatus: 'active';
    expiresIn: string;
};

export type PendingChallenge = BaseChallenge & {
    timeStatus: 'pending';
    startsIn: string;
};

export type ExpiredChallenge = BaseChallenge & {
    timeStatus: 'expired';
    expiredAgo: string;
};

export type Challenge = ActiveChallenge | PendingChallenge | ExpiredChallenge;

export interface ChallengePayload {
    uid?: string;
    eventId?: string;
    id: string;
    pubkey: string;
    eventPubkey: string;
    key: number;
    iconKey: number;
    iconSize: number;
    title: string;
    type: ChallengeType;
    difficulty: string;
    description: string;
    shortDescription: string;
    githubUrl: string;
    authorName?: string;
    authorGithub?: string;
    authorTwitter?: string;
    rewardValue: number;
    rewardType: string;
    nftBadge?: boolean;
    authorWebsite?: string;
    authorLogo?: string;
    sponsorALink?: string;
    sponsorALogo?: string;
    sponsorBLink?: string;
    sponsorBLogo?: string;
    mint?: string;
    name?: string;
    owner?: string;
    state?: 'open' | 'closed';
    tags?: { value: string }[];
    rank?: number;
    formComponents: FieldConfig[];
    createdAt: string;
    startDate: string;
    endDate: string;
}

export interface CreateChallengePayload {
    title: string;
    description: string;
}
