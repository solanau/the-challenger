import { Keypair } from '@solana/web3.js';

export function createKeypairFromFile(path: string): Keypair {
    return Keypair.fromSecretKey(
        Buffer.from(JSON.parse(require('fs').readFileSync(path, 'utf-8'))),
    );
}

export function getProgress(min: number, max: number, value: number) {
    if (value < min) {
        return 0;
    } else if (value < max) {
        const total = max - min;
        const elapsed = value - min;

        return Math.floor((elapsed / total) * 100);
    } else {
        return 100;
    }
}

export function getTimeBonusPoints(
    basePoints: number,
    challengeStartDate: string,
    challengeEndDate: string,
    submissionDate: number,
) {
    const timeRewardPercentage = 20;
    const maxBonus = basePoints * (timeRewardPercentage / 100);
    const progressLeft =
        100 -
        getProgress(
            new Date(challengeStartDate).getTime(),
            new Date(challengeEndDate).getTime(),
            new Date(submissionDate).getTime(),
        );

    return Math.floor(maxBonus * (progressLeft / 100));
}

export const MasterApiKeyError = () =>
    'Request blocked: Invalid Master API key.';
export const PayloadError = () => 'Bad request body. Check app/src/types/api.';
export const PrestigeError = (type: string) =>
    `Error writing on-chain ${type}. Check the logs.`;
export const DatabaseError = (type: string) =>
    `Error writing ${type} to database.`;
export const DuplicateSubmissionError = () =>
    "Duplicate submission. There's a single submission per challenge.";
export const NotFoundError = () =>
    "Not found. The document request wasn't found.";
