import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ChallengePayload } from 'types/challenge';
import { firestore } from 'utils/firebase';

export const useChallenge = (challengeId: string | null): ChallengePayload => {
    const [challenge, setChallenge] = useState<ChallengePayload>(null);

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
                    setChallenge({
                        id: snapshot.id,
                        ...data,
                    } as ChallengePayload);
                }
            },
        );

        return () => unsubscribe();
    }, [challengeId]);

    return challenge;
};
