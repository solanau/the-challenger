import { Bounty } from 'types/bounty';
import { fetcher } from 'lib/fetcher';
import useSWR from 'swr';

export const useBountiesByAssignee = (username: string) => {
    const { data, error } = useSWR<Bounty[]>(
        () => (username ? `/api/${username}/bounties` : null),
        fetcher,
    );

    return {
        bounties: data,
        isError: error,
        isLoading: !error && !data,
    };
};
