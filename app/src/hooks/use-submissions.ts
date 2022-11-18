import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { SubmissionPayload } from 'types/api';
import { firestore } from 'utils/firebase';

export type SubmissionFilters = Partial<{
    eventId: string;
    userId: string;
    challengeId: string;
}>;

export const useSubmissions = (filters: SubmissionFilters = {}) => {
    const [submissions, setSubmissions] = useState<SubmissionPayload[]>([]);

    useEffect(() => {
        const whereFilters = [];

        if (filters.challengeId) {
            whereFilters.push(where('challengeId', '==', filters.challengeId));
        }

        if (filters.eventId) {
            whereFilters.push(where('eventId', '==', filters.eventId));
        }

        if (filters.userId) {
            whereFilters.push(where('userId', '==', filters.userId));
        }

        const unsubscribe = onSnapshot(
            query(collection(firestore, 'submissions'), ...whereFilters),
            querySnapshot => {
                setSubmissions(
                    querySnapshot.docs.map(
                        doc =>
                            ({
                                id: doc.id,
                                ...doc.data(),
                            } as SubmissionPayload),
                    ),
                );
            },
        );

        return () => unsubscribe();
    }, [filters.challengeId, filters.eventId, filters.userId]);

    return submissions;
};
