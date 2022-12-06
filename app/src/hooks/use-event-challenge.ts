import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Challenge, ChallengePayload } from 'types/challenge';
import { toChallenge } from 'utils/challenge';
import { firestore } from 'utils/firebase';
import { useEvent } from './use-event';

export const useEventChallenge = (
    eventId: string | null,
    challengeId: string | null,
): Challenge => {
    const event = useEvent(eventId);
    const [challenge, setChallenge] = useState<Challenge>(null);

    useEffect(() => {
        if (event === null || challengeId === null) {
            setChallenge(null);
            return;
        }

        const unsubscribe = onSnapshot(
            doc(firestore, `challenges/${challengeId}`),
            snapshot => {
                const data = snapshot.data();

                if (!data) {
                    setChallenge(null);
                } else {
                    setChallenge(
                        toChallenge(
                            event,
                            {
                                id: snapshot.id,
                                ...data,
                            } as ChallengePayload,
                            0,
                        ),
                    );
                }
            },
        );

        return () => unsubscribe();
    }, [event, challengeId]);

    return challenge;
};
