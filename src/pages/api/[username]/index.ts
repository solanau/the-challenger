import { NextApiHandler } from 'next';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getUser } from 'lib/user';
import { unstable_getServerSession } from 'next-auth';

// GET /api/[username]/

const handler: NextApiHandler = async (req, res) => {
    const username = req.query.username as string;
    const session = await unstable_getServerSession(req, res, authOptions);
    const accessToken = session?.accessToken as string;

    const user = await getUser(username, accessToken);

    return res.status(200).json(user);
};

export default handler;
