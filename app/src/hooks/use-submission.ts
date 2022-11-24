import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { SubmissionDto } from 'types/submission';
import { firestore } from 'utils/firebase';

export const useSubmission = (
    eventId: string,
    submissionId: string | null,
): SubmissionDto | null => {
    const [submission, setSubmission] = useState<SubmissionDto | null>(null);

    useEffect(() => {
        if (submissionId === null) {
            setSubmission(null);
            return;
        }

        const unsubscribe = onSnapshot(
            doc(firestore, `events/${eventId}/submissions/${submissionId}`),
            snapshot => {
                const data = snapshot.data();

                if (!data) {
                    setSubmission(null);
                } else {
                    setSubmission({
                        id: snapshot.id,
                        ...data,
                    } as SubmissionDto);
                }
            },
        );

        return () => unsubscribe();
    }, [eventId, submissionId]);

    return submission;
};
