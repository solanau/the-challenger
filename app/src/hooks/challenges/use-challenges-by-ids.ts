import { fetchAllChallenges } from 'lib/api/challenge';
import { useEffect, useState } from 'react';
import { ChallengeData } from 'types/api/challenge';

export const useChallengesByIds = (challengeIds: string[]): ChallengeData[] => {
    const [challenges, setChallenges] = useState<ChallengeData[]>([]);

    const loadFilteredChallenges = async (challengeIds: string[]) => {
        const challenges: ChallengeData[] = await fetchAllChallenges();
        setChallenges(
            challenges
                .filter(o => challengeIds.includes(o.id))
                .sort((a, b) => (a.key > b.key ? 1 : -1)),
        );
    };

    useEffect(() => {
        if (challengeIds.length === 0) {
            setChallenges([]);
            return;
        }
        loadFilteredChallenges(challengeIds);
    }, [challengeIds]);

    return challenges;
};
