import { httpsCallable } from 'firebase/functions';
import {
    CreateSubmissionPayload,
    SetUserPayload,
    UpdateLeaderBoardPayload,
} from 'types/api';
import {
    CreateChallengePayload,
    UpdateChallengePayload,
} from 'types/challenge';
import { CreateEventPayload, UpdateEventPayload } from 'types/event';
import { ReviewSubmissionPayload } from 'types/submission';
import { functions } from 'utils/firebase';
import { v4 as uuid } from 'uuid';

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

export async function updateEvent(id: string, payload: UpdateEventPayload) {
    const instance = httpsCallable(functions, 'updateEvent');

    try {
        const result = await instance({ id, data: payload });

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
        throw new Error(`${error.code}: ${error.message}`);
    }
}
