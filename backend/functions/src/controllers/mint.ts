import { Keypair } from "@solana/web3.js";
import { db } from "..";
import { MASTER_API_KEY } from "../util/const";
import { MintPayload } from "../util/types";

interface CustomMintDto {
  pubkey: string;
}

const customMintCollection = "customMints";

exports.fetchCustomMints = async (req, res) => {
  try {
    const customMintQuerySnapshot = await db
      .collection(customMintCollection)
      .get();
    const customMints: MintPayload[] = [];
    customMintQuerySnapshot.forEach(async (doc) => {
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
    console.error("Request blocked: Invalid Master API key.");
    res.status(400).send("Request blocked: Invalid Master API key.");
  } else {
    try {
      const rawCustomMint: Omit<MintPayload, "pubkey"> = {
        mintTitle: req.body["mintTitle"],
        mintSymbol: req.body["mintSymbol"],
        mintUri: req.body["mintUri"],
        decimals: req.body["decimals"],
      };

      const customMintPubkey = Keypair.generate().publicKey;
      // const [customMintPubkey, _mintAuthorityPubkey, _metadataPubkey] =
      //   await createCustomMint(
      //     connection,
      //     WALLET,
      //     PRESTIGE_PROGRAM_ID,
      //     WALLET.publicKey,
      //     rawCustomMint.mintTitle,
      //     rawCustomMint.mintSymbol,
      //     rawCustomMint.mintUri,
      //     rawCustomMint.decimals
      //   );

      const customMint: CustomMintDto = {
        pubkey: customMintPubkey.toBase58(),
        ...rawCustomMint,
      };

      const newDoc = await db.collection(customMintCollection).add(customMint);
      res.status(201).send({
        pubkey: customMintPubkey.toBase58(),
      });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .send("CustomMint should contain id, key, title, and description.");
    }
  }
};
