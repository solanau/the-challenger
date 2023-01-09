import Card from 'components/common/card';
import Chip from 'components/common/chip';
import Text from 'components/common/text';
import Link from 'next/link';
import { ParticipantPayload } from 'types/leaderboard';
import { cn } from 'utils';

interface LeaderboardListItemProps {
    position: number;
    participant: ParticipantPayload;
    isEventManager: boolean;
    isCurrentUser: boolean;
}

const LeaderboardListItem = ({
    position,
    participant,
    isEventManager,
    isCurrentUser,
}: LeaderboardListItemProps) => (
    <Card
        className={cn(
            'flex h-fit w-80 flex-shrink-0 snap-start flex-col items-start justify-between gap-2 p-6 sm:w-98',
            '!w-full 2lg:flex-row 2lg:items-center',
            'transition-all duration-300 hover:bg-opacity-[97%]',
        )}
    >
        <Link href={`${participant.userName}`} passHref>
            <div className="flex w-full cursor-pointer overflow-hidden">
                <div className="w-full overflow-hidden">
                    <div className="flex h-16 flex-col justify-between">
                        <Chip highlightValue={'rank'} />
                        <Text
                            variant="heading"
                            className={cn(
                                'inline w-full overflow-hidden text-ellipsis whitespace-nowrap',
                            )}
                        >
                            #{position}
                        </Text>
                    </div>
                </div>

                <div className="flex w-full max-w-full flex-row justify-between">
                    <div className="flex h-16 w-full min-w-0 flex-1 flex-row gap-3">
                        <div className="flex h-full w-full flex-col justify-between gap-3">
                            <Text variant="label" className="text-secondary">
                                Player
                            </Text>
                            <div className="flex flex-col justify-start">
                                <Text
                                    variant="heading"
                                    className={`overflow-hidden text-ellipsis whitespace-nowrap ${
                                        isCurrentUser && 'text-primary'
                                    }`}
                                >
                                    <a>
                                        <span className="">
                                            {participant.userName}
                                        </span>
                                    </a>
                                </Text>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex w-full max-w-full flex-row justify-between overflow-hidden md:justify-end">
                    <div className="basis-18 flex h-16 flex-shrink-0 flex-col justify-between overflow-hidden">
                        <Text variant="label" className="inline text-secondary">
                            Points
                        </Text>
                        <Text
                            variant="heading"
                            className="flex max-w-full flex-row items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-primary"
                        >
                            {(+participant.points).toFixed(0)}
                        </Text>
                    </div>
                </div>

                {isEventManager && (
                    <div className="flex w-full max-w-full flex-row justify-between overflow-hidden md:justify-end">
                        <div className="basis-18 flex h-16 flex-shrink-0 flex-col justify-between overflow-hidden">
                            <Text
                                variant="label"
                                className="inline text-secondary"
                            >
                                Payout
                            </Text>
                            <div className="flex max-w-full flex-row items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
                                <Text
                                    variant="heading"
                                    className="text-white-400"
                                >
                                    {(+participant.points).toFixed(0)}
                                </Text>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Link>
    </Card>
);

export default LeaderboardListItem;
