import assert from 'assert';
import dotenv from 'dotenv';
import { createNewChallenge } from '../src/lib/api';
import { mockChallenges } from '../src/mocks/challenges';

dotenv.config();

async function main() {
    const masterWalletPubkey =
        process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_WALLET_PUBKEY;
    const potMint = process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_POT_MINT;
    const potEscrowPubkey =
        process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_POT_ESCROW_PUBKEY;
    assert(masterWalletPubkey);
    assert(potMint);
    assert(potEscrowPubkey);

    const challengePubkey = await createNewChallenge({
        state: 'open',
        ...mockChallenges[0],
    });
}

main();
