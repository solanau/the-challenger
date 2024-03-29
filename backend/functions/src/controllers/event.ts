import * as functions from 'firebase-functions';
import { db } from '..';
import {
    Auth,
    CreateEventPayload,
    EventPayload,
    GetParticipantsPayload,
    UpdateEventPayload,
} from '../util/types';

const EVENT_DOCUMENT_VERSION = 1;

class EventController {
    async createEvent(payload: CreateEventPayload, auth?: Auth) {
        if (!auth) {
            throw new functions.https.HttpsError(
                'permission-denied',
                `In order to create an event, you have to log in.`,
            );
        }

        /* 
            We're adding all challenges by default.
        */
        const challenges = await db
            .collection('challenges')
            .where('version', '==', 1)
            .where('isNew', '==', false)
            .get();
        const eventData: EventPayload = {
            title: payload.title,
            description: payload.description,
            userId: auth.id,
            version: EVENT_DOCUMENT_VERSION,
            challenges: [],
            createdAt: Date.now(),
            updatedAt: Date.now(),
            isNew: true,
        };

        const event = await db.doc(`events/${payload.id}`).set(eventData);

        return event;
    }

    async updateEvent({ id, data }: UpdateEventPayload, auth?: Auth) {
        if (!auth) {
            throw new functions.https.HttpsError(
                'permission-denied',
                `In order to update an event, you have to log in.`,
            );
        }

        const event = await db
            .doc(`events/${id}`)
            .update({ ...data, updatedAt: Date.now(), isNew: false });

        return event;
    }

    async getParticipants(payload: GetParticipantsPayload, auth?: Auth) {
        if (!auth) {
            throw new functions.https.HttpsError(
                'permission-denied',
                `In order to update an event, you have to log in.`,
            );
        }

        const user = await db.doc(`users/${auth.id}`).get();

        if (!user.data().isAdmin) {
            throw new functions.https.HttpsError(
                'permission-denied',
                `In order to get the participants data, you have to be an admin.`,
            );
        }

        const individualLeaderboardDoc = await db
            .doc(`events/${payload.id}/leader-boards/individual`)
            .get();
        const individualParticipants = await Promise.all(
            individualLeaderboardDoc
                .data()
                .participants.map(({ userId, points }) =>
                    db
                        .doc(`users/${userId}`)
                        .get()
                        .then(userDoc => ({
                            fullName: userDoc.data().fullName,
                            email: userDoc.data().email,
                            points,
                        })),
                ),
        );

        return individualParticipants;
    }
}

export const controller = new EventController();
