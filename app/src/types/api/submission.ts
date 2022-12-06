import { FieldConfig } from '../form';

export type SubmissionStatus =
    | 'pending'
    | 'invalid'
    | 'incorrect'
    | 'completed';

export interface SubmissionAnswerData {
    field: FieldConfig;
    value: string;
}

export interface SubmissionData {
    id: string;
    eventChallengeId: string;
    answers: SubmissionAnswerData[];
    eventId: string;
    userId: string;
    status: SubmissionStatus;
    createdAt: number;
    basePoints: number;
    timeBonusPoints: number;
    totalPoints: number;
}
