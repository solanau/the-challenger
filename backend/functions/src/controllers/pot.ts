import { PublicKey } from '@solana/web3.js';
import { createPot } from 'prestige-protocol';
import { db } from '..';
import { connection, MASTER_API_KEY, WALLET } from '../util/const';
import { PotPayload } from '../util/types';
import { DatabaseError, PayloadError, PrestigeError } from '../util/util';

const objectType = 'Pot';
const potCollection = 'pot';

exports.fetchPot = async (req, res) => {
    try {
        const potQuerySnapshot = await db.collection(potCollection).get();
        const pot: PotPayload[] = [];
        potQuerySnapshot.forEach(async doc => {
            const data = doc.data();
            pot.push({
                pubkey: data.pubkey,
                eventPubkey: data.eventPubkey,
                mint: data.mint,
                escrowOrMintAuthority: data.escrowOrMintAuthority,
                mintControl: data.mintControl,
                pot: data.pot,
            });
        });
        res.status(200).json(pot);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.createNewPot = async function (req, res) {
    if (req.params.masterApiKey != MASTER_API_KEY) {
        console.error('Request blocked: Invalid Master API key.');
        res.status(400).send('Request blocked: Invalid Master API key.');
    } else {
        let rawPot: Omit<PotPayload, 'pubkey'>;
        let potPubkey: PublicKey;
        try {
            rawPot = {
                eventPubkey: req.body['eventPubkey'],
                mint: req.body['mint'],
                escrowOrMintAuthority: req.body['escrowOrMintAuthority'],
                mintControl: req.body['mintControl'],
                pot: req.body['pot'],
            };
        } catch (error) {
            console.log(error);
            res.status(500).send(PayloadError());
        }
        try {
            potPubkey = (
                await createPot(
                    connection,
                    WALLET,
                    new PublicKey(rawPot.eventPubkey),
                    new PublicKey(rawPot.mint),
                    new PublicKey(rawPot.escrowOrMintAuthority),
                    rawPot.mintControl,
                    rawPot.pot,
                )
            )[0];
        } catch (error) {
            console.log(error);
            res.status(400).send(PrestigeError(objectType));
        }
        try {
            const pot: PotPayload = {
                pubkey: potPubkey.toBase58(),
                ...rawPot,
            };
            const newDoc = await db.collection(potCollection).add(pot);
            res.status(201).send({
                pubkey: potPubkey.toBase58(),
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(DatabaseError(objectType));
        }
    }
};
