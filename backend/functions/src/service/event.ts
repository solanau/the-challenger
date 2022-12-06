import { Keypair } from '@solana/web3.js';
import { v4 as uuid } from 'uuid';
import { MasterApiKeyError, MASTER_API_KEY } from '../util/const';
import { loadTopLevelDoc, updateTopLevelDoc } from '../util/db';

const collection = 'events';

const fetchAllEvents = async (req, res) => {
    try {
        const dbResponse = await loadTopLevelDoc(collection);
        if (!dbResponse) console.log(dbResponse);
        res.status(200).json(dbResponse.events);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

const fetchEvent = async (req, res) => {
    try {
        const dbResponse = await loadTopLevelDoc(collection);
        for (const chal of dbResponse.events) {
            if (chal.id === req.params.id) {
                res.status(200).json(chal);
            }
            res.status(302).json('Event not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

const createEvent = async function (req, res) {
    if (req.params.masterApiKey != MASTER_API_KEY) {
        console.error(MasterApiKeyError);
        res.status(401).send(MasterApiKeyError);
    } else {
        try {
            const id = uuid();
            const dbResponse = await loadTopLevelDoc(collection);
            let events = dbResponse.events;
            const publicKey = Keypair.generate().publicKey.toBase58();
            events.push({
                id,
                publicKey,
                ...req.body,
            });
            await updateTopLevelDoc(collection, { events });
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

const updateEvent = async function (req, res) {
    if (req.params.masterApiKey != MASTER_API_KEY) {
        console.error(MasterApiKeyError);
        res.status(401).send(MasterApiKeyError);
    } else {
        try {
            const updateId = req.params.id;
            let updatePublicKey: string;
            let originalValue: any;
            const dbResponse = await loadTopLevelDoc(collection);
            let events = dbResponse.events.filter(o => {
                if (o.id === updateId) {
                    updatePublicKey = o.publicKey;
                    originalValue = o;
                } else {
                    return true;
                }
            });
            events.push({
                ...originalValue,
                ...req.body,
            });
            await updateTopLevelDoc(collection, { events });
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
    fetchAllEvents,
    fetchEvent,
    createEvent,
    updateEvent,
};
