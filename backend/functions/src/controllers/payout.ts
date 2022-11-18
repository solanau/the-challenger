import { PublicKey } from '@solana/web3.js';
import { issuePayout } from 'prestige-protocol';
import { connection, MASTER_API_KEY, WALLET } from '../util/const';
import { IssuePayoutPayload } from '../util/types';
import { MasterApiKeyError, PrestigeError } from '../util/util';

const objectType = 'Payout';

exports.issuePayout = async function (req, res) {
    if (req.params.masterApiKey != MASTER_API_KEY) {
        console.error(MasterApiKeyError());
        res.status(400).send(MasterApiKeyError());
    } else {
        const payoutCommand: IssuePayoutPayload = req.body;
        try {
            await issuePayout(
                connection,
                WALLET,
                new PublicKey(payoutCommand.potPubkey),
                new PublicKey(payoutCommand.userPubkey),
                payoutCommand.amount,
            );
        } catch (error) {
            console.log(error);
            res.status(400).send(PrestigeError(objectType));
        }
    }
};
