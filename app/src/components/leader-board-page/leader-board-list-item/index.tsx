import Card from 'components/common/card';
import Chip from 'components/common/chip';
import Text from 'components/common/text';
import { useUser } from 'hooks/use-user';
import Link from 'next/link';
import { ParticipantDto } from 'types/leader-board';
import { cn } from 'utils';

interface LeaderboardListItemProps {
    position: number;
    participant: ParticipantDto;
}

const LeaderBoardListItem = ({
    position,
    participant,
}: LeaderboardListItemProps) => {
    const user = useUser(participant.userId);

    return (
        <Card
            className={cn(
                'flex h-fit w-80 flex-shrink-0 snap-start flex-col items-start justify-between gap-2 p-6 sm:w-98',
                '!w-full 2lg:flex-row 2lg:items-center',
                'transition-all duration-300 hover:bg-opacity-[97%]',
            )}
        >
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
                    <div className="flex h-full w-full flex-col justify-between gap-3 ">
                        <Text variant="label" className="text-secondary">
                            Player
                        </Text>
                        <div className="flex items-center justify-start">
                            <Text
                                variant="heading"
                                className="overflow-hidden text-ellipsis whitespace-nowrap"
                            >
                                {user?.fullName} &nbsp;
                            </Text>
                            <Text variant="paragraph" className="text-primary">
                                <Link href={`${user?.userName}`} passHref>
                                    <a>
                                        @
                                        <span className=" underline">
                                            {user?.userName}
                                        </span>
                                    </a>
                                </Link>
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
        </Card>
    );
};

export default LeaderBoardListItem;
