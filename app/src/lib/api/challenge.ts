import axios from 'axios';
import {
    ChallengeData,
    CreateChallengePayload,
    UpdateChallengePayload,
} from 'types/api/challenge';

export async function fetchAllChallenges(): Promise<ChallengeData[]> {
    return await axios
        .get(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                `/challenges`,
        )
        .then(res => res.data);
}

export async function fetchChallenge(id: string): Promise<ChallengeData> {
    return await axios
        .get(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                `/challenge/${id}/`,
        )
        .then(res => res.data);
}

export async function createChallenge(
    payload: CreateChallengePayload,
): Promise<string> {
    return await axios
        .post(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                '/challenge/' +
                process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY,
            payload,
        )
        .then(res => res.data.pubkey);
}

export async function updateChallenge(
    payload: UpdateChallengePayload,
): Promise<string> {
    return await axios
        .put(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                `/challenge/${payload.id}/` +
                process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY,
            payload,
        )
        .then(res => res.data);
}
