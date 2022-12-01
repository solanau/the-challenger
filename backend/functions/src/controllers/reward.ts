import { PublicKey } from '@solana/web3.js';
import {
    issueAllRewardsForChallenge,
    issueRewardsBatch,
} from 'prestige-protocol';
import {
    IssueRewardsBatchPayload,
    IssueRewardsPayload,
} from '../../../../app/src/types/api';
import { connection, MASTER_API_KEY, WALLET } from '../util/const';
import { MasterApiKeyError, PrestigeError } from '../util/util';

const objectType = 'Reward';

exports.issueAllRewardsForChallenge = async function (req, res) {
    if (req.params.masterApiKey != MASTER_API_KEY) {
        console.error(MasterApiKeyError());
        res.status(400).send(MasterApiKeyError());
    } else {
        const rewardCommand: IssueRewardsPayload = req.body;
        try {
            await issueAllRewardsForChallenge(
                connection,
                WALLET,
                new PublicKey(rewardCommand.eventPubkey),
                new PublicKey(rewardCommand.challengePubkey),
                new PublicKey(rewardCommand.userPubkey),
            );
        } catch (error) {
            console.log(error);
            res.status(400).send(PrestigeError(objectType));
        }
    }
};

exports.issueRewardsForChallengeBatch = async function (req, res) {
    if (req.params.masterApiKey != MASTER_API_KEY) {
        console.error(MasterApiKeyError());
        res.status(400).send(MasterApiKeyError());
    } else {
        const rewardBatchCommand: IssueRewardsBatchPayload = req.body;
        try {
            await issueRewardsBatch(
                connection,
                WALLET,
                new PublicKey(rewardBatchCommand.earnerPubkey),
                rewardBatchCommand.challengePubkeys.map(
                    chal => new PublicKey(chal),
                ),
            );
        } catch (error) {
            console.log(error);
            res.status(400).send(PrestigeError(objectType));
        }
    }
};
