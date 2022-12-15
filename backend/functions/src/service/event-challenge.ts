import { v4 as uuid } from 'uuid';
import { MasterApiKeyError, MASTER_API_KEY } from '../util/const';
import { loadTopLevelDoc, updateTopLevelDoc } from '../util/db';

const collection = 'events';

const fetchEventChallenges = async (req, res) => {
    try {
        const dbResponse = await loadTopLevelDoc(collection);
        res.status(200).json(
            dbResponse.events.eventChallenges
                .map(o => o.eventChallenges)
                .reduce((a, b) => a.concat(b), []),
        );
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

const fetchEventChallenge = async (req, res) => {
    try {
        const dbResponse = await loadTopLevelDoc(collection);
        res.status(200).json(
            dbResponse.events.eventChallenges
                .map(o => o.eventChallenges)
                .reduce((a, b) => a.concat(b), [])
                .filter(s => s.challengeId === req.params.challengeId)[0],
        );
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

const createEventChallenge = async function (req, res) {
    if (req.params.masterApiKey != MASTER_API_KEY) {
        console.error(MasterApiKeyError);
        res.status(401).send(MasterApiKeyError);
    } else {
        try {
            const id = uuid();
            const updateId = req.body['eventId'];
            let eventToModify: any;
            const dbResponse = await loadTopLevelDoc(collection);
            let events = dbResponse.events.filter(o => {
                if (o.id === updateId) {
                    eventToModify = o;
                } else {
                    return true;
                }
            });
            eventToModify.eventChallenges.push({
                id,
                ...req.body,
            });
            events.push(eventToModify);
            await updateTopLevelDoc(collection, { events });
            res.status(201).json({
                id,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
};

export default {
    fetchEventChallenge,
    fetchEventChallenges,
    createEventChallenge,
};
