import { SubmissionPayload } from 'types/api/submission';
import SubmissionCard from './submission-card';

type SubmissionListProps = { submissions: SubmissionPayload[] };

const SubmissionList = ({ submissions: submissions }: SubmissionListProps) => (
    <div className="flex flex-col gap-4">
        <div className="mt-4 flex flex-col gap-6">
            {submissions.length > 0 ? (
                submissions.map((submission, index) => (
                    <SubmissionCard key={index} submission={submission} />
                ))
            ) : (
                <div className="flex h-20 items-center justify-center">
                    <p className="text-secondary">No results found.</p>
                </div>
            )}
        </div>
    </div>
);

export default SubmissionList;
