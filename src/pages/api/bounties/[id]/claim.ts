/* eslint-disable indent */
import { NextApiHandler } from 'next';
import { PublicKey } from '@solana/web3.js';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { claimBounty } from 'lib/drill';
import { unstable_getServerSession } from 'next-auth';

// POST /api/bounties/[id]/claim

const handler: NextApiHandler = async (req, res) => {
    const id = parseInt(req.query.id as string);
    const session = await unstable_getServerSession(req, res, authOptions);

    const data = JSON.parse(req.body);

    const userVault = new PublicKey(data.userVault);
    const accessToken = session?.accessToken as string;

    switch (req.method) {
        case 'POST': {
            const response = await claimBounty(id, userVault, accessToken);

            return res.status(200).json(response);
        }
    }
};

export default handler;
