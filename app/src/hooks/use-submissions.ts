import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { SubmissionPayload } from 'types/api/submission';
import { firestore } from 'utils/firebase';

export type SubmissionFilters = Partial<{
    userId: string;
    challengeId: string;
}>;

export const useSubmissions = (
    eventId: string,
    filters: SubmissionFilters | null,
): SubmissionPayload[] => {
    const [submissions, setSubmissions] = useState<SubmissionPayload[]>([]);
    const hasFilters = filters !== null;
    const challengeId = filters?.challengeId;
    const userId = filters?.userId;

    useEffect(() => {
        if (hasFilters) {
            setSubmissions([]);
            return;
        }

        const whereFilters = [];

        if (challengeId) {
            whereFilters.push(where('challengeId', '==', challengeId));
        }

        if (userId) {
            whereFilters.push(where('userId', '==', userId));
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
                                } as SubmissionPayload),
                        ),
                    );
                }
            },
        );

        return () => unsubscribe();
    }, [eventId, hasFilters, challengeId, userId]);

    return submissions;
};
