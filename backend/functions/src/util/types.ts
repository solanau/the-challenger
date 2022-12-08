export type SubmissionStatus = 'pending' | 'invalid' | 'complete';

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
    | 'Feedback';

export interface BaseFieldConfig {
    name: string;
    label: string;
    key: string;
    placeholder: string;
    maxLength?: number;
}

export type TextFieldConfig = BaseFieldConfig & {
    type: 'text';
};

export type TextAreaFieldConfig = BaseFieldConfig & {
    type: 'textArea';
    rows?: number;
};

export type NumberFieldConfig = BaseFieldConfig & {
    type: 'number';
};

export type EmailFieldConfig = BaseFieldConfig & {
    type: 'email';
};

export type FieldConfig =
    | TextFieldConfig
    | TextAreaFieldConfig
    | NumberFieldConfig
    | EmailFieldConfig;

export interface SubmissionAnswer {
    question: string;
    reply: string;
    isApproved: boolean;
    comments: string;
}

export interface EventPayload {
    title: string;
    description: string;
    userId: string;
    challenges: string[];
    version: number;
    isNew: boolean;
    createdAt: number;
    updatedAt: number;
    startDate?: number;
    endDate?: number;
    reviewers?: string[];
    managers?: string[];
}

export interface ChallengePayload {
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
}

export interface PrizePayload {
    pubkey: string;
    challengePubkey: string;
    mintPubkey: string;
    mintControl: number;
    escrowOrMintAuthority: string;
    quantity: number;
}

export interface CreateEventPayload {
    id: string;
    title: string;
    description: string;
}

export interface UpdateEventPayload {
    id: string;
    data: {
        title: string;
        description: string;
        challenges: string[];
    };
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
    };
}

export interface CreateSubmissionPayload {
    id: string;
    eventId: string;
    challengeId: string;
    answers: SubmissionAnswer[];
}

export type ReviewSubmissionPayload = {
    id: string;
    eventId: string;
    answers: { isApproved: boolean; comments: string }[];
    status: SubmissionStatus;
    comments: string;
};

export interface PrizeMintMetadataPayload {
    pubkey: string;
    challengePubkey: string;
    mintPubkey: string;
    mintTitle: string;
    mintSymbol: string;
    mintUri: string;
    decimals: number;
    escrowOrMintAuthority: string;
    quantity: number;
}

export interface MintPayload {
    pubkey: string;
    mintTitle: string;
    mintSymbol: string;
    mintUri: string;
    decimals: number;
}

export interface IssueRewardsPayload {
    challengePubkey: string;
    userPubkey: string;
}

export interface ProfilePayload {
    pubkey: string;
    username: string;
}

export interface Auth {
    id: string;
    email: string;
}

export interface SetUserPayload {
    fullName: string;
    userName: string;
    walletPublicKey: string;
}

export interface SubmissionPayload {
    eventId: string;
    challengeId: string;
    title: string;
    description: string;
    userId: string;
    createdAt: number;
    updatedAt: number;
    isNew: boolean;
    version: number;
    basePoints: number;
    totalPoints: number;
    timeBonusPoints: number;
    isProcessed: boolean;
    status: SubmissionStatus;
    answers: SubmissionAnswer[];
    comments: string;
}

export interface UpdateLeaderBoardPayload {
    eventId: string;
}

export interface Participant {
    userId: string;
    points: number;
}

export interface LeaderBoard {
    totalPoints: number;
    participants: Participant[];
}
