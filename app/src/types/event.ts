export type CreateEventPayload = Partial<EventDoc> & {
    title: string;
    description: string;
    location: string;
    date: string;
};

export type UpdateEventPayload = Partial<CreateEventPayload> & {
    id: string;
};

export type CreateUpdateEventResponse = Partial<EventDoc> & {
    id: string;
    publicKey: string;
};

export type EventDoc = {
    id: string;
    publicKey: string;
    title: string;
    description: string;
    location: string;
    date: string;
    // reviewers: string[],
    // managers: string[],
    // challenges: string[],
};
