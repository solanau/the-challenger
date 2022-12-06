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

export type CreateChallengePayload = Partial<ChallengeDoc> & {
    title: string;
    description: string;
    tags: string;
};

export type UpdateChallengePayload = Partial<ChallengeDoc> & {
    id: string;
};

export type CreateUpdateChallengeResponse = Partial<ChallengeDoc> & {
    id: string;
    publicKey: string;
};

export type ChallengeDoc = {
    uid?: string;
    eventId?: string;
    id: string;
    publicKey: string;
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
    timeStatus: ChallengeTimeStatus;
    submittedStatus: boolean;
    progress: number;
    bonus: number;
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
    tags?: string;
    rank?: number;
    formComponents: FieldConfig[];
    createdAt: string;
    startDate: string;
    endDate: string;
};
