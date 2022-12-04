import { PublicKey } from '@solana/web3.js';
import axios from 'axios';
import { httpsCallable } from 'firebase/functions';
import {
    ChallengePayload,
    CreateSubmissionPayload,
    EventPayload,
    IssueRewardsPayload,
    MintPayload,
    PrizeMintMetadataPayload,
    PrizePayload,
    ProfilePayload,
    SetUserPayload,
    UpdateLeaderBoardPayload,
    UpdateSubmissionStatusPayload,
} from 'types/api';
import { CreateChallengePayload } from 'types/challenge';
import { CreateEventPayload } from 'types/event';
import { functions } from 'utils/firebase';
import { v4 as uuid } from 'uuid';

export async function fetchProfileForPubkey(
    pubkey: string,
): Promise<ProfilePayload> {
    return await axios
        .get(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                '/profile/' +
                pubkey +
                process.env
                    .NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_WALLET_PUBKEY,
        )
        .then(res => res.data);
}

export async function createNewProfile(
    payload: ProfilePayload,
): Promise<string> {
    return await axios
        .post(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                '/profile/' +
                process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY,
            payload,
        )
        .then(res => res.data.pubkey);
}

export async function updateProfile(
    pubkey: string,
    payload: ProfilePayload,
): Promise<string> {
    return await axios
        .put(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                '/profile/' +
                pubkey +
                process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY,
            payload,
        )
        .then(res => res.data);
}

export async function fetchEventsForAuthority(): Promise<EventPayload[]> {
    return await axios
        .get(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                '/events/' +
                process.env
                    .NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_WALLET_PUBKEY,
        )
        .then(res => res.data);
}
export interface EventData {
    pubKey: string;
    firebaseEventId: string;
}
export async function createNewEvent(
    payload: Omit<EventPayload, 'pubkey'>,
): Promise<EventData> {
    return await axios
        .post(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                '/event/' +
                process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY,
            payload,
        )
        .then(res => ({
            pubKey: res.data.pubkey,
            firebaseEventId: res.data.firebaseEventId,
        }));
}

export async function updateEvent(
    eventId: string,
    payload: EventPayload,
): Promise<string> {
    return await axios
        .put(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                '/event/' +
                eventId +
                process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY,
            payload,
        )
        .then(res => res.data);
}

export async function createNewChallenge(
    payload: Omit<ChallengePayload, 'pubkey'>,
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
    payload: ChallengePayload,
): Promise<string> {
    return await axios
        .put(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                '/challenge/' +
                process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY,
            payload,
        )
        .then(res => res.data);
}

export async function fetchPrizesForChallenge(
    challengePubkey: PublicKey,
): Promise<PrizeMintMetadataPayload[]> {
    return await axios
        .get(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                '/prizes/' +
                challengePubkey.toBase58(),
        )
        .then(res => res.data);
}

export async function createNewPrize(
    payload: Omit<PrizePayload, 'pubkey'>,
): Promise<string> {
    return await axios
        .post(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                '/prize/' +
                process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY,
            payload,
        )
        .then(res => res.data.pubkey);
}

export async function updatePrize(payload: PrizePayload): Promise<string> {
    return await axios
        .put(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                '/prize/' +
                process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY,
            payload,
        )
        .then(res => res.data);
}

// start here

export async function createSubmission(payload: CreateSubmissionPayload) {
    const instance = httpsCallable<CreateSubmissionPayload, unknown>(
        functions,
        'createSubmission',
    );

    try {
        const result = await instance(payload);

        return result.data;
    } catch (error) {
        throw new Error(`${error.code}: ${error.message}`);
    }
}

export async function updateSubmissionStatus(
    payload: UpdateSubmissionStatusPayload,
) {
    const instance = httpsCallable<UpdateSubmissionStatusPayload, unknown>(
        functions,
        'updateSubmissionStatus',
    );

    try {
        const result = await instance(payload);

        return result.data;
    } catch (error) {
        throw new Error(`${error.code}: ${error.message}`);
    }
}

export async function setUser(payload: SetUserPayload) {
    const instance = httpsCallable<SetUserPayload, unknown>(
        functions,
        'setUser',
    );

    try {
        const result = await instance(payload);

        return result.data;
    } catch (error) {
        throw new Error(`${error.code}: ${error.message}`);
    }
}

export async function updateLeaderBoard(payload: UpdateLeaderBoardPayload) {
    const instance = httpsCallable<UpdateLeaderBoardPayload, unknown>(
        functions,
        'updateLeaderBoard',
    );

    try {
        const result = await instance(payload);

        return result.data;
    } catch (error) {
        throw new Error(`${error.code}: ${error.message}`);
    }
}

export async function createEvent(payload: CreateEventPayload) {
    const instance = httpsCallable(functions, 'createEvent');

    try {
        const result = await instance({ id: uuid(), ...payload });

        return result.data;
    } catch (error) {
        throw new Error(`${error.code}: ${error.message}`);
    }
}

export async function createChallenge(payload: CreateChallengePayload) {
    const instance = httpsCallable(functions, 'createChallenge');

    try {
        const result = await instance({ id: uuid(), ...payload });

        return result.data;
    } catch (error) {
        throw new Error(`${error.code}: ${error.message}`);
    }
}

export async function issueAllRewardsForChallenge(
    payload: IssueRewardsPayload,
): Promise<string> {
    return await axios
        .post(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                '/reward/' +
                process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY,
            payload,
        )
        .then(res => res.data);
}

export async function fetchCustomMints(): Promise<MintPayload[]> {
    return await axios
        .get(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                '/customMints',
        )
        .then(res => res.data);
}

export async function createNewCustomMint(
    payload: Omit<MintPayload, 'pubkey'>,
): Promise<string> {
    return await axios
        .post(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                '/customMint/' +
                process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY,
            payload,
        )
        .then(res => res.data.pubkey);
}
