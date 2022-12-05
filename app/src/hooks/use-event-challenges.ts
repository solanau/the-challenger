import { useMemo } from 'react';
import { ChallengePayload } from 'types/api';
import { useChallengesByIds } from './use-challenges-by-ids';
import { useEvent } from './use-event';

export const useEventChallenges = (eventId: string): ChallengePayload[] => {
    const event = useEvent(eventId);
    const challenges = useChallengesByIds(event?.challenges ?? []);

    return useMemo(() => {
        if (event === null || challenges.length === 0) {
            return [];
        }

        return [];
    }, [event, challenges]);
};
