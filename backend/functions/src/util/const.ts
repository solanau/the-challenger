import { Connection } from '@solana/web3.js';
import { createKeypairFromFile } from './util';
require('dotenv').config();

export const MASTER_API_KEY: string | undefined =
    process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY;

export const connection = new Connection(
    'https://api.devnet.solana.com',
    'confirmed',
);
// export const connection = new Connection('http://localhost:8899', 'confirmed');
export const WALLET = createKeypairFromFile('./wallet/master.json');
