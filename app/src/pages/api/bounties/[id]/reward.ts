import { NextApiHandler } from 'next';
import { getBountyReward } from 'lib/bounties';

// GET /api/bounties/[id]/reward

const handler: NextApiHandler = async (req, res) => {
    const id = parseInt(req.query.id as string);
    const reward = await getBountyReward(id);

    return res.status(200).json(reward);
};

export default handler;
