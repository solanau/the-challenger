export interface EventPayload {
    id: string;
    title: string;
    description: string;
    userId: string;
    challenges: string[];
    version: number;
    isNew: boolean;
    createdAt: number;
    updatedAt: number;
    startDate?: number;
    endDate?: number;
    reviewers?: string[];
    managers?: string[];
}

export interface CreateEventPayload {
    id: string;
    title: string;
    description: string;
}

export interface UpdateEventPayload {
    id: string;
    data: {
        title: string;
        description: string;
        challenges: string[];
    };
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
