import { httpsCallable } from 'firebase/functions';
import {
    CreateSubmissionPayload,
    SetUserPayload,
    UpdateLeaderBoardPayload,
    UpdateSubmissionStatusPayload,
} from 'types/api';
import { functions } from 'utils/firebase';

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
