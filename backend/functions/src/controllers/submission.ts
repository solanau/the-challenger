import * as functions from 'firebase-functions';
import { db } from '..';
import {
    Auth,
    CreateSubmissionPayload,
    UpdateSubmissionStatusPayload
} from '../util/types';

const submissionCollection = 'submissions';

export const isDuplicateSubmission = async (
    eventId: string,
    userId: string,
    challengeId: string,
) => {
    const pastSubmissions = await db
        .collection(submissionCollection)
        .where('userId', '==', userId)
        .where('eventId', '==', eventId)
        .where('challenge.id', '==', challengeId)
        .get();

    return !pastSubmissions.empty;
};

export const isReviewer = async (submissionId: string, userId: string) => {
    const submission = await db.doc(`submissions/${submissionId}`).get();
    const submissionData = submission.data();
    const event = await db.doc(`events/${submissionData.eventId}`).get();
    const eventData = event.data();

    return eventData.reviewers.includes(userId);
};

class SubmissionController {
    async createSubmission(auth: Auth, payload: CreateSubmissionPayload) {
        if (
            await isDuplicateSubmission(
                payload.eventId,
                auth.id,
                payload.challengeId,
            )
        ) {
            throw new functions.https.HttpsError(
                'already-exists',
                `There's another submission exactly like this one.`,
            );
        }

        const challenge = await db
            .doc(`challenges/${payload.challengeId}`)
            .get();
        const challengeData = challenge.data();

        await db.doc(`submissions/${payload.id}`).set({
            status: 'pending',
            userId: auth.id,
            challenge: {
                id: challenge.id,
                ...challengeData,
            },
            challengeId: payload.challengeId,
            eventId: payload.eventId,
            answers: payload.answers,
        });

        return payload;
    }

    async updateSubmissionStatus(
        auth: Auth,
        payload: UpdateSubmissionStatusPayload,
    ) {
        if (!(await isReviewer(payload.id, auth.id))) {
            throw new functions.https.HttpsError(
                'permission-denied',
                `In order to change a submission's status, you have to be a reviewer.`,
            );
        }

        await db.doc(`submissions/${payload.id}`).update({
            status: payload.status,
        });

        return payload;
    }
}

export const controller = new SubmissionController();
