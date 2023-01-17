import * as functions from 'firebase-functions';
import { db } from '..';
import {
    Auth,
    CreateEventPayload,
    EventPayload,
    UpdateEventPayload,
} from '../util/types';

const EVENT_DOCUMENT_VERSION = 1;

class EventService {
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
            challenges: challenges.docs.map(doc => doc.id),
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
}

export const eventService = new EventService();
