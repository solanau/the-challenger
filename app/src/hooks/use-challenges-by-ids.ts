import {
    collection,
    documentId,
    onSnapshot,
    query,
    where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ChallengePayload } from 'types/challenge';
import { firestore } from 'utils/firebase';

export const useChallengesByIds = (ids: string[]): ChallengePayload[] => {
    const [challenges, setChallenges] = useState<ChallengePayload[]>([]);

    useEffect(() => {
        if (ids.length === 0) {
            return;
        }

        const unsubscribe = onSnapshot(
            query(
                collection(firestore, 'challenges'),
                where(documentId(), 'in', ids),
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
    }, [ids]);

    return challenges;
};
