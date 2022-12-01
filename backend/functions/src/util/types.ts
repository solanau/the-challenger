import { ChallengePayload } from '../../../../app/src/types/api';

export type SubmissionStatus = 'pending' | 'invalid' | 'complete';

export interface BaseFieldConfig {
    field: string;
    label: string;
    key: string;
    placeholder: string;
    maxLength?: number;
}

export type TextFieldConfig = BaseFieldConfig & {
    type: 'text';
};

export type TextAreaFieldConfig = BaseFieldConfig & {
    type: 'textArea';
    rows?: number;
};

export type NumberFieldConfig = BaseFieldConfig & {
    type: 'number';
};

export type EmailFieldConfig = BaseFieldConfig & {
    type: 'email';
};

export type FieldConfig =
    | TextFieldConfig
    | TextAreaFieldConfig
    | NumberFieldConfig
    | EmailFieldConfig;

export interface SubmissionAnswer {
    field: FieldConfig;
    value: string;
}

export interface Auth {
    id: string;
    email: string;
}

export interface SetUserPayload {
    fullName: string;
    userName: string;
    walletPublicKey: string;
}

export interface Submission {
    id: string;
    eventId: string;
    challengeId: string;
    challenge: ChallengePayload;
    userId: string;
    createdAt: number;
}

export interface UpdateLeaderBoardPayload {
    eventId: string;
}

export interface Participant {
    userId: string;
    points: number;
}

export interface LeaderBoard {
    totalPoints: number;
    participants: Participant[];
}
