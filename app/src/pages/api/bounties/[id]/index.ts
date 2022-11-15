/* eslint-disable indent */
import { NextApiHandler } from 'next';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { closeIssue } from 'lib/github';
import { unstable_getServerSession } from 'next-auth';

const handler: NextApiHandler = async (req, res) => {
    const id = parseInt(req.query.id as string);
    const session = await unstable_getServerSession(req, res, authOptions);
    const accessToken = session?.accessToken as string;

    switch (req.method) {
        // PATCH /api/bounties/[id]
        case 'PATCH': {
            const response = await closeIssue(id, accessToken);

            res.status(200).json(response);
            break;
        }
        default:
            res.setHeader('Allow', ['PATCH']);
            res.status(405).end(`Method ${req.method} not allowed`);
    }
};

export default handler;
