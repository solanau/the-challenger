import { fetchSubmission } from 'lib/api/submission';
import { useEffect, useState } from 'react';
import { SubmissionData } from 'types/api/submission';

export const useSubmission = (submissionId: string | null): SubmissionData => {
    const [submission, setSubmission] = useState<SubmissionData>(null);

    const loadSubmission = async (submissionId: string) => {
        const submission = await fetchSubmission(submissionId);
        setSubmission(submission);
    };

    useEffect(() => {
        if (submissionId === null) {
            setSubmission(null);
            return;
        }
        loadSubmission(submissionId);
    }, [submissionId]);

    return submission;
};
