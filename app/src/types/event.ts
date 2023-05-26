import { ChallengePayload } from './challenge';

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
    minChallengesToCertificate?: string;
    candyMachineAddress?: string;
    collectionUpdateAuthority?: string;
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
    minChallengesToCertificate?: string;
    candyMachineAddress?: string;
    collectionUpdateAuthority?: string;
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
