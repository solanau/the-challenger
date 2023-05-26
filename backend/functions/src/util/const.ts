import { Connection, PublicKey } from '@solana/web3.js';
import { createKeypairFromFile } from './util';
require('dotenv').config();

export const MASTER_API_KEY: string | undefined = process.env.MASTER_API_KEY;

export const connection = new Connection(
    'https://api.devnet.solana.com',
    'confirmed',
);
// export const connection = new Connection('http://localhost:8899', 'confirmed');
export const PRESTIGE_PROGRAM_ID = new PublicKey(
    '5p6mE4t2S74vpPf1PjbqPXkzSB8aGdY6r89bwbgRs6fr',
);
export const WALLET = createKeypairFromFile('./wallet/master.json');

export const PK_SECRET_KEY = "challenger_mint_certificate_pk"