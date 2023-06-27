import * as functions from 'firebase-functions';
import { db } from '..';
import {
    Auth,
    ChallengePayload,
    CreateChallengePayload,
    UpdateChallengePayload,
} from '../util/types';

const CHALLENGE_DOCUMENT_VERSION = 1;

class ChallengeController {
    async createChallenge(payload: CreateChallengePayload, auth?: Auth) {
        if (!auth) {
            throw new functions.https.HttpsError(
                'permission-denied',
                `In order to create an challenge, you have to log in.`,
            );
        }

        const user = (await db.collection('users').doc(auth.id).get()).data()

        const challengeData: ChallengePayload = {
            title: payload.title,
            description: payload.description,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            isNew: true,
            version: CHALLENGE_DOCUMENT_VERSION,
            userId: auth.id,
            reviewedBy: (user.isAdmin ? user.id : null),
            reviewStatus: (user.isAdmin ? 'approved' : '')
        };

        const challenge = await db
            .doc(`challenges/${payload.id}`)
            .set(challengeData);

        return challenge;
    }

    async updateChallenge({ id, data }: UpdateChallengePayload, auth?: Auth) {
        if (!auth) {
            throw new functions.https.HttpsError(
                'permission-denied',
                `In order to update an challenge, you have to log in.`,
            );
        }

        const user = (await db.collection('users').doc(auth.id).get()).data()

        const challengeCurrentState = (await db.doc(`challenges/${id}`).get()).data()

        if (!user.isAdmin && challengeCurrentState.userId != auth.id) {
            throw new functions.https.HttpsError(
                'permission-denied',
                `You are not allowed to modify this challenge.`,
            );
        }

        const dataToUpdate = {
            ...data,
            updatedAt: Date.now(),
            isNew: false,
            reviewedBy: auth.id
        }

        const challenge = await db
            .doc(`challenges/${id}`)
            .update(dataToUpdate);

        return challenge;
    }
}

export const controller = new ChallengeController();
