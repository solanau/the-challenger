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

export * from '../../../app/src/types';

admin.initializeApp(functions.config().firebase);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: ['http://localhost:3000'] }));

export const db = admin.firestore();
export const webApi = functions.https.onRequest(app);

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

export const updateLeaderboard = functions.https.onCall(
    async (data, context) => {
        await leaderboardService.updateLeaderboard(
            {
                id: context.auth.token.uid,
                email: context.auth.token.email,
            },
            data,
        );
        return { message: 'Leaderboard Updated.' };
    },
);

export const getAllUsers = functions.https.onCall(async () => {
    const allUsers = await userService.getAllUsers();
    return allUsers;
});

export const setUser = functions.https.onCall(async (data, context) => {
    const user = await userService.setUser(
        { id: context.auth.token.uid, email: context.auth.token.email },
        data,
    );
    return user;
});

export const updateUser = functions.https.onCall(async (data, context) => {
    const user = await userService.updateUser(
        { id: context.auth.token.uid, email: context.auth.token.email },
        data,
    );
    return user;
});
