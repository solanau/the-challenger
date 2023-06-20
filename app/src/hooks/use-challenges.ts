import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ChallengePayload } from 'types/challenge';
import { firestore } from 'utils/firebase';

export type ChallengeFilters = Partial<{
    isNew: boolean;
    version: number;
    userId: string;
}>;

export const useChallenges = (
    filters?: ChallengeFilters,
): ChallengePayload[] => {
    const [challenges, setChallenges] = useState<ChallengePayload[]>([]);
    const { isNew, version, userId } = filters

    useEffect(() => {
        const whereFilters = [];

        if (isNew !== undefined) {
            whereFilters.push(where('isNew', '==', isNew));
        }

        if (version !== undefined) {
            whereFilters.push(where('version', '==', version));
        }

        if (userId !== undefined) {
            whereFilters.push(where('userId', '==', userId));
        }

        const unsubscribe = onSnapshot(
            query(collection(firestore, `challenges`), ...whereFilters),
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
    }, [isNew, version]);

    return challenges;
};
