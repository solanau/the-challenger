import { PubSub } from '@google-cloud/pubsub';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { v4 as uuid } from 'uuid';
import { controller as submissionController } from './controllers/submission';
import { controller as userController } from './controllers/user';

const profileRoute = require('./controllers/profile');
const eventRoute = require('./controllers/event');
const challengeRoute = require('./controllers/challenge');
const prizeRoute = require('./controllers/prize');
const rewardRoute = require('./controllers/reward');
const mintRoute = require('./controllers/mint');

admin.initializeApp(functions.config().firebase);
const pubsub = new PubSub();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    cors({
        origin: ['http://localhost:3000', 'https://germany.heavyduty.builders'],
    }),
);

app.get(
    '/profile/:pubkey',
    async (req, res) => await profileRoute.fetchProfileForPubkey(req, res),
);
app.post(
    '/profile/:masterApiKey',
    async (req, res) => await profileRoute.createNewProfile(req, res),
);
app.put(
    '/profile/:pubkey/:masterApiKey',
    async (req, res) => await profileRoute.updateProfile(req, res),
);
app.get(
    '/events/:authority',
    async (req, res) => await eventRoute.fetchEventsForAuthority(req, res),
);
app.post(
    '/event/:masterApiKey',
    async (req, res) => await eventRoute.createNewEvent(req, res),
);
app.put(
    '/event/:id/:masterApiKey',
    async (req, res) => await eventRoute.updateEvent(req, res),
);
app.get(
    '/challenges/:eventPubkey',
    async (req, res) => await challengeRoute.fetchChallengesForEvent(req, res),
);
app.get(
    '/challenge/id/:id',
    async (req, res) => await challengeRoute.fetchChallengeById(req, res),
);
app.get(
    '/challenge/key/:key',
    async (req, res) => await challengeRoute.fetchChallengeByKey(req, res),
);
app.post(
    '/challenge/:masterApiKey',
    async (req, res) => await challengeRoute.createNewChallenge(req, res),
);
app.put(
    '/challenge/:id/:masterApiKey',
    async (req, res) => await challengeRoute.updateChallenge(req, res),
);
app.get(
    '/prizes/:challengePubkey',
    async (req, res) => await prizeRoute.fetchPrizesForEvent(req, res),
);
app.post(
    '/prize/:masterApiKey',
    async (req, res) => await prizeRoute.createNewPrize(req, res),
);
app.put(
    '/prize/:id/:masterApiKey',
    async (req, res) => await prizeRoute.updatePrize(req, res),
);
app.post(
    '/reward/:masterApiKey',
    async (req, res) => await rewardRoute.issueAllRewardsForChallenge(req, res),
);
app.get(
    '/customMints',
    async (req, res) => await mintRoute.fetchCustomMints(req, res),
);
app.post(
    '/customMint/:masterApiKey',
    async (req, res) => await mintRoute.createNewCustomMint(req, res),
);

export const db = admin.firestore();
export const webApi = functions.https.onRequest(app);

export const publishEvent = functions.https.onCall(async (data, context) => {
    functions.logger.info('data', data);

    pubsub.topic('events').publishJSON(
        {
            id: uuid(),
            data,
            auth: {
                id: context.auth.token.uid,
                email: context.auth.token.email,
            },
        },
        { type: data.type },
        error => {
            functions.logger.error(error);
        },
    );

    return {
        message: 'yoo',
    };
});

export const createSubmission = functions.pubsub
    .topic('events')
    .onPublish(async (message, context) => {
        if (
            process.env.FUNCTIONS_EMULATOR === 'true' &&
            message.attributes.type !== 'createSubmission'
        ) {
            functions.logger.warn('createSubmission', 'Event ignored');
            return false;
        }

        const messageBody = message.data
            ? JSON.parse(Buffer.from(message.data, 'base64').toString())
            : null;

        const submission = await submissionController.createSubmission(
            { id: messageBody.auth.id, email: messageBody.auth.email },
            messageBody.data.payload,
        );

        pubsub.topic('events').publishJSON(
            {
                id: context.eventId,
                data: {
                    payload: submission,
                    type: 'createSubmissionSuccess',
                    correlationId: messageBody.id,
                },
                auth: messageBody.auth,
            },
            { type: 'createSubmissionSuccess' },
            error => {
                functions.logger.error(error);
            },
        );

        return { message: 'Submission created.' };
    });

