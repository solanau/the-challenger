import { ChallengeType } from './challenge';

export type SubmissionStatus = 'pending' | 'invalid' | 'incorrect' | 'complete';

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

export type SubmissionPayload = {
    id: string;
    challengeId: string;
    challengePubkey: string;
    userPubkey: string;
    username: string;
    answers: any[];
    eventId: string;
    status: SubmissionStatus;
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
    userPubkey: string;
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
