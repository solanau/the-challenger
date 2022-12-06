import axios from 'axios';
import {
    CreateEventPayload,
    CreateUpdateEventResponse,
    EventDoc,
    UpdateEventPayload,
} from '../../types/event';

export async function fetchAllEvents(): Promise<EventDoc[]> {
    return await axios
        .get(process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT + `/events`)
        .then(res => res.data);
}

export async function fetchEvent(id: string): Promise<EventDoc> {
    return await axios
        .get(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                `/event/${id}/`,
        )
        .then(res => res.data);
}

export async function createNewEvent(
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
