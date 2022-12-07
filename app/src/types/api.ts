export interface PrizePayload {
    pubkey: string;
    challengePubkey: string;
    mintPubkey: string;
    mintControl: number;
    escrowOrMintAuthority: string;
    quantity: number;
}

export interface CreateSubmissionAnswerPayload {
    question: string;
    reply: string;
}

export interface CreateSubmissionPayload {
    id: string;
    challengeId: string;
    answers: CreateSubmissionAnswerPayload[];
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

export type UpdateLeaderBoardPayload = {
    eventId: string;
};

export enum AuthProviderType {
    githubProvider = 'github',
    facebookProvider = 'facebook',
    twitterProvider = 'twitter',
    emailProvider = 'email',
}

// export type AuthProviderType = 'github' | 'facebook' | 'twitter' | 'email';
