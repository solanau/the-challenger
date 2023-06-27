import { useAuth } from 'providers/AuthProvider';
import { useMemo } from 'react';
import { Challenge } from 'types/challenge';
import { toChallenge } from 'utils/challenge';
import { useEvent } from './use-event';
import { useSubmissions } from './use-submissions';

export const useEventChallenges = (
    eventId: string | null,
    userId: string | null,
): Challenge[] => {
    const { user } = useAuth()
    const event = useEvent(eventId, user);
    const submissions = useSubmissions(eventId, { userId });

    return useMemo(() => {
        if (!event) {
            return [];
        }

        return event.challenges.map(challenge =>
            toChallenge(event, challenge, submissions, challenge.position),
        );
    }, [event, submissions]);
};
