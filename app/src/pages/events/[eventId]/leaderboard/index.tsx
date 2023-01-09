import Button from 'components/common/button';
import Spinner from 'components/common/spinner';
import Text from 'components/common/text';
import LeaderboardList from 'components/leaderboard-page/leaderboard-list';
import { useEvent } from 'hooks/use-event';
import { useLeaderboard } from 'hooks/use-leaderboard';
import { updateLeaderboard } from 'lib/api';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { useState } from 'react';
import { CSVLink } from 'react-csv';
import { toast } from 'react-toastify';

const LeaderboardPage: NextPage = () => {
    const router = useRouter();
    const eventId =
        router.query.eventId instanceof Array
            ? router.query.eventId[0]
            : router.query.eventId;
    const { user } = useAuth();
    const event = useEvent(eventId);
    const leaderboard = useLeaderboard(eventId, 'individual');
    const isEventManager =
        user && event && event.managers && event.managers.includes(user.id);
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdateLeaderboard = () => {
        setIsLoading(true);

        updateLeaderboard({
            eventId,
        })
            .then(() => {
                toast('Leaderboard updated!', {
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
                title="Leaderboard"
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
                                className="mt-2 bg-gradient-to-tl from-[#ef3c11] via-[#fdb735] to-[#ffeb3a] bg-clip-text text-center text-transparent"
                            >
                                Leaderboard
                            </Text>
                            {isEventManager && (
                                <div className="flex w-full flex-row justify-end">
                                    <Button
                                        className="mt-2 flex h-8 bg-gradient-to-tl from-[#a3568f] via-[#cf78b7] to-[#fca9e6]"
                                        variant="orange"
                                        onClick={handleUpdateLeaderboard}
                                    >
                                        {isLoading && (
                                            <Spinner variant="large"></Spinner>
                                        )}
                                        Send Emails
                                    </Button>
                                    <Button
                                        className="mx-2 mt-2 flex h-8 bg-gradient-to-tl from-[#6d737d] via-[#a8b1bf] to-[#d1d9e6]"
                                        variant="orange"
                                    >
                                        <CSVLink {...leaderboard}>
                                            Export to CSV
                                        </CSVLink>
                                    </Button>
                                    <Button
                                        className="mt-2 flex h-8 bg-gradient-to-tl from-[#ef3c11] via-[#fdb735] to-[#ffeb3a]"
                                        variant="orange"
                                        onClick={handleUpdateLeaderboard}
                                    >
                                        {isLoading && (
                                            <Spinner variant="large"></Spinner>
                                        )}
                                        Refresh
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="mt-6">
                            <LeaderboardList
                                leaderboard={leaderboard}
                                isEventManager={isEventManager}
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
