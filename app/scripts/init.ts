import assert from 'assert';
import dotenv from 'dotenv';
import {
    createNewCustomMint,
    createNewEvent,
    createNewPot,
    updateConfig,
} from '../src/lib/api';

dotenv.config();

/**
 * This script will initialize everything for us in the DB.
 *
 * Run it once, then our App & API are good to go.
 *
 * REQUIREMENTS (.env):
 *  - DESIGNATED MINT (SAY, USDC)
 *  - DESIGNATED ESCROW FOR THAT MINT
 */

async function main() {
    const masterWalletPubkey =
        process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_WALLET_PUBKEY;
    const potMint = process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_POT_MINT;
    const potEscrowPubkey =
        process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_POT_ESCROW_PUBKEY;
    assert(masterWalletPubkey);
    assert(potMint);
    assert(potEscrowPubkey);

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
        authority: masterWalletPubkey,
        title: 'HackaTUM Munich',
        description: 'HackaTUM Hackathon in Munich, Germany',
        location: 'Munich, Germany',
        host: 'Solana Foundation',
        date: '11-18-22',
    });

    console.log('Event created.');

    /**
     * Create the prize pot.
     */

    console.log('Creating prize pot...');

    const potPubkey = await createNewPot({
        eventPubkey: eventPubkey,
        mint: potMint,
        escrowOrMintAuthority: potEscrowPubkey,
        mintControl: 2,
        pot: 2000,
    });
    console.log(`   potPubkey: ${potPubkey}`);

    console.log('Prize pot created.');

    /**
     * Update the current event configs.
     */

    console.log('Updating configs...');

    await updateConfig({
        id: 0,
        masterWalletPubkey: masterWalletPubkey,
        eventPubkey: eventPubkey,
        potPubkey: potPubkey,
        potEscrowPubkey: potEscrowPubkey,
        xpTokenPubkey: xpTokenPubkey,
        nftBadgePubkeyEasy: nftBadgePubkeyEasy,
        nftBadgePubkeyMedium: nftBadgePubkeyMedium,
        nftBadgePubkeyHard: nftBadgePubkeyHard,
    });

    console.log('Configs updated.');
}

main();
