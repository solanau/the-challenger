import { PubSub } from '@google-cloud/pubsub';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { v4 as uuid } from 'uuid';
import { controller as leaderBoardController } from './controllers/leader-board';
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
            messageBody.auth,
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
            messageBody.auth,
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

export const updateLeaderBoard = functions.pubsub
    .topic('events')
    .onPublish(async message => {
        if (
            process.env.FUNCTIONS_EMULATOR === 'true' &&
            message.attributes.type !== 'updateLeaderBoard'
        ) {
            functions.logger.warn('updateLeaderBoard', 'Event ignored');
            return false;
        }

        const messageBody = message.data
            ? JSON.parse(Buffer.from(message.data, 'base64').toString())
            : null;

        await leaderBoardController.updateLeaderBoard(
            messageBody.auth,
            messageBody.data.payload,
        );

        return { message: 'Leader Board Updated.' };
    });

export const setUser = functions.https.onCall(async (data, context) => {
    const user = await userController.setUser(
        { id: context.auth.token.uid, email: context.auth.token.email },
        data,
    );

    return user;
});
