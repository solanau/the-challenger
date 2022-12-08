import Card from 'components/common/card';
import Text from 'components/common/text';
import Link from 'next/link';
import { SubmissionPayload, SubmissionStatus } from 'types/submission';

function getStatusBgClass(status: SubmissionStatus) {
    switch (status) {
        case 'completed':
            return 'bg-green-500';
        case 'incorrect':
            return 'bg-red-500';
        case 'invalid':
            return 'bg-yellow-500';
        case 'pending':
            return 'bg-black';
        default:
            throw new Error('Unknown status');
    }
}

interface SubmissionCardProps {
    submission: SubmissionPayload;
}

const SubmissionCard = ({ submission }: SubmissionCardProps) => (
    <Card className="p-4">
        <Text
            variant="heading"
            className="mb-4 w-full overflow-hidden text-ellipsis whitespace-nowrap"
        >
            <Link href={`/submissions/${submission.id}`} passHref>
                {submission.title}
            </Link>
        </Text>
        <div className="flex w-full justify-between">
            <p
                className={`rounded-2xl px-4 py-2 text-sm ${getStatusBgClass(
                    submission.status,
                )}`}
            >
                {submission.status}
            </p>
            <Text variant="heading">{submission.totalPoints}</Text>
        </div>
    </Card>
);

export default SubmissionCard;
