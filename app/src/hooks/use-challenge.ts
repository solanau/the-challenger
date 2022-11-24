import { doc, onSnapshot } from 'firebase/firestore';
import { useAuth } from 'providers/AuthProvider';
import { useEffect, useState } from 'react';
import { Challenge, ChallengeDto } from 'types/challenge';
import { toChallengeFirebase } from 'utils/challenge';
import { firestore } from 'utils/firebase';
import { useSubmissions } from './use-submissions';

export const useChallenge = (
    eventId: string,
    challengeId: string | null,
): Challenge => {
    const { user } = useAuth();
    const submissions = useSubmissions(eventId, { userId: user.uid });
    const [challenge, setChallenge] = useState<Challenge>(null);

    useEffect(() => {
        if (challengeId === null) {
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
                        toChallengeFirebase(submissions, {
                            uid: snapshot.id,
                            ...data,
                        } as ChallengeDto),
                    );
                }
            },
        );

        return () => unsubscribe();
    }, [challengeId, submissions]);

    return challenge;
};
