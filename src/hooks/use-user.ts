import { User } from 'types/user';
import { fetcher } from 'lib/fetcher';
import useSWR from 'swr';

export const useUser = (username: string) => {
    const { data, error } = useSWR<User>(
        () => (username ? `/api/${username}` : null),
        fetcher,
    );

    return {
        user: data,
        isError: error,
        isLoading: !error && !data,
    };
};
