import { Connection, Keypair } from '@solana/web3.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../../app/.env') });

export const MASTER_API_KEY: string | undefined =
    process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY;

export const MasterApiKeyError = 'Request blocked: Invalid Master API key.';

export const connection = new Connection(
    'https://api.devnet.solana.com',
    'confirmed',
);
// export const connection = new Connection('http://localhost:8899', 'confirmed');
export const WALLET = createKeypairFromFile('./wallet/master.json');

function createKeypairFromFile(path: string): Keypair {
    return Keypair.fromSecretKey(
        Buffer.from(JSON.parse(require('fs').readFileSync(path, 'utf-8'))),
    );
}
