import { useMemo } from 'react';
import { Challenge } from 'types/challenge';
import { toChallenge } from 'utils/challenge';
import { useChallengesByIds } from './use-challenges-by-ids';
import { useEvent } from './use-event';

export const useEventChallenges = (eventId: string): Challenge[] => {
    const event = useEvent(eventId);
    const challenges = useChallengesByIds(event?.challenges ?? []);

    return useMemo(() => {
        if (event === null || challenges.length === 0) {
            return [];
        }

        return challenges.map((challenge, index) =>
            toChallenge(event, challenge, index + 1),
        );
    }, [event, challenges]);
};
