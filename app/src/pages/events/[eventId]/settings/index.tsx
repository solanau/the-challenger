import Button from 'components/common/button';
import Text from 'components/common/text';
import EventSettingsForm from 'components/event-settings-page/event-settings-form';
import { Formik } from 'formik';
import { useChallenges } from 'hooks/use-challenges';
import { useEvent } from 'hooks/use-event';
import { updateEvent } from 'lib/api';
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
    const challenges = useChallenges({ version: 1, isNew: false });
    const [isLoading, setIsLoading] = useState(false);
    const { isLoggedIn, credential, user } = useAuth();

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
                    </div>

                    <div className="my-4 mx-auto grid gap-5 space-x-6 space-y-6 bg-gradient-to-tr px-5 sm:max-w-7xl sm:items-center sm:p-8 md:px-16 lg:px-32 lg:py-4 xl:px-48 xl:py-6">
                        {event && (
                            <Formik
                                initialValues={{
                                    title: event.title,
                                    description: event.description,
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
                                    isLoading={isLoading}
                                    challenges={challenges}
                                    eventStatus={event.status}
                                ></EventSettingsForm>
                            </Formik>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default EventSettingsPage;
