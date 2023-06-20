import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ChallengePayload } from 'types/challenge';
import { UserPayload } from 'types/user';
import { firestore } from 'utils/firebase';

export const useChallenge = (challengeId: string | null, user: UserPayload | null): ChallengePayload => {
    const [challenge, setChallenge] = useState<ChallengePayload>(null);

    useEffect(() => {

        console.log('challengeId', challengeId)
        console.log('user', user)
        if (challengeId === null || user == null) {
            setChallenge(null);
            return;
        }

        const whereFilters = [where('__name__', '==', challengeId)];

        if (user && !user.isAdmin) {
            whereFilters.push(where('userId', '==', user.id));
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
