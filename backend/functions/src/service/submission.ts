import { v4 as uuid } from 'uuid';
import { MasterApiKeyError, MASTER_API_KEY } from '../util/const';
import { loadTopLevelDoc, updateTopLevelDoc } from '../util/db';

const collection = 'events';

function filterSubmissions(submissions, filters) {
    filters.forEach(f => submissions.filter(f));
    return submissions;
}

const fetchSubmissions = async (req, res) => {
    let filters = [];
    const queryKeys = Object.keys(req.query);
    if (queryKeys.length != 0) {
        for (const key of queryKeys)
            filters.push(s => s[key] === req.query[key]);
    } else {
        filters.push(s => true);
    }
    try {
        const dbResponse = await loadTopLevelDoc(collection);
        res.status(200).json(
            filterSubmissions(
                dbResponse.events.eventChallenges
                    .map(o => o.submissions)
                    .reduce((a, b) => a.concat(b), []),
                filters,
            ),
        );
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

const fetchSubmission = async (req, res) => {
    try {
        const dbResponse = await loadTopLevelDoc(collection);
        res.status(200).json(
            dbResponse.events.eventChallenges
                .map(o => o.submissions)
                .reduce((a, b) => a.concat(b), [])
                .filter(s => s.id === req.params.id)[0],
        );
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

const createSubmission = async function (req, res) {
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
            eventToModify.submissions.push({
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
    fetchSubmission,
    fetchSubmissions,
    createSubmission,
};
