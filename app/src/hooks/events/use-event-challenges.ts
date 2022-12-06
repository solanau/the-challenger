import { useMemo } from 'react';
import { EventChallengeData } from 'types/api/challenge';
import { useEvent } from './use-event';

export const useEventChallenges = (eventId: string): EventChallengeData[] => {
    const event = useEvent(eventId);

    return useMemo(() => {
        if (event === null || event.eventChallenges.length === 0) {
            return [];
        }

        return [];
    }, [event]);
};
