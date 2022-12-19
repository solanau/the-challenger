import Button from 'components/common/button';
import Card from 'components/common/card';
import Modal from 'components/common/modal';
import Text from 'components/common/text';
import CreateEventForm from 'components/events-page/create-event-form';
import { Formik } from 'formik';
import { useEvents } from 'hooks/use-events';
import { createEvent } from 'lib/api';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { ChangeEvent, useMemo, useState } from 'react';
import { TbPlus } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { CreateEventPayload } from 'types/event';
import { v4 as uuid } from 'uuid';

const EventsPage: NextPage = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const events = useEvents();
    const [selectedStatusFilter, setSelectedStatusFilter] =
        useState<string>('active');
    const filteredEvents = useMemo(() => {
        if (!selectedStatusFilter) {
            return events;
        }
        return events.filter(event => event.status === selectedStatusFilter);
    }, [selectedStatusFilter, events]);

    const handleStatusFilterChange = (
        event: ChangeEvent<HTMLSelectElement>,
    ) => {
        setSelectedStatusFilter(event.target.value);
    };

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

    return (
        <>
            <div className="flex w-full flex-col flex-wrap gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                <Text variant="big-heading">Events</Text>
                <Text variant="paragraph">
                    Explore events near by and start competing with other
                    students for the grand prize.
                </Text>

                <div>
                    {user && user.canCreateStatus === 'approved' && (
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
                    )}

                    <Modal
                        title="New Event"
                        subTitle="Create a new event and add challenges
                                        for participants to compete."
                        isOpen={isCreateEventModalOpen}
                        onClose={() =>
                            !isLoading && setIsCreateEventModalOpen(false)
                        }
                    >
                        <Formik
                            initialValues={{
                                title: '',
                                description: '',
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

            <div className="flex w-full flex-row flex-wrap gap-5 bg-gradient-to-tr p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                <div>
                    <select
                        name="filter-list"
                        id="filter-list"
                        onChange={handleStatusFilterChange}
                        className="rounded-md border-2 border-white bg-white px-4 py-2 text-black"
                        defaultValue={'active'}
                    >
                        <option value="">All</option>
                        <option value="active">Active</option>
                        <option value="draft">Drafts</option>
                    </select>
                </div>
                {filteredEvents.map(event => (
                    <Card
                        key={event.id}
                        className="flex min-w-fit flex-1 flex-col justify-between gap-10 p-12"
                    >
                        <div className="flex flex-col gap-5">
                            <Text
                                className="min-w-fit break-all"
                                variant="big-heading"
                            >
                                {event.title}
                            </Text>
                            <Text variant="paragraph">{event.description}</Text>

                            <div className="flex flex-row">
                                <div className="flex flex-row justify-start">
                                    <Text
                                        className={`my-auto ${
                                            event.status === 'draft'
                                                ? 'text-pink-500'
                                                : 'text-green-500'
                                        }`}
                                        variant="label"
                                    >
                                        {event.status}
                                    </Text>
                                </div>

                                <div className="flex w-full flex-row flex-wrap justify-end gap-2">
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

                                    <Link href={`events/${event.id}/settings`}>
                                        <a className="w-full md:w-auto">
                                            <Button
                                                variant="black"
                                                className="w-full md:w-auto"
                                            >
                                                Settings
                                            </Button>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default EventsPage;
