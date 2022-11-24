import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Submission } from 'types/submission';
import { firestore } from 'utils/firebase';

export type SubmissionFilters = Partial<{
    userId: string;
    challengeId: string;
}>;

export const useSubmissions = (
    eventId: string,
    filters: SubmissionFilters = {},
) => {
    const [submissions, setSubmissions] = useState<Submission[]>([]);

    useEffect(() => {
        const whereFilters = [];

        if (filters.challengeId) {
            whereFilters.push(where('challengeId', '==', filters.challengeId));
        }

        if (filters.userId) {
            whereFilters.push(where('userId', '==', filters.userId));
        }

        const unsubscribe = onSnapshot(
            query(
                collection(firestore, `events/${eventId}/submissions`),
                ...whereFilters,
            ),
            querySnapshot => {
                if (querySnapshot.empty) {
                    setSubmissions([]);
                } else {
                    setSubmissions(
                        querySnapshot.docs.map(
                            doc =>
                                ({
                                    id: doc.id,
                                    ...doc.data(),
                                } as Submission),
                        ),
                    );
                }
            },
        );

        return () => unsubscribe();
    }, [eventId, filters.challengeId, filters.userId]);

    return submissions;
};
