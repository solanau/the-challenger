import { doc, onSnapshot } from 'firebase/firestore';
import { useAuth } from 'providers/AuthProvider';
import { useEffect, useState } from 'react';
import { ChallengePayload } from 'types/api';
import { ChallengeView } from 'types/challenge';
import { toChallengeFirebase } from 'utils/challenge';
import { firestore } from 'utils/firebase';
import { useSubmissions } from './use-submissions';

export const useChallenge = (challengeId: string | null) => {
    const { user } = useAuth();
    const submissions = useSubmissions({ userId: user.uid });
    const [challenge, setChallenge] = useState<ChallengeView>(null);

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
                        } as ChallengePayload),
                    );
                }
            },
        );

        return () => unsubscribe();
    }, [challengeId, submissions]);

    return challenge;
};
