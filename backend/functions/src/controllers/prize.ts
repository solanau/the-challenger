import { Keypair, PublicKey } from '@solana/web3.js';
// import { createPrize, fetchPrizeAndMintMetadata, updatePrize } from 'prestige-protocol';
import { db } from '..';
import { connection, MASTER_API_KEY, PRESTIGE_PROGRAM_ID, WALLET } from '../util/const';
import { PrizeMintMetadataPayload, PrizePayload } from '../util/types';
import { DatabaseError, MasterApiKeyError, PayloadError, PrestigeError } from '../util/util';



interface PrizeDto {
    pubkey: string,
    mintPubkey: string,
}

const objectType = "Prize";
const prizeCollection = 'prizes';


exports.fetchPrizesForEvent = async (req, res) => {
    try {
        const prizeQuerySnapshot = await db.collection(prizeCollection).get();
        const prizes: PrizeMintMetadataPayload[] = [];
        for (var doc of prizeQuerySnapshot.docs) {
            const data = doc.data();
            // const onChainData = await fetchPrizeAndMintMetadata(
            //     connection,
            //     new PublicKey(data.pubkey),
            // );
            // prizes.push({
            //     pubkey: onChainData.address.toBase58(),
            //     challengePubkey: onChainData.prize.challenge.toBase58(),
            //     mintPubkey: onChainData.mint.address.toBase58(),
            //     mintTitle: onChainData.metadata.data.name,
            //     mintSymbol: onChainData.metadata.data.symbol,
            //     mintUri: onChainData.metadata.data.uri,
            //     decimals: onChainData.mint.decimals,
            //     escrowOrMintAuthority: onChainData.prize.escrow_or_mint_authority.toBase58(),
            //     quantity: onChainData.prize.quantity.toNumber(),
            // });
            prizes.push({
                pubkey: data.pubkey,
                challengePubkey: data.challengePubkey,
                mintPubkey: data.mintPubkey,
                mintTitle: data.mintTitle,
                mintSymbol: data.mintSymbol,
                mintUri: data.mintUri,
                decimals: data.decimals,
                escrowOrMintAuthority: data.escrowOrMintAuthority,
                quantity: data.quantity,
            });
        }
        res.status(200).json(prizes);
    } catch (error) {
        console.log(error);
        
        res.status(500).send(error);
    }
};


exports.createNewPrize = async (req, res) => {

    if (req.params.masterApiKey != MASTER_API_KEY) {
        console.error(MasterApiKeyError());
        res.status(400).send(MasterApiKeyError())
    } else {
        let rawPrize: Omit<PrizePayload, 'pubkey'>;
        // let prizePubkey: PublicKey;
        const prizePubkey = Keypair.generate().publicKey;
        try {
            rawPrize = {
                challengePubkey: req.body['challengePubkey'],
                mintPubkey: req.body['mintPubkey'],
                mintControl: req.body['mintControl'],
                escrowOrMintAuthority: req.body['escrowOrMintAuthority'],
                quantity: req.body['quantity'],
            };
        } catch (error) {
            console.log(error);
            res.status(400).send(PayloadError());
        }
        // try {
        //     prizePubkey = (await createPrize(
        //         connection,
        //         WALLET,
        //         PRESTIGE_PROGRAM_ID,
        //         new PublicKey(rawPrize.challengePubkey),
        //         new PublicKey(rawPrize.mintPubkey),
        //         new PublicKey(rawPrize.escrowOrMintAuthority),
        //         rawPrize.mintControl,
        //         rawPrize.quantity,
        //     ))[0];
        // } catch (error) {
        //     console.log(error);
        //     res.status(500).send(PrestigeError(objectType));
        // }
        try {
            const prize: PrizeDto = { pubkey: prizePubkey.toBase58(), ...rawPrize };
            const newDoc = await db.collection(prizeCollection).add(prize);
            res.status(201).send({
                pubkey: prizePubkey.toBase58(),
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(DatabaseError(objectType));
        }
    }
};


exports.updatePrize = async (req, res) => {

    if (req.params.masterApiKey != MASTER_API_KEY) {
        console.error(MasterApiKeyError());
        res.status(400).send(MasterApiKeyError())
    } else {
        let rawPrize: PrizePayload;
        try {
            rawPrize = {
                pubkey: req.body['pubkey'],
                challengePubkey: req.body['challengePubkey'],
                mintPubkey: req.body['mintPubkey'],
                mintControl: req.body['mintControl'],
                escrowOrMintAuthority: req.body['escrowOrMintAuthority'],
                quantity: req.body['quantity'],
            };
        } catch (error) {
            console.log(error);
            res.status(400).send(PayloadError());
        }
        // try {
        //     await updatePrize(
        //         connection,
        //         WALLET,
        //         PRESTIGE_PROGRAM_ID,
        //         new PublicKey(rawPrize.pubkey),
        //         new PublicKey(rawPrize.challengePubkey),
        //         new PublicKey(rawPrize.mintPubkey),
        //         new PublicKey(rawPrize.escrowOrMintAuthority),
        //         rawPrize.mintControl,
        //         rawPrize.quantity,
        //     );
        // } catch (error) {
        //     console.log(error);
        //     res.status(500).send(PrestigeError(objectType));
        // }
        try {
            const prize: PrizeDto = {  ...rawPrize };
            const newDoc = await db.collection(prizeCollection).doc(req.params.id).set(prize);
            res.status(201).send(`Updated prize: ${prize.pubkey}`);
        } catch (error) {
            console.log(error);
            res.status(500).send(DatabaseError(objectType));
        }
    }
};