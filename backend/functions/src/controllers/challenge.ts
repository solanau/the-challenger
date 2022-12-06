import * as functions from 'firebase-functions';
import { db } from '..';
import {
    Auth,
    CreateChallengePayload,
    UpdateChallengePayload,
} from '../util/types';

class ChallengeController {
    async createChallenge(payload: CreateChallengePayload, auth?: Auth) {
        if (!auth) {
            throw new functions.https.HttpsError(
                'permission-denied',
                `In order to create an challenge, you have to log in.`,
            );
        }

        const challenge = await db.doc(`challenges/${payload.id}`).set({
            title: payload.title,
            description: payload.description,
            userId: auth.id,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            isNew: true,
            version: 1,
        });

        return challenge;
    }

    async updateChallenge({ id, data }: UpdateChallengePayload, auth?: Auth) {
        if (!auth) {
            throw new functions.https.HttpsError(
                'permission-denied',
                `In order to update an challenge, you have to log in.`,
            );
        }

        const challenge = await db
            .doc(`challenges/${id}`)
            .update({ ...data, updatedAt: Date.now(), isNew: false });

        return challenge;
    }
}

export const controller = new ChallengeController();
