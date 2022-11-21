import Card from 'components/common/card';
import Text from 'components/common/text';
import { Submission } from 'types/submission';
import { cn } from 'utils';

/**
 * Properties for a "Featured Bounty" card component.
 */
interface SubmissionCardProps {
    submission: Submission;
}

const BasicsSection = ({ submission }: SubmissionCardProps) => (
    <div className="flex w-full flex-row justify-between">
        <div className="flex h-16 w-full flex-col justify-between">
            <div className="flex w-full flex-row">
                <Text
                    variant="heading"
                    className={cn(
                        'inline w-3/5 overflow-hidden text-ellipsis whitespace-nowrap',
                        // responsive && '2lg:hidden',
                    )}
                >
                    {submission.challenge.title}
                </Text>
                <Text
                    variant="heading"
                    className={cn(
                        'ml-4 inline w-1/6 overflow-hidden text-ellipsis whitespace-nowrap text-right',
                        // responsive && '2lg:hidden',
                    )}
                >
                    {submission.challenge.rewardValue}
                </Text>
            </div>
        </div>
    </div>
);

const SubmissionCard = ({ submission }: SubmissionCardProps) => (
    <Card
        className={cn(
            'flex h-fit w-80 flex-shrink-0 snap-start flex-col items-start justify-between gap-5 p-6 sm:w-98',
            '!w-full 2lg:flex-row 2lg:items-center',
        )}
    >
        <div className="w-full overflow-hidden">
            <BasicsSection submission={submission} />
        </div>
    </Card>
);

export default SubmissionCard;
