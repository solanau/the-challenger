import { fetchSubmissions } from 'lib/api/submission';
import { useEffect, useState } from 'react';
import { FetchSubmissionsFilter, SubmissionData } from 'types/api/submission';

export const useSubmissions = (
    props?: FetchSubmissionsFilter,
): SubmissionData[] => {
    const [submissions, setSubmissions] = useState<SubmissionData[]>([]);

    const loadSubmissions = async (props?: FetchSubmissionsFilter) => {
        let sortSubmissions = (a: SubmissionData, b: SubmissionData) =>
            a.challengeId > b.challengeId ? 1 : -1;
        if (props && props.challengeId) {
            sortSubmissions = (a: SubmissionData, b: SubmissionData) =>
                a.eventId > b.eventId ? 1 : -1;
        }
        const submissions = await fetchSubmissions(props);
        setSubmissions(submissions.sort(sortSubmissions));
    };

    useEffect(() => {
        loadSubmissions(props);
    }, [props]);

    return submissions;
};
