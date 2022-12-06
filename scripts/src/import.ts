import dotenv from "dotenv";
import { mockChallenges } from "../app/src/mocks/challenges";
import {
  createNewChallenge,
  createNewPrize,
  fetchConfig,
} from "../src/lib/api";

dotenv.config();

/**
 * This script will import challenges to the DB.
 *
 */

async function sleep(s: number) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}

async function main() {
  const configs = await fetchConfig();

  // /**
  //  * Import all mock challenges into the database.
  //  */

  console.log("Importing challenges...");

  let x = 1;
  const t = mockChallenges.length;
  for (const chal of mockChallenges) {
    const challengePubkey = await createNewChallenge({
      state: "open",
      ...chal,
    });

    let mintPubkey = configs.xpTokenPubkey;
    let quantity = chal.rewardValue;

    await createNewPrize({
      eventPubkey: configs.eventPubkey,
      challengePubkey: challengePubkey,
      mintPubkey,
      mintControl: 0,
      escrowOrMintAuthority: configs.masterWalletPubkey,
      quantity,
    });

    if (chal.nftBadge) {
      if (chal.difficulty === "Hard") {
        mintPubkey = configs.nftBadgePubkeyHard;
      } else if (chal.difficulty === "Medium") {
        mintPubkey = configs.nftBadgePubkeyMedium;
      } else {
        mintPubkey = configs.nftBadgePubkeyEasy;
      }
      quantity = 1;
      await createNewPrize({
        eventPubkey: configs.eventPubkey,
        challengePubkey: challengePubkey,
        mintPubkey,
        mintControl: 0,
        escrowOrMintAuthority: configs.masterWalletPubkey,
        quantity,
      });
    }

    console.log(`   Challenge ${x}/${t} imported.`);
    x++;
    await sleep(1);
  }

  console.log("All challenges imported.");
}

main();