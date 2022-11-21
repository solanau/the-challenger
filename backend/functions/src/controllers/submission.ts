import * as functions from 'firebase-functions';
import { db } from '..';
import { MASTER_API_KEY } from '../util/const';
import { Auth, CreateSubmissionPayload } from '../util/types';
import { DatabaseError, MasterApiKeyError, NotFoundError } from '../util/util';

const objectType = 'Submission';
const submissionCollection = 'submissions';

export const isDuplicateSubmission = async (
    eventId: string,
    userId: string,
    challengeId: string,
) => {
    const pastSubmissions = await db
        .collection(submissionCollection)
        .where('eventId', '==', eventId)
        .where('userId', '==', userId)
        .where('challengeId', '==', challengeId)
        .get();

    return !pastSubmissions.empty;
};

class SubmissionController {
    async createSubmission(auth: Auth, payload: CreateSubmissionPayload) {
        if (
            await isDuplicateSubmission(
                payload.eventId,
                auth.id,
                payload.challengeId,
            )
        ) {
            throw new functions.https.HttpsError(
                'already-exists',
                `There's another submission exactly like this one.`,
            );
        }

        const challenge = await db
            .doc(`challenges/${payload.challengeId}`)
            .get();

        await db.doc(`submissions/${payload.id}`).set({
            ...payload,
            status: 'pending',
            userId: auth.id,
            challenge: {
                uid: challenge.id,
                ...challenge.data(),
            },
        });

        return payload;
    }
}

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

export const controller = new SubmissionController();
