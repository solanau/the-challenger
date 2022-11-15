import { PublicKey } from '@solana/web3.js';
// import { issueAllRewardsForChallenge } from 'prestige-protocol';
import { connection, MASTER_API_KEY, PRESTIGE_PROGRAM_ID, WALLET } from '../util/const';
import { IssueRewardsPayload } from '../util/types';
import { MasterApiKeyError, PrestigeError } from '../util/util';


const objectType = "Reward";

exports.issueAllRewardsForChallenge = async function(req, res) {

    if (req.params.masterApiKey != MASTER_API_KEY) {
        console.error(MasterApiKeyError());
        res.status(400).send(MasterApiKeyError())
    } else {
        const rewardCommand: IssueRewardsPayload = req.body;
        // try {
        //     await issueAllRewardsForChallenge(
        //         connection, 
        //         WALLET, 
        //         PRESTIGE_PROGRAM_ID, 
        //         new PublicKey(rewardCommand.challengePubkey), 
        //         new PublicKey(rewardCommand.userPubkey), 
        //     );
        // } catch (error) {
        //     console.log(error);
        //     res.status(400).send(PrestigeError(objectType));
        // }
    }
};