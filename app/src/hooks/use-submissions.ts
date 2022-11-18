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

    useEffect(() =>
        onSnapshot(
            query(
                collection(firestore, 'submissions'),
                ...Object.keys(filters).map(key =>
                    where(key, '==', filters[key]),
                ),
            ),
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
        ),
    );

    return submissions;
};
