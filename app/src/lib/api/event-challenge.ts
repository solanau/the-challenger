import axios from 'axios';
import {
    CreateEventChallengePayload,
    EventChallengeData,
    UpdateEventChallengePayload,
} from 'types/api/event-challenge';

export async function fetchAllEventChallenges(): Promise<EventChallengeData[]> {
    return await axios
        .get(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                `/eventChallenges`,
        )
        .then(res => res.data);
}

export async function fetchEventChallenge(
    eventChallengeId: string,
): Promise<EventChallengeData> {
    return await axios
        .get(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                `/eventChallenge/${eventChallengeId}/`,
        )
        .then(res => res.data);
}

export async function createEventChallenge(
    payload: CreateEventChallengePayload,
): Promise<string> {
    return await axios
        .post(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                '/eventChallenge/' +
                process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY,
            payload,
        )
        .then(res => res.data.pubkey);
}

export async function updateEventChallenge(
    payload: UpdateEventChallengePayload,
): Promise<string> {
    return await axios
        .put(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                `/eventChallenge/${payload.id}/` +
                process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY,
            payload,
        )
        .then(res => res.data);
}
