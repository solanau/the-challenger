import { useMemo } from 'react';
import { Challenge } from 'types/challenge';
import { toChallenge } from 'utils/challenge';
import { useChallengesByIds } from './use-challenges-by-ids';
import { useEvent } from './use-event';
import { useSubmissions } from './use-submissions';

export const useEventChallenges = (
    eventId: string | null,
    userId: string | null,
): Challenge[] => {
    const event = useEvent(eventId);
    const challenges = useChallengesByIds(event?.challenges ?? []);
    const submissions = useSubmissions(eventId, { userId });

    return useMemo(() => {
        if (event === null || challenges.length === 0) {
            return [];
        }

        return challenges.map((challenge, index) =>
            toChallenge(event, challenge, submissions, index + 1),
        );
    }, [event, challenges, submissions]);
};
