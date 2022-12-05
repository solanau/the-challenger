import { ChallengeType } from './challenge';
import { FieldConfig } from './form';
import { SubmissionAnswerPayload, SubmissionStatus } from './submission';

export interface ConfigPayload {
    id: number;
    masterWalletPubkey: string;
    eventPubkey: string;
    potPubkey: string;
    potEscrowPubkey: string;
    xpTokenPubkey: string;
    nftBadgePubkeyEasy: string;
    nftBadgePubkeyMedium: string;
    nftBadgePubkeyHard: string;
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

export interface EventData {
    pubKey: string;
    firebaseEventId: string;
}

export interface PotPayload {
    pubkey: string;
    eventPubkey: string;
    mint: string;
    escrowOrMintAuthority: string;
    mintControl: number;
    pot: number;
}

export interface ChallengePayload {
    id: string;
    pubkey: string;
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

export interface PrizePayload {
    pubkey: string;
    eventPubkey: string;
    challengePubkey: string;
    mintPubkey: string;
    mintControl: number;
    escrowOrMintAuthority: string;
    quantity: number;
}

export interface CreateSubmissionPayload {
    id: string;
    challengeId: string;
    answers: SubmissionAnswerPayload[];
    eventId: string;
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
    eventPubkey: string;
    challengePubkey: string;
    userPubkey: string;
}

export interface IssueRewardsBatchPayload {
    earnerPubkey: string;
    challengePubkeys: string[];
}

export interface IssuePayoutPayload {
    potPubkey: string;
    userPubkey: string;
    amount: number;
}

export interface ProfilePayload {
    pubkey: string;
    username: string;
}

export interface SetUserPayload {
    fullName: string;
    userName: string;
    walletPublicKey: string;
}

export interface UpdateLeaderBoardPayload {
    eventId: string;
}
