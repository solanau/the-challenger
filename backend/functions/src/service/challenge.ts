import * as functions from 'firebase-functions';
import { db } from '..';
import {
    Auth,
    ChallengePayload,
    CreateChallengePayload,
    UpdateChallengePayload,
} from '../util/types';

const CHALLENGE_DOCUMENT_VERSION = 1;

class ChallengeService {
    async createChallenge(payload: CreateChallengePayload, auth?: Auth) {
        if (!auth) {
            throw new functions.https.HttpsError(
                'permission-denied',
                `In order to create an challenge, you have to log in.`,
            );
        }

        const challengeData: ChallengePayload = {
            title: payload.title,
            description: payload.description,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            isNew: true,
            version: CHALLENGE_DOCUMENT_VERSION,
            userId: auth.id,
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

        const challenge = await db
            .doc(`challenges/${id}`)
            .update({ ...data, updatedAt: Date.now(), isNew: false });

        return challenge;
    }
}

export const challengeService = new ChallengeService();
