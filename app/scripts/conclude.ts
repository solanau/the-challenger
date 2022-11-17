import dotenv from 'dotenv';
import { fetchSubmissions } from '../src/lib/api';

dotenv.config();

/**
 * This script will issue the proper on-chain rewards to every challenge submitter.
 *
 * We can run this once we've graded all submissions and are ready to issue
 *  XP Tokens and NFT Badges.
 */

async function main() {
    console.log('Issuing rewards...');

    const allCompletedSubmissions = await fetchSubmissions({
        eventPubkey: process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_EVENT_PUBKEY,
    });

    for (const sub of allCompletedSubmissions) {
        console.log(sub.username);
    }

    console.log('All rewards issued.');
}

main();
