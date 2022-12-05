import {
    collection,
    documentId,
    onSnapshot,
    query,
    where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ChallengePayload } from 'types/api';
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
                        querySnapshot.docs
                            .map(
                                doc =>
                                    ({
                                        uid: doc.id,
                                        ...doc.data(),
                                    } as ChallengePayload),
                            )
                            .sort((a, b) => (a.key > b.key ? 1 : -1)),
                    );
                }
            },
        );

        return () => unsubscribe();
    }, [ids]);

    return challenges;
};
