import { ChallengePayload } from './challenge';


export interface ParticipationNFT {
    minChallengesToCertificate: string;
    candyMachineAddress: string;
    collectionUpdateAuthority: string;
    maxUsersToCertificate: string;
}
export interface TopLeaderboardNFT {
    minPoints: string;
    candyMachineAddress: string;
    collectionUpdateAuthority: string;
    maxUsersToCertificate: string;
}
export interface EventPayload {
    id: string;
    title: string;
    description: string;
    body: string;
    location: string;
    startDate: number;
    endDate: number;
    reviewers: string[];
    managers: string[];
    challenges: (ChallengePayload & { position: number })[];
    participationNFT?: ParticipationNFT
    topLeaderboardNFT?: TopLeaderboardNFT
}

export interface CreateEventPayload {
    title: string;
    body: string;
    description: string;
}

export interface UpdateEventPayload {
    title: string;
    description: string;
    body: string;
    startDate: number;
    endDate: number;
    challenges: ChallengePayload[];
    reviewers: string[];
    managers: string[];
    participationNFT?: ParticipationNFT,
    topLeaderboard?: TopLeaderboardNFT,
}

export interface EventSettingsFormData {
    title: string;
    description: string;
    body: string;
    startDate: string;
    endDate: string;
    challenges: string[];
    reviewers: string;
    managers: string;
    minChallengesToCertificate?: string;
    candyMachineAddress?: string;
    collectionUpdateAuthority?: string;
}
