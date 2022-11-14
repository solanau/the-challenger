import Card from 'components/common/card';
import Chip from 'components/common/chip';
import Link from 'next/link';
import Text from 'components/common/text';
import { cn } from 'utils';
import { ChallengeDto } from 'types/challenge';

/**
 * Properties for a "Featured Bounty" card component.
 */
type ChallengeCardProps = Omit<ChallengeDto, 'githubUrl' | 'tags'> & {
    challengeName: string;
    responsive?: boolean;
    maxTags?: number;
    showDetails?: boolean;
    showTableTags?: boolean;
};


const BasicsSection = ({ name, challengeType, points, createdAt }) => (
    <div className='flex flex-row justify-between w-full'>
        <div className="flex h-16 flex-col justify-between w-full">
            <Chip highlightValue={createdAt} />
            <div className='flex flex-row w-full'>
                <Text
                    variant="heading"
                    className={cn(
                        'inline w-1/2 overflow-hidden text-ellipsis whitespace-nowrap',
                        // responsive && '2lg:hidden',
                    )}
                >
                    {name}
                </Text>
                <Text
                    variant="heading"
                    className={cn(
                        'ml-4 inline w-1/4 overflow-hidden text-ellipsis whitespace-nowrap text-right',
                        // responsive && '2lg:hidden',
                    )}
                >
                    {challengeType} Challenge
                </Text>
                <Text
                    variant="heading"
                    className={cn(
                        'ml-4 inline w-1/6 overflow-hidden text-ellipsis whitespace-nowrap text-right',
                        // responsive && '2lg:hidden',
                    )}
                >
                    {points}
                </Text>
            </div>
        </div>
    </div>
);
    

const ChallengeCard = ({
    id,
    challengeName,
    type,
    rewardValue,
    createdAt,
    responsive = true,
    maxTags = 5,
}: ChallengeCardProps) => (
    <Link href={`/explorer/${id}`} passHref>
        <a>
            <Card
                className={cn(
                    'flex h-fit w-80 flex-shrink-0 snap-start flex-col items-start justify-between gap-5 p-6 sm:w-98',
                    responsive && '!w-full 2lg:flex-row 2lg:items-center',
                )}
            >
                <div className="w-full overflow-hidden">
                    <BasicsSection name={challengeName} challengeType={type} points={rewardValue} createdAt={createdAt} />
                </div>
            </Card>
        </a>
    </Link>
);

export default ChallengeCard;
