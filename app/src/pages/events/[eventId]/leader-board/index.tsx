import Button from 'components/common/button';
import Spinner from 'components/common/spinner';
import Text from 'components/common/text';
import LeaderBoardList from 'components/leader-board-page/leader-board-list';
import { useEvent } from 'hooks/use-event';
import { useLeaderBoard } from 'hooks/use-leader-board';
import { updateLeaderBoard } from 'lib/api';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { useState } from 'react';
import { toast } from 'react-toastify';

const LeaderBoardPage: NextPage = () => {
    const router = useRouter();
    const eventId =
        router.query.eventId instanceof Array
            ? router.query.eventId[0]
            : router.query.eventId;
    const { user } = useAuth();
    const event = useEvent(eventId);
    const leaderBoard = useLeaderBoard(eventId, 'individual');
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdateLeaderBoard = () => {
        setIsLoading(true);

        updateLeaderBoard({
            eventId,
        })
            .then(() => {
                toast('Leader board updated!', {
                    type: 'success',
                });
            })
            .catch(error => {
                toast(error, {
                    type: 'error',
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <>
            <NextSeo
                title="LeaderBoard"
                description="Explore and contribute to bounties that interest you and get paid for your work"
            ></NextSeo>

            <div className="flex flex-col gap-12 pt-14">
                <div className="flex flex-col gap-0">
                    <Text variant="sub-heading" className="text-center">
                        {event?.title}
                    </Text>
                    <div className="flex w-full flex-col gap-2 px-5 sm:px-8 md:px-16 lg:px-32 xl:px-48">
                        <div className="flex w-full flex-col items-center">
                            <Text
                                variant="big-heading"
                                className="bg-gradient-to-tl from-[#ef3c11] via-[#fdb735] to-[#ffeb3a] bg-clip-text text-center text-transparent"
                            >
                                LeaderBoard
                            </Text>
                            {user &&
                                event &&
                                event.managers &&
                                event.managers.includes(user.id) && (
                                    <Button
                                        className="flex h-8 bg-gradient-to-tl from-[#ef3c11] via-[#fdb735] to-[#ffeb3a]"
                                        variant="orange"
                                        onClick={handleUpdateLeaderBoard}
                                    >
                                        {isLoading && (
                                            <Spinner variant="large"></Spinner>
                                        )}
                                        Refresh
                                    </Button>
                                )}
                        </div>

                        <div className="mt-6">
                            <LeaderBoardList
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

export default LeaderBoardPage;
