import axios from 'axios';
import {
    ChallengePayload,
    EventPayload,
    IssuePayoutPayload,
    IssueRewardsBatchPayload,
    IssueRewardsPayload,
    MintPayload,
    PotPayload,
    PrizeMintMetadataPayload,
    PrizePayload,
    ProfilePayload,
    SubmissionPayload,
    SubmissionStatus,
} from 'types/api';

export async function fetchProfileForPubkey(
    pubkey: string,
): Promise<ProfilePayload> {
    return await axios
        .get(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                `/profile/${pubkey}/` +
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
                `/profile/${pubkey}/` +
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

export async function createNewEvent(
    payload: Omit<EventPayload, 'pubkey'>,
): Promise<string> {
    return await axios
        .post(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                '/event/' +
                process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY,
            payload,
        )
        .then(res => res.data.pubkey);
}

export async function updateEvent(
    eventId: string,
    payload: EventPayload,
): Promise<string> {
    return await axios
        .put(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                `/event/${eventId}/` +
                process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY,
            payload,
        )
        .then(res => res.data);
}

export async function createNewPot(
    payload: Omit<PotPayload, 'pubkey'>,
): Promise<string> {
    return await axios
        .post(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                '/pot/' +
                process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY,
            payload,
        )
        .then(res => res.data.pubkey);
}

export async function fetchChallengesForEvent(): Promise<ChallengePayload[]> {
    return await axios
        .get(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                '/challenges/' +
                process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_EVENT_PUBKEY,
        )
        .then(res => res.data);
}

export async function fetchChallengeById(
    id: string,
): Promise<ChallengePayload> {
    return await axios
        .get(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                `/challenge/id/${id}/`,
        )
        .then(res => res.data);
}

export async function fetchChallengeByKey(
    key: number,
): Promise<ChallengePayload> {
    return await axios
        .get(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                `/challenge/key/${key}`,
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
    pubkey: string,
    payload: ChallengePayload,
): Promise<string> {
    return await axios
        .put(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                `/challenge/${pubkey}/` +
                process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY,
            payload,
        )
        .then(res => res.data);
}

export async function fetchPrizesForChallenge(
    pubkey: string,
): Promise<PrizeMintMetadataPayload[]> {
    return await axios
        .get(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                `/prizes/${pubkey}`,
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

export async function fetchSubmissions(
    params: Partial<{
        eventId: string;
        username: string;
        challengeId: string;
    }>,
): Promise<SubmissionPayload[]> {
    return await axios
        .get(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                '/submissions',
            {
                params,
            },
        )
        .then(res => res.data);
}

export async function fetchSubmissionById(
    submissionId: string,
): Promise<SubmissionPayload> {
    return await axios
        .get(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                `/submissions/${submissionId}`,
        )
        .then(res => res.data);
}

export async function createNewSubmission(
    payload: SubmissionPayload,
): Promise<string> {
    return await axios
        .post(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                '/submission/' +
                process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY,
            payload,
        )
        .then(res => res.data);
}

export async function updateSubmissionStatus(
    submissionId: string,
    status: SubmissionStatus,
): Promise<string> {
    return await axios
        .patch(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                `/submission/${submissionId}/` +
                process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY,
            { status },
        )
        .then(res => res.data);
}

export async function issueAllRewardsBatchForUser(
    payload: IssueRewardsBatchPayload,
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

export async function issuePayout(
    payload: IssuePayoutPayload,
): Promise<string> {
    return await axios
        .post(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                '/payout/' +
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
