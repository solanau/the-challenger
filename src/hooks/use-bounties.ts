import { Bounty } from 'types/bounty';
import { fetcher } from 'lib/fetcher';
import useSWR from 'swr';

export const useBounties = () => {
    const { data, error } = useSWR<Bounty[]>('/api/bounties', fetcher);

    return {
        bounties: data,
        isError: error,
        isLoading: !error && !data,
    };
};
