export type EventStatus = 'active' | 'draft';
import { ChallengePayload } from './challenge';

export interface EventPayload {
    id: string;
    title: string;
    description: string;
    location: string;
    startDate: number;
    endDate: number;
    status?: EventStatus;
    reviewers: string[];
    managers: string[];
    challenges: (ChallengePayload & { position: number })[];
}

export interface CreateEventPayload {
    id: string;
    title: string;
    description: string;
}

export interface UpdateEventPayload {
    title: string;
    description: string;
    startDate: number;
    endDate: number;
    challenges: ChallengePayload[];
    reviewers: string[];
    managers: string[];
}

export interface EventSettingsFormData {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    challenges: string[];
    reviewers: string;
    managers: string;
}
