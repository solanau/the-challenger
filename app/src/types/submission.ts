export type SubmissionStatus =
    | 'pending'
    | 'invalid'
    | 'incorrect'
    | 'completed';

export interface SubmissionAnswerPayload {
    question: string;
    reply: string;
    isApproved: boolean;
    comments: string;
}

export interface SubmissionPayload {
    eventId: string;
    challengeId: string;
    title: string;
    description: string;
    userId: string;
    createdAt: number;
    updatedAt: number;
    isNew: boolean;
    version: number;
    basePoints: number;
    totalPoints: number;
    timeBonusPoints: number;
    isProcessed: boolean;
    status: SubmissionStatus;
    answers: SubmissionAnswerPayload[];
    comments: string;
}

export interface CreateSubmissionPayload {
    id: string;
    eventId: string;
    challengeId: string;
    answers: SubmissionAnswerPayload[];
}

export interface CreateSubmissionAnswerPayload {
    question: string;
    reply: string;
    field: string;
}

export interface SubmissionReviewFormData {
    status: SubmissionStatus;
    comments: string;
    answers: { isApproved: boolean; comments: string }[];
}

export type ReviewSubmissionPayload = {
    id: string;
    eventId: string;
    answers: {
        isApproved: boolean;
        comments: string;
    }[];
    status: SubmissionStatus;
    comments: string;
};
