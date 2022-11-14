import { Account } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';

type DrillBounty = {
    boardId: number;
    bountyBump: number;
    bountyHunter: string | null;
    bountyVaultBump: number;
    closedAt: Date | null;
    id: number;
    isClosed: boolean;
    mint: PublicKey;
    publicKey: PublicKey;
};

type DrillBountyVault = Account;

type DrillResponse = DrillBounty & DrillBountyVault;

export type { DrillBounty, DrillBountyVault, DrillResponse };
