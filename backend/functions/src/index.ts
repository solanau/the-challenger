import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import adminService from './service/admin';
import challengeService from './service/challenge';
import eventService from './service/event';
import submissionService from './service/submission';

admin.initializeApp(functions.config().firebase);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    cors({
        origin: ['http://localhost:3000', 'https://germany.heavyduty.builders'],
    }),
);

/**
 * Init
 */
app.post(
    '/init/:masterApiKey',
    async (req, res) => await adminService.initDb(req, res),
);

/**
 * Events
 */
app.get(
    '/events',
    async (req, res) => await eventService.fetchAllEvents(req, res),
);
app.get(
    '/event/:id',
    async (req, res) => await eventService.fetchEvent(req, res),
);
app.post(
    '/event/:masterApiKey',
    async (req, res) => await eventService.createEvent(req, res),
);
app.put(
    '/event/:id/:masterApiKey',
    async (req, res) => await eventService.updateEvent(req, res),
);

/**
 * Challenges
 */
app.get(
    '/challenges',
    async (req, res) => await challengeService.fetchAllChallenges(req, res),
);
app.get(
    '/challenge/:id',
    async (req, res) => await challengeService.fetchChallenge(req, res),
);
app.post(
    '/challenge/:masterApiKey',
    async (req, res) => await challengeService.createChallenge(req, res),
);
app.put(
    '/challenge/:id/:masterApiKey',
    async (req, res) => await challengeService.updateChallenge(req, res),
);

/**
 * Submissions
 */
app.get(
    '/submissions',
    async (req, res) => await submissionService.fetchSubmissions(req, res),
);
app.get(
    '/submission/:id',
    async (req, res) => await submissionService.fetchSubmission(req, res),
);
app.post(
    '/submission/:masterApiKey',
    async (req, res) => await submissionService.createSubmission(req, res),
);

export const db = admin.firestore();
export const webApi = functions.https.onRequest(app);
