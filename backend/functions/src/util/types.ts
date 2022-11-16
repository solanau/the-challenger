

export type EventPayload = {
    pubkey: string,
    authority: string,
    title: string,
    description: string,
    location: string,
    host: string,
    date: string,
}

export type ChallengePayload = {
    id: string,
    pubkey: string,
    eventPubkey: string,
    key: number,
    iconKey: number,
    iconSize: number,
    title: string,
    type: string,
    difficulty: string,
    description: string,
    shortDescription: string,
    githubUrl: string,
    authorName?: string,
    authorGithub?: string,
    authorTwitter?: string,
    rewardValue: number,
    rewardType: string,
    nftBadge?: boolean,
    authorWebsite?: string,
    authorLogo?: string,
    sponsorALink?: string,
    sponsorALogo?: string,
    sponsorBLink?: string,
    sponsorBLogo?: string,
    mint?: string,
    name?: string,
    owner?: string,
    state?: 'open' | 'closed',
    tags?: { value: string }[],
    rank?: number,
    formComponents: any[]
    createdAt: string,
    startDate: string,
    endDate: string,
}

export type PrizePayload = {
    pubkey: string,
    challengePubkey: string,
    mintPubkey: string,
    mintControl: number,
    escrowOrMintAuthority: string,
    quantity: number,
}

export type SubmissionPayload = {
    challengeId: string,
    challengePubkey: string,
    // userPubkey: string,
    username: string,
    answers: any[],
}

export type PrizeMintMetadataPayload = {
    pubkey: string,
    challengePubkey: string,
    mintPubkey: string,
    mintTitle: string,
    mintSymbol: string,
    mintUri: string,
    decimals: number,
    escrowOrMintAuthority: string,
    quantity: number,
}

export type MintPayload = {
    pubkey: string,
    mintTitle: string,
    mintSymbol: string,
    mintUri: string,
    decimals: number,
}

export type IssueRewardsPayload = {
    challengePubkey: string,
    userPubkey: string,
}