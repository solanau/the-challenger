import Button from 'components/common/button';
import Layout from 'components/common/layout';
import Text from 'components/common/text';
import LeaderboardList from 'components/leader-board-page/leader-board-list';
import { useCurrentUser } from 'hooks/use-current-user';
import { useEvent } from 'hooks/use-event';
import { useLeaderBoard } from 'hooks/use-leader-board';
import { updateLeaderBoard } from 'lib/api';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

type LeaderboardPageProps = {
    eventId: string;
};

const LeaderboardPage: NextPage<LeaderboardPageProps> = ({ eventId }) => {
    const user = useCurrentUser();
    const event = useEvent(eventId);
    const leaderBoard = useLeaderBoard(eventId, 'individual');

    const handleUpdateLeaderBoard = () => {
        updateLeaderBoard({
            eventId,
        });
    };

    return (
        <>
            <NextSeo
                title="Leaderboard"
                description="Explore and contribute to bounties that interest you and get paid for your work"
            ></NextSeo>

            <Layout eventId={eventId} location={event?.location ?? ''}>
                {user && event && event.managers.includes(user.id) && (
                    <Button variant="orange" onClick={handleUpdateLeaderBoard}>
                        Update Leader Board
                    </Button>
                )}

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
            </Layout>
        </>
    );
};

export default LeaderboardPage;

export const getServerSideProps: GetServerSideProps = async context => {
    let eventId = context.params.eventId;
    if (eventId instanceof Array) {
        eventId = eventId[0];
    }

    return {
        props: {
            eventId,
        },
    };
};
