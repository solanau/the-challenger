/* eslint-disable indent */
import { getBounties } from 'lib/bounties';
import {
    createChallengeSubmission,
    DuplicateChallengeSubmissionError,
    UserNotFoundError,
} from 'lib/github';
import { NextApiHandler } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const handler: NextApiHandler = async (req, res) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    const accessToken = session?.accessToken as string;

    switch (req.method) {
        // GET /api/bounties
        case 'GET': {
            const bounties = await getBounties(accessToken);
            res.status(200).json(bounties);
            break;
        }
        // POST /api/bounties
        case 'POST': {
            try {
                const response = await createChallengeSubmission(
                    accessToken,
                    req.body,
                );

                if (response === null) {
                    return res.status(500).json({});
                }

                res.status(200).json(response);
            } catch (error) {
                if (error instanceof UserNotFoundError) {
                    res.status(404).json({ code: error.name, message: error.message });
                } else if (error instanceof DuplicateChallengeSubmissionError) {
                    res.status(400).json({ code: error.name, message: error.message });
                } else {
                    res.status(500).json({ error: error });
                }
            }

            break;
        }
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} not allowed`);
    }
};

export default handler;
