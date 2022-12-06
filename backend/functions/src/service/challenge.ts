import { Keypair } from '@solana/web3.js';
import { v4 as uuid } from 'uuid';
import { MasterApiKeyError, MASTER_API_KEY } from '../util/const';
import { loadTopLevelDoc, updateTopLevelDoc } from '../util/db';

const collection = 'challenges';

const fetchAllChallenges = async (req, res) => {
    try {
        const dbResponse = await loadTopLevelDoc(collection);
        res.status(200).json(dbResponse.challenges);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

const fetchChallenge = async (req, res) => {
    try {
        const dbResponse = await loadTopLevelDoc(collection);
        for (const chal of dbResponse.challenges) {
            if (chal.id === req.params.id) {
                res.status(200).json(chal);
            }
            res.status(302).json('Challenge not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

const createChallenge = async function (req, res) {
    if (req.params.masterApiKey != MASTER_API_KEY) {
        console.error(MasterApiKeyError);
        res.status(401).send(MasterApiKeyError);
    } else {
        try {
            const id = uuid();
            const dbResponse = await loadTopLevelDoc(collection);
            let challenges = dbResponse.challenges;
            const publicKey = Keypair.generate().publicKey.toBase58();
            challenges.push({
                id,
                publicKey,
                ...req.body,
            });
            await updateTopLevelDoc(collection, { challenges });
            res.status(201).json({
                id,
                publicKey,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
};

const updateChallenge = async function (req, res) {
    if (req.params.masterApiKey != MASTER_API_KEY) {
        console.error(MasterApiKeyError);
        res.status(401).send(MasterApiKeyError);
    } else {
        try {
            const updateId = req.params.id;
            let updatePublicKey: string;
            let originalValue: any;
            const dbResponse = await loadTopLevelDoc(collection);
            let challenges = dbResponse.challenges.filter(o => {
                if (o.id === updateId) {
                    updatePublicKey = o.publicKey;
                    originalValue = o;
                } else {
                    return true;
                }
            });
            challenges.push({
                ...originalValue,
                ...req.body,
            });
            await updateTopLevelDoc(collection, { challenges });
            res.status(201).json({
                id: updateId,
                publicKey: updatePublicKey,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
};

export default {
    fetchAllChallenges,
    fetchChallenge,
    createChallenge,
    updateChallenge,
};
