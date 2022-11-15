import { mockChallenges } from 'mocks/challenges';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
    switch (req.method) {
        // GET /api/challenges
        case 'GET': {
            res.status(200).json(mockChallenges);
            break;
        }
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} not allowed`);
    }
};

export default handler;
