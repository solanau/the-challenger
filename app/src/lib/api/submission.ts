import axios from 'axios';
import {
    CreateSubmissionPayload,
    CreateUpdateSubmissionResponse,
    FetchSubmissionsFilter,
    SubmissionData,
    UpdateSubmissionPayload,
} from '../../types/api/submission';

export async function fetchSubmissions(
    filter?: FetchSubmissionsFilter,
): Promise<SubmissionData[]> {
    const query = filter
        ? Object.keys(filter).map(key => (this[key] = filter[key]))
        : {};
    return await axios
        .get(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                `/submissions`,
            { params: query },
        )
        .then(res => res.data);
}

export async function fetchSubmission(
    submissionId: string,
): Promise<SubmissionData> {
    return await axios
        .get(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                `/submission/${submissionId}/`,
        )
        .then(res => res.data);
}

export async function createSubmission(
    payload: CreateSubmissionPayload,
): Promise<CreateUpdateSubmissionResponse> {
    return await axios
        .post(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                '/submission/' +
                process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY,
            payload,
        )
        .then(res => ({
            id: res.data.submissionId,
            publicKey: res.data.publicKey,
        }));
}

export async function updateSubmission(
    payload: UpdateSubmissionPayload,
): Promise<CreateUpdateSubmissionResponse> {
    return await axios
        .put(
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
                `/submission/${payload.id}/` +
                process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY,
            payload,
        )
        .then(res => ({
            id: res.data.submissionId,
            publicKey: res.data.publicKey,
        }));
}
