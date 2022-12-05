import * as functions from 'firebase-functions';
import { db } from '..';
import {
    CreateSubmissionPayload,
    UpdateSubmissionStatusPayload,
} from '../../../../app/src/types/api';
import { Auth, SubmissionStatus } from '../util/types';
import { getTimeBonusPoints } from '../util/util';

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

export const isReviewer = async (eventId: string, userId: string) => {
    const event = await db.doc(`events/${eventId}`).get();
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
        const submittedAt = Date.now();
        const submissionTimeBonusPoints = getTimeBonusPoints(
            challengeData.rewardValue,
            challengeData.startDate,
            challengeData.endDate,
            submittedAt,
        );
        const submission = {
            status: 'pending',
            userId: auth.id,
            challenge: {
                id: challenge.id,
                ...challengeData,
            },
            challengeId: payload.challengeId,
            eventId: payload.eventId,
            answers: payload.answers,
            isProcessed: false,
            createdAt: submittedAt,
            basePoints: challengeData.rewardValue,
            timeBonusPoints: submissionTimeBonusPoints,
            totalPoints: challengeData.rewardValue + submissionTimeBonusPoints,
        };

        await db
            .doc(`events/${payload.eventId}/submissions/${payload.id}`)
            .set(submission);

        return { id: payload.id, ...submission };
    }

    async updateSubmissionStatus(
        auth: Auth,
        payload: UpdateSubmissionStatusPayload,
    ) {
        if (!(await isReviewer(payload.eventId, auth.id))) {
            throw new functions.https.HttpsError(
                'permission-denied',
                `In order to change a submission's status, you have to be a reviewer.`,
            );
        }

        const result = await db.runTransaction(async transaction => {
            const submissionRef = db.doc(
                `events/${payload.eventId}/submissions/${payload.id}`,
            );
            const currentSubmission = await submissionRef.get();
            const currentSubmissionData = currentSubmission.data();

            transaction.update(submissionRef, {
                status: payload.status,
            });

            return {
                id: payload.id,
                eventId: currentSubmissionData.eventId,
                oldStatus: currentSubmissionData.status as SubmissionStatus,
                newStatus: payload.status,
                rewardValue: currentSubmissionData.challenge
                    .rewardValue as number,
            };
        });

        return result;
    }
}

export const controller = new SubmissionController();
