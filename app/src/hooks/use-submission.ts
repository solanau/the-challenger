import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { SubmissionPayload } from 'types/api';
import { firestore } from 'utils/firebase';

export const useSubmission = (
    submissionId: string | null,
): SubmissionPayload | null => {
    const [submission, setSubmission] = useState<SubmissionPayload | null>(
        null,
    );

    useEffect(() => {
        if (submissionId === null) {
            setSubmission(null);
            return;
        }

        const unsubscribe = onSnapshot(
            doc(firestore, `submissions/${submissionId}`),
            snapshot => {
                setSubmission({
                    id: snapshot.id,
                    ...snapshot.data(),
                } as SubmissionPayload);
            },
        );

        return () => unsubscribe();
    }, [submissionId]);

    return submission;
};
