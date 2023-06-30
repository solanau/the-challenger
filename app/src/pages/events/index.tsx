import Button from 'components/common/button';
import Card from 'components/common/card';
import Modal from 'components/common/modal';
import Text from 'components/common/text';
import CreateEventForm from 'components/events-page/create-event-form';
import { Formik } from 'formik';
import { useEvents } from 'hooks/use-events';
import { createEvent } from 'lib/api';
import * as _ from 'lodash';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { useMemo, useState } from 'react';
import { TbPlus } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { ReviewStatus } from 'types/challenge';
import { CreateEventPayload, EventPayload } from 'types/event';
import { v4 as uuid } from 'uuid';

const EventsPage: NextPage = () => {
    const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { isLoggedIn, credential, user, isAdmin } = useAuth();
    const [showPublicEvents, setShowPublicEvents] = useState(true)
    const [eventsStatus, setEventsStatus] = useState<ReviewStatus>('approved')
    const events = useEvents({ user, includePublic: showPublicEvents, userEventsStatus: eventsStatus });

    const handleCreateEvent = (createEventPayload: CreateEventPayload) => {
        setIsLoading(true);

        const eventId = uuid();

        createEvent(eventId, createEventPayload)
            .then(() => {
                toast('Event created!', {
                    type: 'success',
                });
                router.push(`/events/${eventId}/settings`);
            })
            .catch(error => {
                toast(error, {
                    type: 'error',
                });
            })
            .finally(() => {
                setIsLoading(false);
                setIsCreateEventModalOpen(false);
            });
    };

    const canViewSubmissions = (event: EventPayload) => {
        const isManager = event.managers ? event.managers.find(id => id == user.id) != undefined : false
        const isReviewer = event.reviewers ? event.reviewers.find(id => id == user.id) != undefined : false
        const isCreator = event.userId == user.id

        return isManager || isReviewer || isCreator || isAdmin
    }

    const canViewSettings = (event: EventPayload) => {
        const isManager = event.managers ? event.managers.find(id => id == user.id) != undefined : false
        const isReviewer = event.reviewers ? event.reviewers.find(id => id == user.id) != undefined : false
        const isCreator = event.userId == user.id

        return isManager || isReviewer || isCreator || isAdmin
    }

    const showFilterOwnership = useMemo(() => {
        return isAdmin || !isAdmin && showPublicEvents == false
    }, [showPublicEvents, user])

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

            <>
                <div className="flex w-full flex-col flex-wrap gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                    <Text variant="big-heading">Events</Text>
                    <Text variant="paragraph">
                        Explore events near by and start competing with
                        other students for the grand prize.
                    </Text>

                    <div>
                        <Button
                            icon={TbPlus}
                            text={'Create an event'}
                            variant="transparent"
                            className="bg-zinc-700"
                            onClick={() =>
                                setIsCreateEventModalOpen(
                                    !isCreateEventModalOpen,
                                )
                            }
                        ></Button>

                        <Modal
                            title="New Event"
                            subTitle="Create a new event and add challenges
                                        for participants to compete."
                            isOpen={isCreateEventModalOpen}
                            onClose={() =>
                                !isLoading &&
                                setIsCreateEventModalOpen(false)
                            }
                        >
                            <Formik
                                initialValues={{
                                    title: '',
                                    description: '',
                                    body: '',
                                }}
                                onSubmit={handleCreateEvent}
                            >
                                <CreateEventForm
                                    isLoading={isLoading}
                                ></CreateEventForm>
                            </Formik>
                        </Modal>
                    </div>
                </div>

                <div className="flex w-full flex-row flex-wrap gap-5 bg-gradient-to-tr p-5 sm:p-8 md:px-16 lg:px-32 lg:py-8 xl:px-32 xl:py-20">

                    <div>
                        Filter by ownership:
                        <select
                            id="ownership"
                            // value={status}
                            onChange={(evt) => {
                                console.log('evt', evt.target.value == 'all')
                                setShowPublicEvents(evt.target.value == 'all')
                            }}
                            className="ml-4 h-10 rounded-lg bg-white bg-opacity-10 px-2 py-1"
                        >
                            <option
                                value="all"
                                className="bg-black bg-opacity-60 "
                            >
                                All
                            </option>
                            <option
                                value="mine"
                                className="bg-black bg-opacity-60"
                            >
                                My events
                            </option>
                        </select>
                    </div>

                    {showFilterOwnership ? <div>
                        Filter by status:
                        <select
                            id="ownership"
                            // value={status}
                            onChange={(evt) => setEventsStatus(evt.target.value as ReviewStatus)}
                            className="ml-4 h-10 rounded-lg bg-white bg-opacity-10 px-2 py-1"
                        >
                            <option
                                value=""
                                className="bg-black bg-opacity-60 "
                            >
                                All
                            </option>
                            <option
                                value="pending"
                                className="bg-black bg-opacity-60 "
                            >
                                Pending
                            </option>
                            <option
                                value="approved"
                                className="bg-black bg-opacity-60"
                            >
                                Approved
                            </option>
                            <option
                                value="rejected"
                                className="bg-black bg-opacity-60"
                            >
                                Rejected
                            </option>
                        </select>
                    </div> : null}

                </div>

                <div className="flex w-full flex-row flex-wrap gap-5 bg-gradient-to-tr p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                    {events.map(event => (
                        <Card
                            key={event.id}
                            className="flex min-w-fit flex-col justify-between gap-10 p-12 w-full"
                        >
                            <div className="flex flex-col gap-5">
                                <Text
                                    className="min-w-fit break-all"
                                    variant="big-heading"
                                >
                                    {event.title}
                                </Text>
                                <Text variant="paragraph">
                                    {event.description}
                                </Text>

                                <div className="flex flex-row flex-wrap justify-end gap-2">
                                    <div className='flex items-start flex-col'>
                                        <div>Status:</div>
                                        <div className='font-semibold'>{event.reviewStatus ? _.capitalize(event.reviewStatus.toString()) : 'Pending'}</div>
                                    </div>

                                    <Link href={`events/${event.id}`}>
                                        <a className="w-full md:w-auto">
                                            <Button
                                                variant="orange"
                                                className="w-full md:w-auto"
                                            >
                                                View Preview
                                            </Button>
                                        </a>
                                    </Link>

                                    {canViewSubmissions(event) ?
                                        <Link
                                            href={`events/${event.id}/submissions`}
                                        >
                                            <a className="w-full md:w-auto">
                                                <Button
                                                    variant="orange"
                                                    className="w-full md:w-auto"
                                                >
                                                    View Submissions
                                                </Button>
                                            </a>
                                        </Link>
                                        : null}

                                    {canViewSettings(event) ?
                                        <Link
                                            href={`events/${event.id}/settings`}
                                        >
                                            <a className="w-full md:w-auto">
                                                <Button
                                                    variant="black"
                                                    className="w-full md:w-auto"
                                                >
                                                    Settings
                                                </Button>
                                            </a>
                                        </Link>
                                        : null}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </>
            {/* )} */}
        </>
    );
};

export default EventsPage;
