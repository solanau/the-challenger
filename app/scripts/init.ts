import dotenv from 'dotenv';
import fs from 'fs';
import {
    createNewChallenge,
    createNewCustomMint,
    createNewEvent,
    createNewPot,
    createNewPrize,
} from '../src/lib/api';
import { mockChallenges } from '../src/mocks/challenges';

dotenv.config();

/**
 * This script will initialize everything for us in the DB.
 *
 * Run it once, then our App & API are good to go.
 *
 * REQUIREMENTS (.env):
 *  - DESIGNATED MINT (SAY, USDC)
 *  - DEASIGNATED ESCROW FOR THAT MINT
 */

async function main() {
    const envConfigs: string = fs.readFileSync('./.env', 'utf-8');

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

    console.log('Creating event...');

    const eventPubkey = await createNewEvent({
        authority:
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_WALLET_PUBKEY,
        title: 'HackaTUM Munich',
        description: 'HackaTUM Hackathon in Munich, Germany',
        location: 'Munich, Germany',
        host: 'Solana Foundation',
        date: '11-18-22',
    });
    console.log(`   eventPubkey: ${eventPubkey}`);

    console.log('Event created.');

    /**
     * Create the prize pot.
     */

    console.log('Creating prize pot...');

    const potPubkey = await createNewPot({
        eventPubkey: eventPubkey,
        mint: process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_POT_MINT,
        escrowOrMintAuthority:
            process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_POT_ESCROW_PUBKEY,
        mintControl: 2,
        pot: 2000,
    });
    console.log(`   potPubkey: ${potPubkey}`);

    console.log('Prize pot created.');

    const newEnvConfigs = envConfigs
        .replace(
            RegExp('HEAVY_DUTY_BOUNTY_API_EVENT_PUBKEY=.*\\s'),
            `HEAVY_DUTY_BOUNTY_API_EVENT_PUBKEY=${eventPubkey}\n`,
        )
        .replace(
            RegExp('HEAVY_DUTY_BOUNTY_API_POT_PUBKEY=.*\\s'),
            `HEAVY_DUTY_BOUNTY_API_POT_PUBKEY=${potPubkey}\n`,
        );
    fs.writeFileSync('./.env', newEnvConfigs);

    /**
     * Import all mock challenges into the database.
     */

    console.log('Importing challenges...');

    let x = 1;
    const t = mockChallenges.length;
    for (const chal of mockChallenges) {
        const challengePubkey = await createNewChallenge({
            eventPubkey: eventPubkey,
            state: 'open',
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
