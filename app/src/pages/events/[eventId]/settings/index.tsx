import Button from 'components/common/button';
import Spinner from 'components/common/spinner';
import Text from 'components/common/text';
import EventSettingsForm from 'components/event-settings-page/event-settings-form';
import { Formik } from 'formik';
import { useChallenges } from 'hooks/use-challenges';
import { useEvent } from 'hooks/use-event';
import { getEventParticipants, sendParticipationCertificates, sendParticipationCertificateToAddress, sendTopLoaderboardCertificates, updateEvent } from 'lib/api';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { UpdateEventPayload } from 'types/event';
import { fromEventSettingsFormData } from 'utils/event';
import { dateToValue } from 'utils/time';

const EventSettingsPage: NextPage = () => {
    const router = useRouter();
    const eventId =
        (router.query.eventId instanceof Array
            ? router.query.eventId[0]
            : router.query.eventId) ?? null;
    const event = useEvent(eventId);
    const [isLoading, setIsLoading] = useState(false);
    const [isSendingParticipationNFTs, setIsSendingParticipationNFTs] = useState(false);
    const [isSendingParticipationTestNFT, setIsSendingParticipationTestNFT] = useState(false);
    const [isSendingTopLeaderboardNFTs, setIsSendingTopLeaderboardNFTs] = useState(false);
    const [walletAddressForTestNFT, setWalletAddressForTestNFT] = useState('');
    const [isDownloadingCSV, setIsDownloadingCSV] = useState(false);
    const { isLoggedIn, credential, user } = useAuth();
    const challenges = useChallenges({ version: 1, isNew: false, user, onlyApproved: false });

    const handleUpdateEvent = (updateEventPayload: UpdateEventPayload) => {
        setIsLoading(true);

        updateEvent(eventId, updateEventPayload)
            .then(() =>
                toast('Event updated!', {
                    type: 'success',
                }),
            )
            .catch(error => {
                toast(error, {
                    type: 'error',
                });
            })
            .finally(() => setIsLoading(false));

    };

    const handleSendParticipationNFTs = () => {
        setIsSendingParticipationNFTs(true);
        sendParticipationCertificates(eventId)
            .then(() =>
                toast('NFTs sent!', {
                    type: 'success',
                }),
            )
            .catch(error => {
                toast(error, {
                    type: 'error',
                });
            })
            .finally(() => setIsSendingParticipationNFTs(false));
    }

    const handleSendTestParticipationNFT = () => {
        setIsSendingParticipationTestNFT(true);
        sendParticipationCertificateToAddress(eventId, walletAddressForTestNFT)
            .then((success) => {
                if (success) {

                    toast('NFT sent!', {
                        type: 'success',
                    })
                } else {
                    toast('Unknown error, check server log', {
                        type: 'error',
                    });
                }
            })
            .catch(error => {
                toast(error, {
                    type: 'error',
                });
            })
            .finally(() => setIsSendingParticipationTestNFT(false));
    }

    const handleSendTopLeaderboardNFTs = () => {
        setIsSendingTopLeaderboardNFTs(true);
        sendTopLoaderboardCertificates(eventId)
            .then(() =>
                toast('NFTs sent!', {
                    type: 'success',
                }),
            )
            .catch(error => {
                toast(error, {
                    type: 'error',
                });
            })
            .finally(() => setIsSendingTopLeaderboardNFTs(false));
    }

    const handleDownloadParticipantsCSV = () => {
        setIsDownloadingCSV(true);

        getEventParticipants(eventId)
            .then(participants => console.log(participants))
            .catch(error => {
                toast(error, {
                    type: 'error',
                });
            })
            .finally(() => setIsDownloadingCSV(false));
    };

    return (
        <>
            {!isLoggedIn && (
                <div className="flex w-full grow flex-col items-center justify-center gap-3 p-5 text-center sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                    <Text variant="sub-heading">
                        Sign in to access this page.
                    </Text>

                    <div className="flex flex-row gap-2">
                        <Link href="/" passHref>
                            <a>
                                <Button variant="transparent" text="Go back" />
                            </a>
                        </Link>

                        <Link href="/login" passHref>
                            <a>
                                <Button variant="orange" text="Sign in" />
                            </a>
                        </Link>
                    </div>
                </div>
            )}

            {isLoggedIn && user === null && (
                <div className="flex w-full grow flex-col items-center justify-center gap-3 p-5 text-center sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                    <Text variant="sub-heading">
                        Only users that have a profile can access this page. In
                        order to set yours, go ahead and{' '}
                        <Link href={`/users/${credential.id}/settings`}>
                            <a className="text-primary underline">
                                set up your profile
                            </a>
                        </Link>{' '}
                        to get started.
                    </Text>
                </div>
            )}

            {isLoggedIn && user !== null && !user.isAdmin && (
                <div className="flex w-full grow flex-col items-center justify-center gap-3 p-5 text-center sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                    <Text variant="sub-heading">
                        You're not authorized to access this page.
                    </Text>
                </div>
            )}

            {isLoggedIn && user !== null && user.isAdmin && (
                <>
                    <div className="flex w-full flex-col gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                        <Text variant="big-heading">Event Settings</Text>

                        <Text variant="paragraph">Customize your event</Text>

                        <div>
                            <Button
                                variant="black"
                                onClick={() => handleDownloadParticipantsCSV()}
                                disabled={isDownloadingCSV}
                            >
                                {isDownloadingCSV && (
                                    <Spinner variant="large"></Spinner>
                                )}
                                Download Participants .CSV
                            </Button>
                        </div>
                    </div>

                    <div className="flex w-full flex-col gap-5 bg-gradient-to-tr p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                        {event && (
                            <Formik
                                initialValues={{
                                    title: event.title,
                                    description: event.description,
                                    body: event.body,
                                    startDate: event.startDate
                                        ? dateToValue(event.startDate)
                                        : '',
                                    endDate: event.endDate
                                        ? dateToValue(event.endDate)
                                        : '',
                                    challenges: event.challenges.map(
                                        challenge => challenge.id,
                                    ),
                                    managers: event.managers?.join(', ') ?? '',
                                    reviewers:
                                        event.reviewers?.join(', ') ?? '',
                                    participationNFT: {
                                        minChallengesToCertificate: event.participationNFT?.minChallengesToCertificate ?? '',
                                        candyMachineAddress: event.participationNFT?.candyMachineAddress ?? '',
                                        collectionUpdateAuthority: event.participationNFT?.collectionUpdateAuthority ?? '',
                                        maxUsersToCertificate: event.participationNFT?.maxUsersToCertificate ?? '',
                                    },
                                    topLeaderboardNFT: {
                                        minPoints: event.topLeaderboardNFT?.minPoints ?? '',
                                        candyMachineAddress: event.topLeaderboardNFT?.candyMachineAddress ?? '',
                                        collectionUpdateAuthority: event.topLeaderboardNFT?.collectionUpdateAuthority ?? '',
                                        maxUsersToCertificate: event.topLeaderboardNFT?.maxUsersToCertificate ?? '',
                                    }
                                }}
                                onSubmit={values =>
                                    handleUpdateEvent(
                                        fromEventSettingsFormData(
                                            values,
                                            challenges,
                                        ),
                                    )
                                }
                            >
                                <EventSettingsForm
                                    challenges={challenges}
                                    isLoading={isLoading}
                                ></EventSettingsForm>
                            </Formik>
                        )}
                        <div role="group" aria-labelledby="checkbox-group" className="pt-4">
                            <Text variant="sub-heading" className="mt-4 mb-4">
                                Participation actions
                            </Text>

                            <div className="max-h-256 flex flex-col gap-5 overflow-y-auto px-2 py-4">
                                <div className="width-full flex flex-row justify-start gap-2 pt-4">
                                    <Button onClick={handleSendParticipationNFTs} type="button" variant="orange" disabled={isSendingParticipationNFTs}>
                                        {isSendingParticipationNFTs && <Spinner variant="large"></Spinner>}
                                        Send Participation NFTs
                                    </Button>
                                </div>
                            </div>
                            <hr className="mt-5"></hr>

                            <div className="max-h-256 flex flex-col gap-5 overflow-y-auto px-2 py-4">
                                <div className="width-full flex flex-col justify-start gap-2 pt-4">
                                    <div className="text-red-500 mb-2 uppercase">Testing: Send a mint to a wallet address (Proceed with caution because this is a real mint)</div>
                                    <div className='flex flex-col'>
                                        <label className="text-red-500 mb-2">Wallet address to mint</label>
                                        <input onChange={(e) => setWalletAddressForTestNFT(e.target.value)} className="text-red-500 w-full rounded-2xl border border-red-500 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-red-500 focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"></input>
                                    </div>
                                </div>
                                <div className="width-full flex flex-row justify-start gap-2 pt-4">
                                    <Button onClick={handleSendTestParticipationNFT} type="button" variant="danger" disabled={isSendingParticipationTestNFT}>
                                        {isSendingParticipationTestNFT && <Spinner variant="large"></Spinner>}
                                        Send NFT to address
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div role="group" aria-labelledby="checkbox-group" className="pt-4">
                            <Text variant="sub-heading" className="mt-4 mb-4">
                                Top Leaderboard actions
                            </Text>

                            <div className="max-h-256 flex flex-col gap-5 overflow-y-auto px-2 py-4">
                                <div className="width-full flex flex-row justify-start gap-2 pt-4">
                                    <Button onClick={handleSendTopLeaderboardNFTs} type="button" variant="orange" disabled={isSendingTopLeaderboardNFTs}>
                                        {isSendingTopLeaderboardNFTs && <Spinner variant="large"></Spinner>}
                                        Send Top Leaderboard NFTs
                                    </Button>
                                </div>
                            </div>
                            {/* <hr className="mt-5"></hr>

                            <div className="max-h-256 flex flex-col gap-5 overflow-y-auto px-2 py-4">
                                <div className="width-full flex flex-col justify-start gap-2 pt-4">
                                    <div className="text-red-500 mb-2 uppercase">Testing: Send a mint to a wallet address (Proceed with caution because this is a real mint)</div>
                                    <div className='flex flex-col'>
                                        <label className="text-red-500 mb-2">Wallet address to mint</label>
                                        <input onChange={(e) => setWalletAddressForTestNFT(e.target.value)} className="text-red-500 w-full rounded-2xl border border-red-500 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-red-500 focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"></input>
                                    </div>
                                </div>
                                <div className="width-full flex flex-row justify-start gap-2 pt-4">
                                    <Button onClick={handleSendTestParticipationNFT} type="button" variant="danger" disabled={isSendingParticipationTestNFT}>
                                        {isSendingParticipationTestNFT && <Spinner variant="large"></Spinner>}
                                        Send NFT to address
                                    </Button>
                                </div>
                            </div> */}
                        </div>
                    </div>

                </>
            )}
        </>
    );
};

export default EventSettingsPage;
