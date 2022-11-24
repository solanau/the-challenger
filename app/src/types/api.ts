import { ChallengeType } from './challenge';
import { FieldConfig } from './form';
import { SubmissionAnswer, SubmissionStatus } from './submission';

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

export interface PrizePayload {
    pubkey: string;
    challengePubkey: string;
    mintPubkey: string;
    mintControl: number;
    escrowOrMintAuthority: string;
    quantity: number;
}

export interface CreateSubmissionPayload {
    id: string;
    challengeId: string;
    answers: SubmissionAnswer[];
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

export interface SetUserPayload {
    fullName: string;
    userName: string;
    walletPublicKey: string;
}

export type UpdateSubmissionStatusPayload = {
    eventId: string;
    id: string;
    status: SubmissionStatus;
};

export type UpdateLeaderBoardPayload = {
    eventId: string;
};
