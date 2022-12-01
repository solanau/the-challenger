// import dotenv from 'dotenv';
import { fetchChallengesForEvent, updateChallenge } from '../src/lib/api';

// dotenv.config();

/**
 * This script will disable all challenge submissions by sending a "poison pill"
 *  to the Challenges database table.
 *
 * This will effectively mark every challenge as "closed".
 *
 * We can run this when we're closing off submissions.
 */

async function main() {
    /**
     * Disable all challenges in the database.
     */
    console.log('Closing challenge submissions...');

    const challenges = await fetchChallengesForEvent();

    let x = 1;
    const t = challenges.length;
    for (const chal of challenges) {
        await updateChallenge(chal.pubkey, {
            state: 'open',
            ...chal,
        });

        console.log(`   Challenge ${x}/${t} disabled.`);
        x++;
    }

    console.log('All challenge submissions closed.');
}

main();
