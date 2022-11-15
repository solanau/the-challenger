import * as Web3 from '@solana/web3.js';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';

import { getAssociatedTokenAddress } from '@solana/spl-token';
import useSWR from 'swr';

export const useBalance = (mint: string) => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    const fetchBalance = async () => {
        try {
            const associatedTokenAddress = await getAssociatedTokenAddress(
                new Web3.PublicKey(mint),
                publicKey,
            );

            const responseAndContext = await connection.getTokenAccountBalance(
                associatedTokenAddress,
            );

            return responseAndContext.value.uiAmount;
        } catch (e) {
            console.log(`error getting balance: `, e);
        }
    };

    const { data, error } = useSWR<number>(
        publicKey ? 'balance' : null, // Fetch balance conditionally
        fetchBalance,
    );

    return {
        balance: data,
        isLoading: !error && !data,
        isError: error,
    };
};
