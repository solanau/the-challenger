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
    field: string;
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
    field: FieldConfig;
    value: string;
}

export interface EventPayload {
    pubkey: string;
    authority: string;
    title: string;
    description: string;
    location: string;
    host: string;
    date: string;
}

export interface ChallengePayload {
    uid: string;
    eventId?: string;
    id: string;
    pubkey: string;
    eventPubkey: string;
    key: number;
    iconKey: number;
    iconSize: number;
    title: string;
    type: string;
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
    formComponents: any[];
    createdAt: string;
    startDate: string;
    endDate: string;
}

export interface EventPayload2 {
    title: string;
    description: string;
    startDate: number;
    endDate: number;
    challenges: string[];
    reviewers: string[];
    managers: string[];
}

export interface ChallengePayload2 {
    title: string;
    description: string;
    category: ChallengeCategory;
    difficulty: ChallengeDifficulty;
    points: number;
    createdAt: number;
    updatedAt: number;
    isNew: boolean;
    fieldsConfig: FieldConfig[];
    authorName: string;
    authorGithub: string;
    authorTwitter: string;
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

export interface UpdateSubmissionStatusPayload {
    id: string;
    status: SubmissionStatus;
    eventId: string;
}

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
    challenge: ChallengePayload2 & { id: string };
    userId: string;
    createdAt: number;
    basePoints: number;
    totalPoints: number;
    timeBonusPoints: number;
    isProcessed: boolean;
    status: SubmissionStatus;
    answers: SubmissionAnswer[];
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
