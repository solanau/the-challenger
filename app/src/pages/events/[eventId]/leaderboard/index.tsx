import Button from 'components/common/button';
import Text from 'components/common/text';
import LeaderboardListItem from 'components/leaderboard-page/leaderboard-list-item';
import { useEvent } from 'hooks/use-event';
import { useLeaderboard } from 'hooks/use-leaderboard-2';
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
                            {user && isEventManager && leaderboard && (
                                <div className="mt-2 flex w-full flex-row justify-end">
                                    <Button
                                        className="mx-2 mt-2 flex h-8 bg-gradient-to-tl from-[#a3568f] via-[#cf78b7] to-[#fca9e6]"
                                        variant="orange"
                                    >
                                        <CSVLink
                                            {...{
                                                headers: [
                                                    {
                                                        label: 'UserID',
                                                        key: 'userId',
                                                    },
                                                    {
                                                        label: 'Username',
                                                        key: 'userName',
                                                    },
                                                    {
                                                        label: 'Full Name',
                                                        key: 'fullName',
                                                    },
                                                    {
                                                        label: 'Email',
                                                        key: 'email',
                                                    },
                                                    {
                                                        label: 'PublicKey',
                                                        key: 'userPublicKey',
                                                    },
                                                    {
                                                        label: 'Points',
                                                        key: 'points',
                                                    },
                                                    {
                                                        label: '% of Total Points',
                                                        key: 'percentTotal',
                                                    },
                                                ],
                                                data: leaderboard.participants,
                                                filename: `${event.title.replaceAll(
                                                    ' ',
                                                    '_',
                                                )}_leaderboard.csv`,
                                            }}
                                        >
                                            Export to CSV
                                        </CSVLink>
                                    </Button>
                                </div>
                            )}
                        </div>

                        {user && (
                            <div className="mt-6">
                                <div className="flex flex-col gap-4">
                                    <div className="top-36 z-30 hidden flex-row justify-between gap-5 bg-neutral bg-opacity-40 px-6 py-3 text-base-content backdrop-blur-xl 2lg:flex">
                                        <div className="flex w-full justify-start text-amber-400">
                                            <Text variant="heading">Rank</Text>
                                        </div>
                                        <div className="flex w-full justify-start text-amber-400">
                                            <Text variant="heading">
                                                Player
                                            </Text>
                                        </div>
                                        <div className="mr-2 flex w-full justify-end text-amber-400">
                                            <Text variant="heading">Total</Text>
                                        </div>
                                        {isEventManager && (
                                            <div className="mr-2 flex w-full justify-end text-amber-400">
                                                <Text variant="heading">
                                                    Payout
                                                </Text>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex w-full flex-col gap-6">
                                        {leaderboard?.participants.length ? (
                                            leaderboard.participants.map(
                                                (participant, index) => (
                                                    <LeaderboardListItem
                                                        key={index}
                                                        position={index + 1}
                                                        participant={
                                                            participant
                                                        }
                                                        isEventManager={
                                                            isEventManager
                                                        }
                                                        isCurrentUser={
                                                            participant.userId ===
                                                            user.id
                                                        }
                                                    />
                                                ),
                                            )
                                        ) : (
                                            <div className="flex h-20 items-center justify-center">
                                                <p className="text-secondary">
                                                    No results found.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeaderboardPage;
