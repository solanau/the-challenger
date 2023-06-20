import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ChallengePayload } from 'types/challenge';
import { firestore } from 'utils/firebase';

export const useChallenge = (challengeId: string | null, userId: string | null): ChallengePayload => {
    const [challenge, setChallenge] = useState<ChallengePayload>(null);

    useEffect(() => {
        if (challengeId === null) {
            setChallenge(null);
            return;
        }

        const whereFilters = [];

        if (userId !== undefined) {
            whereFilters.push(where('userId', '==', userId));
        }

        const unsubscribe = onSnapshot(
            query(collection(firestore, `challenges`), ...whereFilters),
            snapshot => {


                if (snapshot.docs.length == 0) {
                    setChallenge(null);
                } else {
                    const doc = snapshot.docs[0]
                    const data = doc.data()
                    setChallenge({
                        id: doc.id,
                        ...data,
                    } as ChallengePayload);
                }
            },
        );

        return () => unsubscribe();
    }, [challengeId]);

    return challenge;
};
