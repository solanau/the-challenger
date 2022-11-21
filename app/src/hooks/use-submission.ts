import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Submission } from 'types/submission';
import { firestore } from 'utils/firebase';

export const useSubmission = (
    submissionId: string | null,
): Submission | null => {
    const [submission, setSubmission] = useState<Submission | null>(null);

    useEffect(() => {
        if (submissionId === null) {
            setSubmission(null);
            return;
        }

        const unsubscribe = onSnapshot(
            doc(firestore, `submissions/${submissionId}`),
            snapshot => {
                const data = snapshot.data();

                if (!data) {
                    setSubmission(null);
                } else {
                    setSubmission({
                        id: snapshot.id,
                        ...snapshot.data(),
                    } as Submission);
                }
            },
        );

        return () => unsubscribe();
    }, [submissionId]);

    return submission;
};