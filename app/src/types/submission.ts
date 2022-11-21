import { FieldConfig } from './form';

export type SubmissionStatus =
    | 'pending'
    | 'invalid'
    | 'incorrect'
    | 'completed';

export interface SubmissionChallenge {
    title: string;
    description: string;
    rewardValue: number;
}

export interface SubmissionAnswer {
    field: FieldConfig;
    value: string;
}

export interface Submission {
    id: string;
    challengeId: string;
    answers: SubmissionAnswer[];
    eventId: string;
    userId: string;
    status: SubmissionStatus;
    challenge: SubmissionChallenge;
}
