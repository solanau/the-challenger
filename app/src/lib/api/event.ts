import axios from 'axios';
import {
    CreateEventPayload,
    CreateUpdateEventResponse,
    EventData,
    UpdateEventPayload,
} from '../../types/api/event';

export async function fetchAllEvents(): Promise<EventData[]> {
    return await axios
        .get(process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT + `/events`)
        .then(res => res.data);
}

export async function fetchEvent(eventId: string): Promise<EventData> {
    return await axios
        .get(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                `/event/${eventId}/`,
        )
        .then(res => res.data);
}

export async function createEvent(
    payload: CreateEventPayload,
): Promise<CreateUpdateEventResponse> {
    return await axios
        .post(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                '/event/' +
                process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY,
            payload,
        )
        .then(res => ({
            id: res.data.eventId,
            publicKey: res.data.publicKey,
        }));
}

export async function updateEvent(
    payload: UpdateEventPayload,
): Promise<CreateUpdateEventResponse> {
    return await axios
        .put(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                `/event/${payload.id}/` +
                process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY,
            payload,
        )
        .then(res => ({
            id: res.data.eventId,
            publicKey: res.data.publicKey,
        }));
}
