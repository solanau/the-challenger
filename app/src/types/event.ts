export interface EventPayload {
    id: string;
    title: string;
    description: string;
    location: string;
    startDate: number;
    endDate: number;
    reviewers: string[];
    managers: string[];
    challenges: string[];
}

export interface CreateEventPayload {
    title: string;
    description: string;
}

export interface UpdateEventPayload {
    title: string;
    description: string;
    startDate: number;
    endDate: number;
    challenges: string[];
}

export interface EventSettingsFormData {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    challenges: string[];
}
