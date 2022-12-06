export type CreateEventPayload = Partial<EventData> & {
    title: string;
    description: string;
    location: string;
    date: string;
};

export type UpdateEventPayload = Partial<CreateEventPayload> & {
    id: string;
};

export type CreateUpdateEventResponse = Partial<EventData> & {
    id: string;
    publicKey: string;
};

export type EventData = {
    id: string;
    publicKey: string;
    title: string;
    description: string;
    location: string;
    date: string;
};
