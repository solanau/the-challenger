export type SubmissionStatus = 'pending' | 'invalid' | 'complete';

export type ConfigPayload = {
    id: number;
    masterWalletPubkey: string;
    eventPubkey: string;
    potPubkey: string;
    potEscrowPubkey: string;
    xpTokenPubkey: string;
    nftBadgePubkeyEasy: string;
    nftBadgePubkeyMedium: string;
    nftBadgePubkeyHard: string;
};

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

export type EventPayload = {
    pubkey: string;
    authority: string;
    title: string;
    description: string;
    location: string;
    host: string;
    date: string;
};

export type PotPayload = {
    pubkey: string;
    eventPubkey: string;
    mint: string;
    escrowOrMintAuthority: string;
    mintControl: number;
    pot: number;
};

export type ChallengePayload = {
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
};

export type PrizePayload = {
    pubkey: string;
    challengePubkey: string;
    mintPubkey: string;
    mintControl: number;
    escrowOrMintAuthority: string;
    quantity: number;
};

export type CreateSubmissionPayload = {
    id: string;
    eventId: string;
    challengeId: string;
    answers: SubmissionAnswer[];
};

export type UpdateSubmissionStatusPayload = {
    id: string;
    status: SubmissionStatus;
    eventId: string;
};

export type PrizeMintMetadataPayload = {
    pubkey: string;
    challengePubkey: string;
    mintPubkey: string;
    mintTitle: string;
    mintSymbol: string;
    mintUri: string;
    decimals: number;
    escrowOrMintAuthority: string;
    quantity: number;
};

export type MintPayload = {
    pubkey: string;
    mintTitle: string;
    mintSymbol: string;
    mintUri: string;
    decimals: number;
};

export type IssueRewardsPayload = {
    challengePubkey: string;
    userPubkey: string;
};

export type IssueRewardsBatchPayload = {
    earnerPubkey: string;
    challengePubkeys: string[];
};

export type IssuePayoutPayload = {
    potPubkey: string;
    userPubkey: string;
    amount: number;
};

export type ProfilePayload = {
    pubkey: string;
    username: string;
};

export interface Auth {
    id: string;
    email: string;
}

export interface SetUserPayload {
    fullName: string;
    userName: string;
    walletPublicKey: string;
}

export interface Submission {
    id: string;
    eventId: string;
    challengeId: string;
    challenge: ChallengePayload;
    userId: string;
    createdAt: number;
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
