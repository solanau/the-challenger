import { FirebaseError } from 'firebase/app';
import { httpsCallable } from 'firebase/functions';
import {
    CreateChallengePayload,
    CreateEventPayload,
    CreateSubmissionPayload,
    SetUserPayload,
    UpdateChallengePayload,
    UpdateEventPayload,
    UpdateLeaderBoardPayload,
} from 'types';
import { ReviewSubmissionPayload } from 'types/submission';
import { functions } from 'utils/firebase';

function handleError(error: unknown) {
    if (typeof error === 'string') {
        return error;
    } else if (error instanceof FirebaseError) {
        return error.code;
    } else {
        return JSON.stringify(error);
    }
}

export async function createSubmission(
    id: string,
    payload: CreateSubmissionPayload,
) {
    const instance = httpsCallable(functions, 'createSubmission');

    try {
        const result = await instance({ id, ...payload });
        return result.data;
    } catch (error) {
        throw handleError(error);
    }
}

export async function reviewSubmission(
    eventId: string,
    submissionId: string,
    payload: ReviewSubmissionPayload,
) {
    const instance = httpsCallable(functions, 'reviewSubmission');

    try {
        const result = await instance({
            eventId,
            id: submissionId,
            ...payload,
        });
        return result.data;
    } catch (error) {
        throw handleError(error);
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
        throw handleError(error);
    }
}

export async function updateUser(payload: SetUserPayload) {
    const instance = httpsCallable<SetUserPayload, unknown>(
        functions,
        'updateUser',
    );
    try {
        const result = await instance(payload);

        return result.data;
    } catch (error) {
        throw handleError(error);
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
        throw handleError(error);
    }
}

export async function createEvent(id: string, payload: CreateEventPayload) {
    const instance = httpsCallable(functions, 'createEvent');
    try {
        const result = await instance({ id, ...payload });

        return result.data;
    } catch (error) {
        throw handleError(error);
    }
}

export async function updateEvent(id: string, payload: UpdateEventPayload) {
    const instance = httpsCallable(functions, 'updateEvent');
    try {
        const result = await instance({ id, data: payload });

        return result.data;
    } catch (error) {
        throw handleError(error);
    }
}

export async function createChallenge(
    id: string,
    payload: CreateChallengePayload,
) {
    const instance = httpsCallable(functions, 'createChallenge');
    try {
        const result = await instance({ id, ...payload });

        return result.data;
    } catch (error) {
        throw handleError(error);
    }
}

export async function updateChallenge(
    id: string,
    payload: UpdateChallengePayload,
) {
    const instance = httpsCallable(functions, 'updateChallenge');
    try {
        const result = await instance({ id, data: payload });

        return result.data;
    } catch (error) {
        console.log(`${error.code}: ${error.message}`);
        throw handleError(error);
    }
}
