export interface EventPayload {
    id: string;
    title: string;
    description: string;
    location: string;
    reviewers: string[];
    managers: string[];
}

export interface CreateEventPayload {
    title: string;
    description: string;
}
