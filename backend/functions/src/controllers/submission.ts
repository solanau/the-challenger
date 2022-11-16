import { db } from '..';
import { MASTER_API_KEY } from '../util/const';
import { SubmissionPayload } from '../util/types';
import {
    DatabaseError,
    DuplicateSubmissionError,
    MasterApiKeyError,
    NotFoundError,
    PayloadError,
} from '../util/util';

const objectType = 'Submission';
const submissionCollection = 'submissions';

exports.fetchSubmissions = async (req, res) => {
    try {
        let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData>;

        Object.keys(req.query).forEach(key => {
            if (!query) {
                query = db.collection(submissionCollection);
            }

            query = query.where(key, '==', req.query[key]);
        });

        const submissionQuerySnapshot = await query.get();
        const submissions: SubmissionPayload[] = [];
        submissionQuerySnapshot.forEach(doc => {
            const data: any = doc.data();
            submissions.push({
                id: doc.id,
                ...data,
            });
        });

        res.status(200).json(submissions);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.fetchSubmissionById = async (req, res) => {
    try {
        const submission = await db
            .doc(`${submissionCollection}/${req.params.id}`)
            .get();

        res.status(200).json({
            id: submission.id,
            ...submission.data(),
        });
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
            await db
                .doc(`${submissionCollection}/${submission.id}`)
                .set(submission);

            return res.status(201).send({
                submissionId: submission.id,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send(DatabaseError(objectType));
        }
    }
};

exports.updateSubmissionStatus = async function (req, res) {
    if (req.params.masterApiKey != MASTER_API_KEY) {
        console.error(MasterApiKeyError());
        return res.status(400).send(MasterApiKeyError());
    } else {
        const submission = await db
            .doc(`${submissionCollection}/${req.params.id}`)
            .get();

        if (!submission) {
            return res.status(404).send(NotFoundError());
        }

        try {
            await db.doc(`${submissionCollection}/${req.params.id}`).update({
                status: req.body.status,
            });
            return res.status(201).send({
                submissionId: req.params.id,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send(DatabaseError(objectType));
        }
    }
};
