import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { SubmissionPayload } from 'types/submission';
import { firestore } from 'utils/firebase';

export type SubmissionFilters = Partial<{
    userId: string;
    challengeId: string;
}>;

export const useSubmissions = (
    eventId: string,
    filters?: SubmissionFilters,
): SubmissionPayload[] => {
    const [submissions, setSubmissions] = useState<SubmissionPayload[]>([]);
    const challengeId = filters?.challengeId;
    const userId = filters?.userId;

    useEffect(() => {
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
    }, [eventId, challengeId, userId]);

    return submissions;
};
