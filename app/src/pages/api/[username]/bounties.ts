import { NextApiHandler } from 'next';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getBountiesByAssignee } from 'lib/bounties';
import { unstable_getServerSession } from 'next-auth';

// GET /api/[username]/bounties

const handler: NextApiHandler = async (req, res) => {
    const username = req.query.username as string;
    const session = await unstable_getServerSession(req, res, authOptions);
    const accessToken = session?.accessToken as string;

    const bountiesByAssignee = await getBountiesByAssignee(
        username,
        accessToken,
    );

    return res.status(200).json(bountiesByAssignee);
};

export default handler;
