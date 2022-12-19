import { FieldConfig } from './form';

export type ChallengeStatus = 'active' | 'draft';

export type ChallengeTimeStatus = 'active' | 'pending' | 'expired';

export type ChallengeReviewStatus =
    | 'accepted'
    | 'incorrect'
    | 'invalid'
    | 'pending';

export type ChallengeDifficulty = 'Easy' | 'Medium' | 'Hard';

export type ChallengeCategory =
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
    | 'Pay'
    | 'Feedback';

export interface BaseChallenge {
    id: string;
    title: string;
    category: ChallengeCategory;
    difficulty: ChallengeDifficulty;
    description: string;
    points: number;
    createdAt: number;
    startDate: number;
    endDate: number;
    authorName: string;
    authorGithub: string;
    authorTwitter: string;
    timeStatus: ChallengeTimeStatus;
    isSubmitted: boolean;
    progress: number;
    bonus: number;
    position: number;
    fieldsConfig: FieldConfig[];
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
    id: string;
    title: string;
    description: string;
    createdAt: number;
    updatedAt: number;
    isNew: boolean;
    version: number;
    userId: string;
    fieldsConfig?: FieldConfig[];
    category?: ChallengeCategory;
    difficulty?: ChallengeDifficulty;
    points?: number;
    authorName?: string;
    authorGithub?: string;
    authorTwitter?: string;
    status?: ChallengeStatus;
}

export interface CreateChallengePayload {
    id: string;
    title: string;
    description: string;
}

export interface UpdateChallengePayload {
    id: string;
    data: {
        title: string;
        description: string;
        category: ChallengeCategory;
        difficulty: ChallengeDifficulty;
        points: number;
        authorName: string;
        authorGithub: string;
        authorTwitter: string;
        status?: ChallengeStatus;
    };
}

export interface PublishChallengePayload {
    id: string;
}

export interface ChallengeSettingsFormData {
    title: string;
    description: string;
    points: number;
    difficulty: string;
    category: string;
    authorGithub: string;
    authorTwitter: string;
    authorName: string;
    fieldsConfig: FieldConfig[];
}
