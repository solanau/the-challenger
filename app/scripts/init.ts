import {
    createNewChallenge,
    createNewCustomMint,
    createNewEvent,
    createNewPrize
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
    console.log('Creating assets...');

    const xpTokenPubkey = await createNewCustomMint({
        mintTitle: 'Heavy Duty Bounty XP',
        mintSymbol: 'HDXP',
        mintUri:
            'https://raw.githubusercontent.com/heavy-duty/the-challenger/prestige/assets/xp-token.json?token=GHSAT0AAAAAAB3CH6AWX6QRUA43UWIBZQ6UY3UONWA',
        decimals: 9,
    });
    console.log(`   xpTokenPubkey: ${xpTokenPubkey}`);

    const nftBadgePubkeyLedger = await createNewCustomMint({
        mintTitle: 'Ledger Award',
        mintSymbol: 'LEDG',
        mintUri:
            'https://raw.githubusercontent.com/heavy-duty/the-challenger/prestige/assets/xp-token.json?token=GHSAT0AAAAAAB3CH6AWX6QRUA43UWIBZQ6UY3UONWA',
        decimals: 0,
    });
    console.log(`   nftBadgePubkeyLedger: ${nftBadgePubkeyLedger}`);

    const nftBadgePubkeyEasy = await createNewCustomMint({
        mintTitle: 'Heavy Duty Bounty NFT: Easy',
        mintSymbol: 'HDNE',
        mintUri:
            'https://raw.githubusercontent.com/heavy-duty/the-challenger/api/assets/heavy-duty-nft-badge-easy.json?token=GHSAT0AAAAAAB3CH6AW7ILJJ4IZVOUXJDNAY3QB3HQ',
        decimals: 0,
    });
    console.log(`   nftBadgePubkeyEasy: ${nftBadgePubkeyEasy}`);

    const nftBadgePubkeyMedium = await createNewCustomMint({
        mintTitle: 'Heavy Duty Bounty NFT: Medium',
        mintSymbol: 'HDNM',
        mintUri:
            'https://raw.githubusercontent.com/heavy-duty/the-challenger/api/assets/heavy-duty-nft-badge-medium.json?token=GHSAT0AAAAAAB3CH6AXIYDHQVFZL6LDFL5WY3QB34Q',
        decimals: 0,
    });
    console.log(`   nftBadgePubkeyMedium: ${nftBadgePubkeyMedium}`);

    const nftBadgePubkeyHard = await createNewCustomMint({
        mintTitle: 'Heavy Duty Bounty NFT: Hard',
        mintSymbol: 'HDNH',
        mintUri:
            'https://raw.githubusercontent.com/heavy-duty/the-challenger/api/assets/heavy-duty-nft-badge-hard.json?token=GHSAT0AAAAAAB3CH6AWHBXRYFEYIAC3KNAUY3QB4MQ',
        decimals: 0,
    });
    console.log(`   nftBadgePubkeyHard: ${nftBadgePubkeyHard}`);

    console.log('Assets created.');

    /**
     * Create the current event.
     */

    // const eventPubkey = "CBMB4EQBmryBvddACmuUvuZd9CauzjpMUaZkXeNUE1WK";

    console.log('Creating event...');

    const event = await createNewEvent({
        authority:
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_WALLET_PUBKEY,
        title: 'Solana Hacker House Lisbon',
        description: 'Hacker House in Lisbon, Portugal',
        location: 'Lisbon, Portugal',
        host: 'Solana Foundation',
        date: '11-09-22',
    });
    const eventPubkey = event.pubKey;
    const firebaseEventId = event.firebaseEventId;
    console.log(`   eventPubkey: ${eventPubkey}`);
    console.log(`   firebaseEvent: ${firebaseEventId}`);

    const envConfigs: string = require('fs').readFileSync('./.env', 'utf-8');
    const newEventPKEnvConfigs = envConfigs.replace(
        RegExp('HEAVY_DUTY_BOUNTY_API_EVENT_PUBKEY=.*\\s'),
        `HEAVY_DUTY_BOUNTY_API_EVENT_PUBKEY=${eventPubkey}\n`,
    );

    const newEventIdEnvConfigs = envConfigs.replace(
        RegExp('HEAVY_DUTY_BOUNTY_API_EVENT_ID=.*\\s'),
        `HEAVY_DUTY_BOUNTY_API_EVENT_ID=${firebaseEventId}\n`,
    );
    require('fs').writeFileSync('./.env', newEventPKEnvConfigs);
    require('fs').writeFileSync('./.env', newEventIdEnvConfigs);

    console.log('Event created successfully.');

    /**
     * Import all mock challenges into the database.
     */

    console.log('Importing challenges...');

    let x = 1;
    const t = mockChallenges.length;
    for (const chal of mockChallenges) {
        const challengePubkey = await createNewChallenge({
            eventPubkey: eventPubkey,
            eventId: firebaseEventId,
            ...chal,
        });
        let mintPubkey = xpTokenPubkey;
        let quantity = chal.rewardValue;

        await createNewPrize({
            challengePubkey: challengePubkey,
            mintPubkey,
            mintControl: 0,
            escrowOrMintAuthority:
                process.env
                    .NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_WALLET_PUBKEY,
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
                escrowOrMintAuthority:
                    process.env
                        .NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_WALLET_PUBKEY,
                quantity,
            });
        }

        console.log(`   Challenge ${x}/${t} imported.`);
        x++;
    }

    console.log('All challenges imported.');
}

main();
