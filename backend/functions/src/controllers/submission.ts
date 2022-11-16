import { db } from '..';
import { MASTER_API_KEY } from '../util/const';
import { SubmissionPayload } from '../util/types';
import {
    DatabaseError,
    DuplicateSubmissionError,
    MasterApiKeyError,
    PayloadError,
} from '../util/util';

const objectType = 'Submission';
const submissionCollection = 'submissions';

// Doesn't write to or load from chain

/**
 * Doesn't write to or load from chain
 */
exports.fetchAllSubmissions = async (req, res) => {
    try {
        const submissionQuerySnapshot = await db
            .collection(submissionCollection)
            .get();
        const submissions: SubmissionPayload[] = [];
        submissionQuerySnapshot.forEach(doc => {
            const data: any = doc.data();
            submissions.push(data);
        });
        res.status(200).json(submissions);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.fetchSubmissionsForChallenge = async (req, res) => {
    try {
        const submissionQuerySnapshot = await db
            .collection(submissionCollection)
            .where('challengeId', '==', req.params.challengeId)
            .get();
        const submissions: SubmissionPayload[] = [];
        submissionQuerySnapshot.forEach(doc => {
            const data: any = doc.data();
            submissions.push(data);
        });
        res.status(200).json(submissions);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.fetchSubmissionsForUsername = async (req, res) => {
    try {
        const submissionQuerySnapshot = await db
            .collection(submissionCollection)
            .where('username', '==', req.params.username)
            .get();
        const submissions: SubmissionPayload[] = [];
        submissionQuerySnapshot.forEach(doc => {
            const data: any = doc.data();
            submissions.push(data);
        });
        res.status(200).json(submissions);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.createNewSubmission = async function (req, res) {
    if (req.params.masterApiKey != MASTER_API_KEY) {
        console.error(MasterApiKeyError());
        return res.status(400).send(MasterApiKeyError());
    } else {
        let rawSubmission: SubmissionPayload;
        try {
            rawSubmission = req.body;
        } catch (error) {
            console.log(error);
            return res.status(500).send(PayloadError());
        }

        const pastSubmissions = await db
            .collection(submissionCollection)
            .where('eventId', '==', rawSubmission.eventId)
            .where('username', '==', rawSubmission.username)
            .where('challengeId', '==', rawSubmission.challengeId)
            .get();

        if (pastSubmissions.size > 0) {
            return res.status(400).send(DuplicateSubmissionError());
        }

        try {
            const submission: SubmissionPayload = {
                ...rawSubmission,
                status: 'pending',
            };
            const newDoc = await db
                .collection(submissionCollection)
                .add(submission);
            return res.status(201).send({
                submissionId: newDoc.id,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send(DatabaseError(objectType));
        }
    }
};
