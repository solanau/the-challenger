import * as functions from 'firebase-functions';
import * as _ from 'lodash';
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

        const user = (await db.collection('users').doc(auth.id).get()).data()

        const eventData: EventPayload = {
            title: payload.title,
            description: payload.description,
            userId: auth.id,
            version: EVENT_DOCUMENT_VERSION,
            challenges: [],
            createdAt: Date.now(),
            updatedAt: Date.now(),
            isNew: true,
            reviewStatus: (user.isAdmin ? 'approved' : 'pending')
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


        const user = (await db.collection('users').doc(auth.id).get()).data()

        const eventCurrentState = (await db.doc(`events/${id}`).get()).data()

        if (!user.isAdmin && eventCurrentState.userId != auth.id) {
            throw new functions.https.HttpsError(
                'permission-denied',
                `You are not allowed to modify this challenge.`,
            );
        }
        console.log('eventCurrentState.reviewStatus', eventCurrentState.reviewStatus)
        console.log('data.reviewStatus', data.reviewStatus)
        const statusAreNotEqual = eventCurrentState.reviewStatus != data.reviewStatus
        console.log('statusAreNotEqual', statusAreNotEqual)
        const statusIsUndefined = _.isUndefined(eventCurrentState.reviewStatus)
        console.log('statusIsUndefined', statusIsUndefined)
        const statusReviewer = (statusAreNotEqual || statusIsUndefined ? auth.id : eventCurrentState.reviewedBy)
        console.log("statusReviewer", statusReviewer)

        const reviewedBy =
            (user.isAdmin ? statusReviewer : eventCurrentState.reviewedBy)

        console.log('reviewedBy', reviewedBy, _.omitBy({ reviewedBy }, _.isUndefined))


        const event = await db
            .doc(`events/${id}`)
            .update({
                ...data,
                updatedAt: Date.now(),
                isNew: false,
                ..._.omitBy({ reviewedBy }, _.isUndefined)
            });

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
