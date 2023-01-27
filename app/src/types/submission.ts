export type SubmissionStatus =
    | 'pending'
    | 'invalid'
    | 'incorrect'
    | 'completed'
    | 'closed';

export interface SubmissionAnswerPayload {
    question: string;
    reply: string;
    isApproved: boolean;
    comments: string;
}

export interface SubmissionPayload {
    id: string;
    challengeId: string;
    answers: SubmissionAnswerPayload[];
    eventId: string;
    userId: string;
    status: SubmissionStatus;
    title: string;
    description: string;
    createdAt: number;
    basePoints: number;
    timeBonusPoints: number;
    totalPoints: number;
    comments: string;
}

export interface SubmissionReviewFormData {
    status: SubmissionStatus;
    comments: string;
    answers: { isApproved: boolean; comments: string }[];
}

export type ReviewSubmissionPayload = {
    answers: {
        isApproved: boolean;
        comments: string;
    }[];
    status: SubmissionStatus;
    comments: string;
};
