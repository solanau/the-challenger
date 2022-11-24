import { ChallengeDto } from './challenge';
import { FieldConfig } from './form';

export type SubmissionStatus =
    | 'pending'
    | 'invalid'
    | 'incorrect'
    | 'completed';

export interface SubmissionAnswerDto {
    field: FieldConfig;
    value: string;
}

export interface SubmissionDto {
    id: string;
    challengeId: string;
    answers: SubmissionAnswerDto[];
    eventId: string;
    userId: string;
    status: SubmissionStatus;
    challenge: ChallengeDto;
    createdAt: number;
    basePoints: number;
    timeBonusPoints: number;
    totalPoints: number;
}
