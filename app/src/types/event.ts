export interface EventPayload {
    id: string;
    title: string;
    description: string;
    location: string;
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
    challenges: string[];
}
