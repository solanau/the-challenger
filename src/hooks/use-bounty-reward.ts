import { fetcher } from 'lib/fetcher';
import useSWR from 'swr';

export const useBountyReward = (id: number) => {
    const { data, error } = useSWR<number>(
        `/api/bounties/${id}/reward`,
        fetcher,
        // { refreshInterval: 3000 }, // this is causing the multiple request to the solana RPC node
    );

    return {
        reward: data,
        isError: error,
        isLoading: !error && !data,
    };
};
