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
        (router.query.eventId instanceof Array
            ? router.query.eventId[0]
            : router.query.eventId) ?? null;
    const { user } = useAuth();
    const event = useEvent(eventId, user);
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
            .catch((error) => {
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
            />

            <div className="flex flex-col gap-4 pt-6 px-2 sm:px-6 md:px-8 lg:px-10">
                <Text variant="sub-heading" className="text-center">
                    {event?.title}
                </Text>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col items-center">
                        <Text
                            variant="big-heading"
                            className="text-center text-transparent bg-gradient-to-tl from-[#ef3c11] via-[#fdb735] to-[#ffeb3a] bg-clip-text text-3xl md:text-5xl"
                        >
                            LeaderBoard
                        </Text>
                        {user && event && event.managers && event.managers.includes(user.id) && (
                            <Button
                                className="flex items-center justify-center h-8 px-4 bg-gradient-to-tl from-[#ef3c11] via-[#fdb735] to-[#ffeb3a]"
                                variant="orange"
                                onClick={handleUpdateLeaderBoard}
                            >
                                {isLoading && <Spinner variant="large" />}
                                Refresh
                            </Button>
                        )}
                    </div>

                    <div className="mt-6">
                        <LeaderBoardList leaderBoard={leaderBoard} key="open-bounties" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeaderBoardPage;
