import { PublicKey } from '@solana/web3.js';
import { createChallenge } from 'prestige-protocol';
import { db } from '..';
import { ChallengePayload } from '../../../../app/src/types/api';
import { connection, MASTER_API_KEY, WALLET } from '../util/const';
import {
    DatabaseError,
    MasterApiKeyError,
    PayloadError,
    PrestigeError,
} from '../util/util';

const objectType = 'Challenge';
const challengeCollection = 'challenges';

const fetchAllChallenges = async (req, res) => {
    try {
        const challengeQuerySnapshot = await db
            .collection(challengeCollection)
            .get();
        const challenges: any[] = [];
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

const fetchChallenge = async (req, res) => {
    try {
        const challengeQuerySnapshot = await db
            .collection(challengeCollection)
            .where('id', '==', req.params.id)
            .get();
        const challenges: any[] = [];
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

const createChallenge = async function (req, res) {
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
            function mapFromTags(tags: { value: string }[]) {
                let combined = '';
                tags.forEach(t => (combined += t.value));
                return combined;
            }
            const challengeTagsCombined = rawChallenge.tags
                ? mapFromTags(rawChallenge.tags)
                : 'none';
            challengePubkey = (
                await createChallenge(
                    connection,
                    WALLET,
                    rawChallenge.title,
                    rawChallenge.shortDescription,
                    rawChallenge.authorName,
                    challengeTagsCombined,
                )
            )[0];
        } catch (error) {
            console.log(error);
            res.status(500).send(PrestigeError(objectType));
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

const updateChallenge = async function (req, res) {
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

export default {
    fetchAllChallenges,
    fetchChallenge,
    createChallenge,
    updateChallenge,
};
