import * as functions from 'firebase-functions';
import {
    Auth,
    CreateEventPayload,
    db,
    EventPayload,
    UpdateEventPayload,
} from '..';

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
            id: payload.id,
            title: payload.title,
            description: payload.description,
            userId: auth.id,
            version: EVENT_DOCUMENT_VERSION,
            challenges: challenges.docs.map(doc => doc.id),
            createdAt: Date.now(),
            updatedAt: Date.now(),
            isNew: true,
            status: 'draft',
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
