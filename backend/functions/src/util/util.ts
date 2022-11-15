import { Keypair } from '@solana/web3.js';

export function createKeypairFromFile(path: string): Keypair {
    return Keypair.fromSecretKey(
        Buffer.from(JSON.parse(require('fs').readFileSync(path, 'utf-8'))),
    );
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
