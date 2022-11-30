import { ChallengePayload } from './challenge';
import { FieldConfig } from './form';

export type SubmissionStatus =
    | 'pending'
    | 'invalid'
    | 'incorrect'
    | 'completed';

export interface SubmissionAnswerPayload {
    field: FieldConfig;
    value: string;
}

export interface SubmissionPayload {
    id: string;
    challengeId: string;
    answers: SubmissionAnswerPayload[];
    eventId: string;
    userId: string;
    status: SubmissionStatus;
    challenge: ChallengePayload;
    createdAt: number;
    basePoints: number;
    timeBonusPoints: number;
    totalPoints: number;
}
