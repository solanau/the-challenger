import assert from 'assert';
import dotenv from 'dotenv';
import {
    fetchChallengeById,
    fetchSubmissions,
    issueAllRewardsBatchForUser,
    issuePayout,
} from '../src/lib/api';
import { ChallengePayload } from '../src/types/challenge';

dotenv.config();

/**
 * This script will issue the proper on-chain rewards to every challenge submitter.
 *
 * We can run this once we've graded all submissions and are ready to issue
 *  XP Tokens and NFT Badges.
 */

const EARNERS_BRACKET = 10;

async function main() {
    const potPubkey = process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_POT_PUBKEY;
    assert(potPubkey);

    const allCorrectSubmissions = (
        await fetchSubmissions({
            eventId: process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_EVENT_PUBKEY,
        })
    ).filter(sub => sub.status === 'correct');

    const challengesMap = new Map<string, ChallengePayload>();
    const submissionsMap = new Map<string, string[]>();
    const submissionsPointsTotalsMap = new Map<string, number>();

    for (const sub of allCorrectSubmissions) {
        if (!challengesMap.has(sub.challengePubkey)) {
            challengesMap.set(
                sub.challengePubkey,
                await fetchChallengeById(sub.challengeId),
            );
        }
        const challenge = challengesMap.get(sub.challengePubkey);
        assert(challenge);

        if (submissionsMap.has(sub.userPubkey)) {
            submissionsMap.get(sub.userPubkey)?.push(sub.challengePubkey);
        } else {
            submissionsMap.set(sub.userPubkey, [sub.challengePubkey]);
        }

        if (submissionsPointsTotalsMap.has(sub.userPubkey)) {
            const currentPoints = submissionsPointsTotalsMap.get(
                sub.userPubkey,
            );
            assert(currentPoints);
            submissionsPointsTotalsMap.set(
                sub.userPubkey,
                currentPoints + challenge.rewardValue,
            );
        } else {
            submissionsPointsTotalsMap.set(
                sub.userPubkey,
                challenge.rewardValue,
            );
        }
    }

    console.log('Issuing rewards...');

    for (const userPubkey of submissionsMap.keys()) {
        await issueAllRewardsBatchForUser({
            userPubkey,
            challengePubkeys: submissionsMap.get(userPubkey),
        });
    }

    console.log('All rewards issued.');

    console.log(`Issuing payouts for the top ${EARNERS_BRACKET} earners...`);

    const sortedSubmissionPointTotals = new Map(
        [...submissionsPointsTotalsMap.entries()].sort((a, b) => b[1] - a[1]),
    );
    let x = EARNERS_BRACKET;
    for (const userPubkey of sortedSubmissionPointTotals.keys()) {
        if (x <= 0) break;
        const amount = sortedSubmissionPointTotals.get(userPubkey);
        assert(amount);
        await issuePayout({
            potPubkey,
            userPubkey,
            amount,
        });
        x++;
    }

    console.log('All payouts issued.');
}

main();
