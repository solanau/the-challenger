import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { challengeService } from './service/challenge';
import { eventService } from './service/event';
import { leaderboardService } from './service/leaderboard';
import { submissionService } from './service/submission';
import { userService } from './service/user';

const profileRoute = require('./service/profile');
const eventRoute = require('./service/event');
const challengeRoute = require('./service/challenge');
const prizeRoute = require('./service/prize');
const rewardRoute = require('./service/reward');
const mintRoute = require('./service/mint');

admin.initializeApp(functions.config().firebase);

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

export const createSubmission = functions.https.onCall(
    async (data, context) => {
        const submission = await submissionService.createSubmission(
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
        await submissionService.reviewSubmission(
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
        await leaderboardService.updateLeaderBoard(
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
    const user = await userService.setUser(
        { id: context.auth.token.uid, email: context.auth.token.email },
        data,
    );

    return user;
});

export const createEvent = functions.https.onCall(async (data, context) => {
    const event = await eventService.createEvent(
        data,
        context.auth && {
            id: context.auth.token.uid,
            email: context.auth.token.email,
        },
    );

    return event;
});

export const updateEvent = functions.https.onCall(async (data, context) => {
    const event = await eventService.updateEvent(
        data,
        context.auth && {
            id: context.auth.token.uid,
            email: context.auth.token.email,
        },
    );

    return event;
});

export const createChallenge = functions.https.onCall(async (data, context) => {
    const challenge = await challengeService.createChallenge(
        data,
        context.auth && {
            id: context.auth.token.uid,
            email: context.auth.token.email,
        },
    );

    return challenge;
});

export const updateChallenge = functions.https.onCall(async (data, context) => {
    const challenge = await challengeService.updateChallenge(
        data,
        context.auth && {
            id: context.auth.token.uid,
            email: context.auth.token.email,
        },
    );

    return challenge;
});
