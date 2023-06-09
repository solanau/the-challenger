import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { BulkSendCertificateParams, SendCertificatesInput, SendTestCerficateInput, SendTestCerficateParams, bulkSendParticipationCertificates, bulkSendTopLoaderboardCertificates, individualSendCertificate } from './controllers/certificate/';
import { controller as challengeController } from './controllers/challenge';
import { controller as eventController } from './controllers/event';
import { controller as leaderBoardController } from './controllers/leader-board';
import { controller as submissionController } from './controllers/submission';
import { controller as userController } from './controllers/user';
import { PK_SECRET_KEY } from './util/const';

const profileRoute = require('./controllers/profile');
const eventRoute = require('./controllers/event');
const challengeRoute = require('./controllers/challenge');
const prizeRoute = require('./controllers/prize');
const rewardRoute = require('./controllers/reward');
const mintRoute = require('./controllers/mint');

admin.initializeApp(functions.config().firebase);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    cors({
        origin: [
            'http://localhost:3000',
            'https://challenger.solana.org',
            'https://dev-challenger.solana.org',
        ],
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

export const createSubmission = functions.https.onCall(
    async (data, context) => {
        const submission = await submissionController.createSubmission(
            {
                id: context.auth.token.uid,
                email: context.auth.token.email,
            },
            data,
        );

        return submission;
    },
);

export const reviewSubmission = functions.https.onCall(
    async (data, context) => {
        await submissionController.reviewSubmission(
            {
                id: context.auth.token.uid,
                email: context.auth.token.email,
            },
            data,
        );

        return { message: 'Submission reviewed.' };
    },
);

export const updateLeaderBoard = functions.https.onCall(
    async (data, context) => {
        await leaderBoardController.updateLeaderBoard(
            {
                id: context.auth.token.uid,
                email: context.auth.token.email,
            },
            data,
        );

        return { message: 'Leader Board Updated.' };
    },
);

export const setUser = functions.https.onCall(async (data, context) => {
    const user = await userController.setUser(
        { id: context.auth.token.uid, email: context.auth.token.email },
        data,
    );

    return user;
});

export const createEvent = functions.https.onCall(async (data, context) => {
    const event = await eventController.createEvent(
        data,
        context.auth && {
            id: context.auth.token.uid,
            email: context.auth.token.email,
        },
    );

    return event;
});

export const updateEvent = functions.https.onCall(async (data, context) => {
    const event = await eventController.updateEvent(
        data,
        context.auth && {
            id: context.auth.token.uid,
            email: context.auth.token.email,
        },
    );

    return event;
});

export const createChallenge = functions.https.onCall(async (data, context) => {
    const challenge = await challengeController.createChallenge(
        data,
        context.auth && {
            id: context.auth.token.uid,
            email: context.auth.token.email,
        },
    );

    return challenge;
});

export const updateChallenge = functions.https.onCall(async (data, context) => {
    const challenge = await challengeController.updateChallenge(
        data,
        context.auth && {
            id: context.auth.token.uid,
            email: context.auth.token.email,
        },
    );

    return challenge;
});

export const getEventParticipants = functions.https.onCall(
    async (data, context) => {
        const participants = await eventController.getParticipants(
            data,
            context.auth && {
                id: context.auth.token.uid,
                email: context.auth.token.email,
            },
        );

        return participants;
    },
);


export const sendParticipationCertificates = functions
    .runWith({ secrets: [PK_SECRET_KEY] })
    .https.onCall(
        async (data, context) => {

            const { solana } = functions.config()
            console.log('Working on cluster ==>', solana.cluster)

            const { eventId } = data as SendCertificatesInput
            return bulkSendParticipationCertificates({
                eventId,
                cluster: solana.cluster,
                callerId: context.auth.token.uid
            } as BulkSendCertificateParams)
        },
    );



export const sendParticipationCertificateToAddress = functions
    .runWith({ secrets: [PK_SECRET_KEY] })
    .https.onCall(
        async (data, context) => {

            const { solana } = functions.config()
            console.log('Working on cluster ==>', solana.cluster)

            const { eventId, walletAddress } = data as SendTestCerficateInput
            return individualSendCertificate({
                eventId,
                cluster: solana.cluster,
                callerId: context.auth.token.uid,
                walletAddress
            } as SendTestCerficateParams)
        },
    );




export const sendTopLoaderboardCertificates = functions
    .runWith({ secrets: [PK_SECRET_KEY] })
    .https.onCall(
        async (data, context) => {

            const { solana } = functions.config()
            console.log('Working on cluster ==>', solana.cluster)

            const { eventId } = data as SendCertificatesInput
            return bulkSendTopLoaderboardCertificates({
                eventId,
                cluster: solana.cluster,
                callerId: context.auth.token.uid
            })
        },
    );