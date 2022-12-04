export interface EventPayload {
    id: string;
    title: string;
    description: string;
    location: string;
    reviewers: string[];
    managers: string[];
}

export interface CreateEventPayload {
    id: string;
    title: string;
    description: string;
}

export interface EditEventPayload {
    title: string;
    description: string;
}
