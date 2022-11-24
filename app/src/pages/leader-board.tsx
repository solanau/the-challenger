import Button from 'components/common/button';
import Text from 'components/common/text';
import LeaderboardList from 'components/leader-board-page/leader-board-list';
import { useEvent } from 'hooks/use-event';
import { useLeaderBoard } from 'hooks/use-leader-board';
import { updateLeaderBoard } from 'lib/api';
import { NextSeo } from 'next-seo';

const LeaderboardPage = () => {
    const event = useEvent(
        process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_EVENT_ID,
    );
    const leaderBoard = useLeaderBoard(
        process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_EVENT_ID,
        'individual',
    );

    const handleUpdateLeaderBoard = () => {
        updateLeaderBoard({
            eventId: process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_EVENT_ID,
        });
    };

    console.log(leaderBoard);

    return (
        <>
            <NextSeo
                title="Leaderboard"
                description="Explore and contribute to bounties that interest you and get paid for your work"
            ></NextSeo>

            <Button variant="orange" onClick={handleUpdateLeaderBoard}>
                Update Leader Board
            </Button>

            <div className="flex flex-col gap-12 pt-14">
                <div className="flex flex-col gap-0">
                    <Text variant="sub-heading" className="text-center">
                        {event?.title}
                    </Text>
                    <div className="flex w-full flex-col gap-2 px-5 sm:px-8 md:px-16 lg:px-32 xl:px-48">
                        <Text
                            variant="big-heading"
                            className="bg-gradient-to-tl from-[#ef3c11] via-[#fdb735] to-[#ffeb3a] bg-clip-text text-center text-8xl text-transparent"
                        >
                            Leaderboard
                        </Text>

                        <div className="mt-6">
                            <LeaderboardList
                                leaderBoard={leaderBoard}
                                key="open-bounties"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeaderboardPage;
