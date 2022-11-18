import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useAuth } from 'providers/AuthProvider';
import { useEffect, useState } from 'react';
import { SubmissionPayload } from 'types/api';
import { firestore } from 'utils/firebase';

export const useUserSubmissions = () => {
    const { user } = useAuth();
    const [submissions, setSubmissions] = useState<SubmissionPayload[]>([]);

    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(firestore, 'submissions'),
                    where('userId', '==', user.uid),
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
        [user],
    );

    return submissions;
};
