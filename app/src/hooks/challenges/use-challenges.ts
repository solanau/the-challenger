import { fetchAllChallenges } from 'lib/api/challenge';
import { useEffect, useState } from 'react';
import { ChallengeData } from 'types/api/challenge';

export const useChallenges = (): ChallengeData[] => {
    const [challenges, setChallenges] = useState<ChallengeData[]>([]);

    const loadAllChallenges = async () => {
        const challenges: ChallengeData[] = await fetchAllChallenges();
        setChallenges(challenges.sort((a, b) => (a.key > b.key ? 1 : -1)));
    };

    useEffect(() => {
        loadAllChallenges();
    }, []);

    return challenges;
};
