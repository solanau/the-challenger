import Card from 'components/common/card';
import Chip from 'components/common/chip';
import Text from 'components/common/text';

import { cn } from 'utils';

const ParticipantSection = ({ owner }) => (
    <div className="flex h-16 w-full min-w-0 flex-1 flex-row gap-3">
        <div className="flex h-full w-full flex-col justify-between gap-3 ">
            <Text variant="label" className="text-secondary">
                Hunter
            </Text>
            <div className="flex ">
                <Text
                    variant="heading"
                    className="w-full overflow-hidden text-ellipsis whitespace-nowrap"
                >
                    {owner}
                </Text>
            </div>
        </div>
    </div>
);

const ChallengeSection = ({ name }) => (
    <div className="flex h-16 w-full min-w-0 flex-1 flex-row gap-3">
        <div className="flex h-full w-full flex-col justify-between gap-3 overflow-hidden">
            <Text variant="label" className="text-secondary">
                Hunter
            </Text>
            <div className="flex w-full flex-row items-center gap-3 overflow-hidden">
                {name ? (
                    <Text
                        variant="paragraph"
                        className="w-full overflow-hidden text-ellipsis whitespace-nowrap"
                    >
                        {name}
                    </Text>
                ) : (
                    <Text variant="paragraph" className="hidden sm:inline">
                        None
                    </Text>
                )}
            </div>
        </div>
    </div>
);

const PointsSection = ({ owner, hunter }) => (
    <div className="flex-2 flex h-16 w-full min-w-0 flex-row gap-3">
        <div className="flex h-full w-full flex-col justify-between gap-3 overflow-hidden">
            <Text variant="label" className="text-secondary">
                Points
            </Text>
            <Text
                variant="paragraph"
                className="w-full overflow-hidden text-ellipsis whitespace-nowrap"
            >
                {owner}
            </Text>
        </div>
    </div>
);

const TagsSection = ({ tags, maxTags }) => (
    <div className="flex h-16 w-full flex-col gap-3">
        <Text variant="label" className="w-fit text-secondary">
            Tags
        </Text>
        <div className="flex w-full flex-row flex-wrap gap-1.5">
            {tags
                .slice(0, maxTags)
                .map(({ value, highlightValue, reversed }) => (
                    <Chip
                        key={value}
                        highlightValue={highlightValue}
                        value={value}
                        reversed={reversed}
                        className="max-w-[4.25rem]"
                    />
                ))}
            {tags.length > maxTags && (
                <Chip highlightValue={`+${tags.length - maxTags}`} />
            )}
        </div>
    </div>
);

const RewardSection = ({ reward }) => (
    <div className="basis-18 flex h-16 flex-shrink-0 flex-col justify-between overflow-hidden">
        <Text variant="label" className="inline text-secondary">
            Points
        </Text>
        <Text
            variant="heading"
            className="flex max-w-full flex-row items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-primary"
        >
            {(+reward).toFixed(0)}
        </Text>
    </div>
);

const BasicsSection = ({ name }) => (
    <div className="flex h-16 flex-col justify-between">
        <Chip highlightValue={'rank'} />
        <Text
            variant="heading"
            className={cn(
                'inline w-full overflow-hidden text-ellipsis whitespace-nowrap',
            )}
        >
            #{name}
        </Text>
    </div>
);

const BountyCard = data => (
    <div>
        <a>
            <Card
                className={cn(
                    'flex h-fit w-80 flex-shrink-0 snap-start flex-col items-start justify-between gap-2 p-6 sm:w-98',
                    '!w-full 2lg:flex-row 2lg:items-center',
                    'transition-all duration-300 hover:bg-opacity-[97%]',
                )}
            >
                <div className="w-full overflow-hidden">
                    <BasicsSection name={data.rank} />
                </div>

                <div className="flex w-full max-w-full flex-row justify-between">
                    <ParticipantSection owner={data.bounty.user} />
                </div>

                <div className="flex w-full max-w-full flex-row justify-between overflow-hidden md:justify-end">
                    <RewardSection reward={data.bounty.points} />
                </div>
            </Card>
        </a>
    </div>
);

export default BountyCard;
