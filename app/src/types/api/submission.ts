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

export interface FetchSubmissionsFilter {
    challengeId?: string;
    contractId?: string;
    eventChallengeId?: string;
    eventId?: string;
    userId?: string;
}

export type CreateSubmissionPayload = Omit<SubmissionData, 'id'>;

export type UpdateSubmissionPayload = Partial<CreateSubmissionPayload> & {
    id: string;
};

export type CreateUpdateSubmissionResponse = Partial<SubmissionData> & {
    id: string;
};

export interface SubmissionData {
    id: string;
    eventChallengeId: string;
    contractId: string;
    challengeId: string;
    eventId: string;
    userId: string;
    answers: SubmissionAnswerData[];
    status: SubmissionStatus;
    createdAt: number;
    basePoints: number;
    timeBonusPoints: number;
    totalPoints: number;
}
