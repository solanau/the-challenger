import { fetchSubmissions } from 'lib/api/submission';
import { useEffect, useState } from 'react';
import { SubmissionData } from 'types/api/submission';

export const useSubmissionsByIds = (
    submissionIds: string[],
): SubmissionData[] => {
    const [submissions, setSubmissions] = useState<SubmissionData[]>([]);

    const loadFilteredSubmissions = async (submissionIds: string[]) => {
        const submissions: SubmissionData[] = await fetchSubmissions();
        setSubmissions(submissions.filter(o => submissionIds.includes(o.id)));
    };

    useEffect(() => {
        if (submissionIds.length === 0) {
            setSubmissions([]);
            return;
        }
        loadFilteredSubmissions(submissionIds);
    }, [submissionIds]);

    return submissions;
};
