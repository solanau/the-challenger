import { PublicKey } from '@solana/web3.js';
import { 
    createNewEvent,
    createNewChallenge,
    createNewPrize,
    createNewCustomMint,
} from '../src/lib/api';
import { mockChallenges } from '../src/mocks/challenges';

require('dotenv').config();


/**
 * This script will initialize everything for us in the DB.
 * 
 * Run it once, then our App & API are good to go.
 * 
 * We can change these values when we want to launch a new event.
 */


async function main() {

    /**
     * Create the token assets for the bounties.
     */
    console.log("Creating assets...");

    const xpTokenPubkey = await createNewCustomMint({
        mintTitle: "Heavy Duty Bounty XP",
        mintSymbol: "HDXP",
        mintUri: "https://raw.githubusercontent.com/heavy-duty/lisboa-bounty-program/api/assets/heavy-duty-xp.json?token=GHSAT0AAAAAABYU4EEMDB4WN33ZPCYI7AZ2Y2775TQ",
        decimals: 9,
    });
    console.log(`   xpTokenPubkey: ${xpTokenPubkey}`);

    const nftBadgePubkeyChoppa = await createNewCustomMint({
        mintTitle: "Lisbon Chopper Ride",
        mintSymbol: "CHOP",
        mintUri: "https://raw.githubusercontent.com/heavy-duty/lisboa-bounty-program/api/assets/chopper-nft.json?token=GHSAT0AAAAAAB3CH6AWTFBMLEYJROUUZ7NYY3QBZYA",
        decimals: 0,
    });
    console.log(`   nftBadgePubkeyChoppa: ${nftBadgePubkeyChoppa}`);

    const nftBadgePubkeyEasy = await createNewCustomMint({
        mintTitle: "Heavy Duty Bounty NFT: Easy",
        mintSymbol: "HDNE",
        mintUri: "https://raw.githubusercontent.com/heavy-duty/lisboa-bounty-program/api/assets/heavy-duty-nft-badge-easy.json?token=GHSAT0AAAAAAB3CH6AW7ILJJ4IZVOUXJDNAY3QB3HQ",
        decimals: 0,
    });
    console.log(`   nftBadgePubkeyEasy: ${nftBadgePubkeyEasy}`);
    
    const nftBadgePubkeyMedium = await createNewCustomMint({
        mintTitle: "Heavy Duty Bounty NFT: Medium",
        mintSymbol: "HDNM",
        mintUri: "https://raw.githubusercontent.com/heavy-duty/lisboa-bounty-program/api/assets/heavy-duty-nft-badge-medium.json?token=GHSAT0AAAAAAB3CH6AXIYDHQVFZL6LDFL5WY3QB34Q",
        decimals: 0,
    });
    console.log(`   nftBadgePubkeyMedium: ${nftBadgePubkeyMedium}`);
    
    const nftBadgePubkeyHard = await createNewCustomMint({
        mintTitle: "Heavy Duty Bounty NFT: Hard",
        mintSymbol: "HDNH",
        mintUri: "https://raw.githubusercontent.com/heavy-duty/lisboa-bounty-program/api/assets/heavy-duty-nft-badge-hard.json?token=GHSAT0AAAAAAB3CH6AWHBXRYFEYIAC3KNAUY3QB4MQ",
        decimals: 0,
    });
    console.log(`   nftBadgePubkeyHard: ${nftBadgePubkeyHard}`);

    console.log("Assets created.");
    
    
    /**
     * Create the current event.
     */

    // const eventPubkey = "CBMB4EQBmryBvddACmuUvuZd9CauzjpMUaZkXeNUE1WK";

    console.log("Creating event...");
    
    const eventPubkey = await createNewEvent({
        authority: process.env.HEAVY_DUTY_BOUNTY_API_MASTER_WALLET_PUBKEY,
        title: "Solana Hacker House Lisbon",
        description: "Hacker House in Lisbon, Portugal",
        location: "Lisbon, Portugal",
        host: "Solana Foundation",
        date: "11-09-22",
    });
    console.log(`   eventPubkey: ${eventPubkey}`);

    const envConfigs: string = require('fs').readFileSync('./.env', "utf-8");
    const newEnvConfigs = envConfigs.replace(
        RegExp('HEAVY_DUTY_BOUNTY_API_EVENT_PUBKEY=.*\\s'), 
        `HEAVY_DUTY_BOUNTY_API_EVENT_PUBKEY=${eventPubkey}\n`,
    );
    require('fs').writeFileSync('./.env', newEnvConfigs);

    console.log("Event created.");
    
    
    /**
     * Import all mock challenges into the database.
     */
    
    console.log("Importing challenges...");

    let x = 1;
    let t = mockChallenges.length;
    for (var chal of mockChallenges) {
        const challengePubkey = await createNewChallenge({
            eventPubkey: eventPubkey,
            ...chal
        });

        let mintPubkey = xpTokenPubkey;
        let quantity = chal.rewardValue;

        await createNewPrize({
            challengePubkey: challengePubkey,
            mintPubkey,
            mintControl: 0,
            escrowOrMintAuthority: process.env.HEAVY_DUTY_BOUNTY_API_MASTER_WALLET_PUBKEY,
            quantity,
        });

        if (chal.nftBadge) {
            if (chal.difficulty === 'Hard') {
                mintPubkey = nftBadgePubkeyHard;
            } else if (chal.difficulty === 'Medium') {
                mintPubkey = nftBadgePubkeyMedium;
            } else {
                mintPubkey = nftBadgePubkeyEasy;
            }
            quantity = 1;
            await createNewPrize({
                challengePubkey: challengePubkey,
                mintPubkey,
                mintControl: 0,
                escrowOrMintAuthority: process.env.HEAVY_DUTY_BOUNTY_API_MASTER_WALLET_PUBKEY,
                quantity,
            });
        }

        console.log(`   Challenge ${x}/${t} imported.`);
        x++;
    };

    console.log("All challenges imported.");
}


main()