export const updateSubmissionStatus = functions.pubsub
    .topic('events')
    .onPublish(async (message, context) => {
        if (
            process.env.FUNCTIONS_EMULATOR === 'true' &&
            message.attributes.type !== 'updateSubmissionStatus'
        ) {
            functions.logger.warn('updateSubmissionStatus', 'Event ignored');
            return false;
        }

        const messageBody = message.data
            ? JSON.parse(Buffer.from(message.data, 'base64').toString())
            : null;

        const result = await submissionController.updateSubmissionStatus(
            { id: messageBody.auth.id, email: messageBody.auth.email },
            messageBody.data.payload,
        );

        pubsub.topic('events').publishJSON(
            {
                id: context.eventId,
                data: {
                    payload: result,
                    type: 'updateSubmissionStatusSuccess',
                    correlationId: messageBody.id,
                },
                auth: messageBody.auth,
            },
            { type: 'updateSubmissionStatusSuccess' },
            error => {
                functions.logger.error(error);
            },
        );

        return { message: 'Submission status updated.' };
    });

export const updateUserEventStatusOnSubmissionCreated = functions.pubsub
    .topic('events')
    .onPublish(async message => {
        if (
            process.env.FUNCTIONS_EMULATOR === 'true' &&
            message.attributes.type !== 'createSubmissionSuccess'
        ) {
            functions.logger.warn('createSubmissionSuccess', 'Event ignored');
            return false;
        }

        const messageBody = message.data
            ? JSON.parse(Buffer.from(message.data, 'base64').toString())
            : null;

        await db.runTransaction(async transaction => {
            const userEventStatsRef = db.doc(
                `users/${messageBody.auth.id}/event-stats/${messageBody.data.payload.eventId}`,
            );
            const userEventStats = await transaction.get(userEventStatsRef);
            const userEventStatsData = userEventStats.data() ?? {
                submitted: 0,
                invalid: 0,
                completed: 0,
                incorrect: 0,
                pending: 0,
                points: 0,
            };
            const updatedUserEventStatsData = {
                ...userEventStatsData,
                submitted: userEventStatsData.submitted + 1,
                pending: userEventStatsData.pending + 1,
            };

            transaction.set(userEventStatsRef, updatedUserEventStatsData);

            return updatedUserEventStatsData;
        });

        return { message: 'User Event Status Updated.' };
    });

export const updateUserEventStatusOnSubmissionStatusUpdated = functions.pubsub
    .topic('events')
    .onPublish(async message => {
        if (
            process.env.FUNCTIONS_EMULATOR === 'true' &&
            message.attributes.type !== 'updateSubmissionStatusSuccess'
        ) {
            functions.logger.warn(
                'updateSubmissionStatusSuccess',
                'Event ignored',
            );
            return false;
        }

        const messageBody = message.data
            ? JSON.parse(Buffer.from(message.data, 'base64').toString())
            : null;

        await db.runTransaction(async transaction => {
            const userEventStatsRef = db.doc(
                `users/${messageBody.auth.id}/event-stats/${messageBody.data.payload.eventId}`,
            );
            const userEventStats = await transaction.get(userEventStatsRef);
            const userEventStatsData = userEventStats.data();

            const updatedUserEventStatsData: any = {
                ...userEventStatsData,
                [messageBody.data.payload.oldStatus]:
                    userEventStatsData[messageBody.data.payload.oldStatus] - 1,
                [messageBody.data.payload.newStatus]:
                    userEventStatsData[messageBody.data.payload.newStatus] + 1,
                points:
                    messageBody.data.payload.newStatus === 'completed'
                        ? userEventStatsData.points +
                          messageBody.data.payload.rewardValue
                        : messageBody.data.payload.oldStatus === 'completed'
                        ? userEventStatsData.points -
                          messageBody.data.payload.rewardValue
                        : userEventStatsData.points,
            };

            transaction.set(userEventStatsRef, updatedUserEventStatsData);

            return updatedUserEventStatsData;
        });

        return { message: 'User Event Status Updated.' };
    });

export const setUser = functions.https.onCall(async (data, context) => {
    const user = await userController.setUser(
        { id: context.auth.token.uid, email: context.auth.token.email },
        data,
    );

    return user;
});

/* 

Users can have "event stats", a document that holds how many points they have, 
the number of challenges and more. Every time createSubmission or updateSubmissionStatus
are called, the event stats for the respective user are also updated accordingly.

*/
