import { AnchorProvider, Program } from '@heavy-duty/anchor';
import { Drill, IDL } from '.';

import { Connection } from '@solana/web3.js';

export const getProgram = (connection: Connection) => {
    const provider = new AnchorProvider(
        connection,
        {} as never,
        AnchorProvider.defaultOptions(),
    );

    return new Program<Drill>(IDL, process.env.PROGRAM_ID, provider);
};
