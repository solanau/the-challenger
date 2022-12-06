import { fetchChallenge } from 'lib/api/challenge';
import { useEffect, useState } from 'react';
import { ChallengeData } from 'types/api/challenge';

export const useChallenge = (challengeId: string | null): ChallengeData => {
    const [challenge, setChallenge] = useState<ChallengeData>(null);

    const loadChallenge = async (challengeId: string) => {
        const challenge = await fetchChallenge(challengeId);
        setChallenge(challenge);
    };

    useEffect(() => {
        if (challengeId === null) {
            setChallenge(null);
            return;
        }
        loadChallenge(challengeId);
    }, [challengeId]);

    return challenge;
};
