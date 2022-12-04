import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ChallengePayload } from 'types/challenge';
import { firestore } from 'utils/firebase';

export const useChallenges = (): ChallengePayload[] => {
    const [challenges, setChallenges] = useState<ChallengePayload[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(
                collection(firestore, `challenges`),
                where('version', '==', 1),
            ),
            querySnapshot => {
                if (querySnapshot.empty) {
                    setChallenges([]);
                } else {
                    setChallenges(
                        querySnapshot.docs.map(
                            doc =>
                                ({
                                    id: doc.id,
                                    ...doc.data(),
                                } as ChallengePayload),
                        ),
                    );
                }
            },
        );

        return () => unsubscribe();
    }, []);

    return challenges;
};
