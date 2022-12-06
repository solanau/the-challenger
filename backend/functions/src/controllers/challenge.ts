import { PublicKey } from '@solana/web3.js';
import * as functions from 'firebase-functions';
import { createChallenge, updateChallenge } from 'prestige-protocol';
import { db } from '..';
import {
    connection,
    MASTER_API_KEY,
    PRESTIGE_PROGRAM_ID,
    WALLET,
} from '../util/const';
import {
    Auth,
    ChallengePayload,
    CreateChallengePayload,
    UpdateChallengePayload,
} from '../util/types';
import {
    DatabaseError,
    MasterApiKeyError,
    PayloadError,
    PrestigeError,
} from '../util/util';

const objectType = 'Challenge';
const challengeCollection = 'challenges';

exports.fetchChallengesForEvent = async (req, res) => {
    try {
        const challengeQuerySnapshot = await db
            .collection(challengeCollection)
            .get();
        const challenges: ChallengePayload[] = [];
        challengeQuerySnapshot.forEach(doc => {
            const data: any = doc.data();
            if (data.eventPubkey === req.params.eventPubkey)
                challenges.push(data);
        });
        res.status(200).json(challenges);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.fetchChallengeById = async (req, res) => {
    try {
        const challengeQuerySnapshot = await db
            .collection(challengeCollection)
            .where('id', '==', req.params.id)
            .get();
        const challenges: ChallengePayload[] = [];
        challengeQuerySnapshot.forEach(doc => {
            const data: any = doc.data();
            challenges.push(data);
        });
        res.status(200).json(challenges[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.fetchChallengeByKey = async (req, res) => {
    try {
        const challengeQuerySnapshot = await db
            .collection(challengeCollection)
            .where('key', '==', req.params.key.toString())
            .get();
        const challenges: ChallengePayload[] = [];
        challengeQuerySnapshot.forEach(doc => {
            const data: any = doc.data();
            challenges.push(data);
        });
        res.status(200).json(challenges[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.createNewChallenge = async function (req, res) {
    if (req.params.masterApiKey != MASTER_API_KEY) {
        console.error(MasterApiKeyError());
        res.status(400).send(MasterApiKeyError());
    } else {
        let rawChallenge: Omit<ChallengePayload, 'pubkey'>;
        let challengePubkey: PublicKey;
        try {
            rawChallenge = req.body;
            if (!rawChallenge['authorName'])
                rawChallenge['authorName'] = 'None';
        } catch (error) {
            console.log(error);
            res.status(500).send(PayloadError());
        }
        try {
            challengePubkey = (
                await createChallenge(
                    connection,
                    WALLET,
                    PRESTIGE_PROGRAM_ID,
                    new PublicKey(rawChallenge.eventPubkey),
                    rawChallenge.title,
                    rawChallenge.shortDescription,
                    rawChallenge.authorName,
                )
            )[0];
        } catch (error) {
            console.log(error);
            res.status(400).send(PrestigeError(objectType));
        }
        try {
            const challenge: ChallengePayload = {
                pubkey: challengePubkey.toBase58(),
                ...rawChallenge,
            };
            const newDoc = await db
                .collection(challengeCollection)
                .add(challenge);
            res.status(201).send({
                pubkey: challengePubkey.toBase58(),
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(DatabaseError(objectType));
        }
    }
};

exports.updateChallenge = async function (req, res) {
    if (req.params.masterApiKey != MASTER_API_KEY) {
        console.error(MasterApiKeyError());
        res.status(400).send(MasterApiKeyError());
    } else {
        let rawChallenge: ChallengePayload;
        try {
            rawChallenge = req.body;
            if (!rawChallenge['authorName'])
                rawChallenge['authorName'] = 'None';
        } catch (error) {
            console.log(error);
            res.status(400).send(PayloadError());
        }
        try {
            await updateChallenge(
                connection,
                WALLET,
                PRESTIGE_PROGRAM_ID,
                new PublicKey(rawChallenge.pubkey),
                new PublicKey(rawChallenge.eventPubkey),
                rawChallenge.title,
                rawChallenge.description,
                rawChallenge.authorName,
            );
        } catch (error) {
            console.log(error);
            res.status(500).send(PrestigeError(objectType));
        }
        try {
            const challenge: ChallengePayload = { ...rawChallenge };
            const newDoc = await db
                .collection(challengeCollection)
                .doc(req.params.id)
                .set(challenge);
            res.status(201).send(`Updated challenge: ${challenge.pubkey}`);
        } catch (error) {
            console.log(error);
            res.status(500).send(DatabaseError(objectType));
        }
    }
};

class ChallengeController {
    async createChallenge(payload: CreateChallengePayload, auth?: Auth) {
        if (!auth) {
            throw new functions.https.HttpsError(
                'permission-denied',
                `In order to create an challenge, you have to log in.`,
            );
        }

        const challenge = await db.doc(`challenges/${payload.id}`).set({
            title: payload.title,
            description: payload.description,
            userId: auth.id,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            isNew: true,
            version: 1,
        });

        return challenge;
    }

    async updateChallenge({ id, data }: UpdateChallengePayload, auth?: Auth) {
        if (!auth) {
            throw new functions.https.HttpsError(
                'permission-denied',
                `In order to update an challenge, you have to log in.`,
            );
        }

        const challenge = await db
            .doc(`challenges/${id}`)
            .update({ ...data, updatedAt: Date.now(), isNew: false });

        return challenge;
    }
}

export const controller = new ChallengeController();
