import { PublicKey } from '@solana/web3.js';
import { createCustomMint } from 'prestige-protocol';
import { db } from '..';
import { connection, MASTER_API_KEY, WALLET } from '../util/const';
import { MintPayload } from '../util/types';
import { DatabaseError, PayloadError, PrestigeError } from '../util/util';

interface CustomMintDto {
    pubkey: string;
}

const objectType = 'CustomMints';
const customMintCollection = 'customMints';

exports.fetchCustomMints = async (req, res) => {
    try {
        const customMintQuerySnapshot = await db
            .collection(customMintCollection)
            .get();
        const customMints: MintPayload[] = [];
        customMintQuerySnapshot.forEach(async doc => {
            const data = doc.data();
            customMints.push({
                pubkey: data.pubkey,
                mintTitle: data.mintTitle,
                mintSymbol: data.mintSymbol,
                mintUri: data.mintUri,
                decimals: data.decimals,
            });
        });
        res.status(200).json(customMints);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.createNewCustomMint = async function (req, res) {
    if (req.params.masterApiKey != MASTER_API_KEY) {
        console.error('Request blocked: Invalid Master API key.');
        res.status(400).send('Request blocked: Invalid Master API key.');
    } else {
        let rawCustomMint: Omit<MintPayload, 'pubkey'>;
        let customMintPubkey: PublicKey;
        try {
            rawCustomMint = {
                mintTitle: req.body['mintTitle'],
                mintSymbol: req.body['mintSymbol'],
                mintUri: req.body['mintUri'],
                decimals: req.body['decimals'],
            };
        } catch (error) {
            console.log(error);
            res.status(500).send(PayloadError());
        }
        try {
            customMintPubkey = (
                await createCustomMint(
                    connection,
                    WALLET,
                    WALLET.publicKey,
                    rawCustomMint.mintTitle,
                    rawCustomMint.mintSymbol,
                    rawCustomMint.mintUri,
                    rawCustomMint.decimals,
                )
            )[0];
        } catch (error) {
            console.log(error);
            res.status(400).send(PrestigeError(objectType));
        }
        try {
            const customMint: CustomMintDto = {
                pubkey: customMintPubkey.toBase58(),
                ...rawCustomMint,
            };
            const newDoc = await db
                .collection(customMintCollection)
                .add(customMint);
            res.status(201).send({
                pubkey: customMintPubkey.toBase58(),
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(DatabaseError(objectType));
        }
    }
};
