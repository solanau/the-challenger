import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const profileRoute = require('./controllers/profile');
const eventRoute = require('./controllers/event');
const challengeRoute = require('./controllers/challenge');
const prizeRoute = require('./controllers/prize');
const submissionRoute = require('./controllers/submission');
const rewardRoute = require('./controllers/reward');
const mintRoute = require('./controllers/mint');

admin.initializeApp(functions.config().firebase);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: ['http://localhost:3000', "https://germany.heavyduty.builders"] }));

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
app.get(
    '/submissions',
    async (req, res) => await submissionRoute.fetchSubmissions(req, res),
);
app.get(
    '/submissions/:id',
    async (req, res) => await submissionRoute.fetchSubmissionById(req, res),
);
app.post(
    '/submission/:masterApiKey',
    async (req, res) => await submissionRoute.createNewSubmission(req, res),
);
app.patch(
    '/submission/:id/:masterApiKey',
    async (req, res) => await submissionRoute.updateSubmissionStatus(req, res),
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
