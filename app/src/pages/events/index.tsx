/* eslint-disable react/no-unescaped-entities */
import Button from 'components/common/button';
import Card from 'components/common/card';
import Modal from 'components/common/modal';
import Text from 'components/common/text';
import EditEventForm from 'components/events-page/edit-event-form';
import { useEvents } from 'hooks/use-events';
import { createEvent } from 'lib/api';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { TbPlus } from 'react-icons/tb';
import { EditEventPayload } from 'types/event';
import { v4 as uuid } from 'uuid';

const EventsPage: NextPage = () => {
    const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
    const events = useEvents();

    const handleEditEvent = (editEventPayload?: EditEventPayload) => {
        setIsCreateEventModalOpen(false);

        if (editEventPayload) {
            createEvent({ id: uuid(), ...editEventPayload })
                .then(() => alert('Event created!'))
                .catch(error => alert(error));
        }
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
                    <Button
                        icon={TbPlus}
                        text={'Create an event'}
                        variant="transparent"
                        className="bg-zinc-700"
                        onClick={() =>
                            setIsCreateEventModalOpen(!isCreateEventModalOpen)
                        }
                    ></Button>

                    <Modal
                        title="New Event"
                        subTitle="Create a new event and add challenges
                                        for participants to compete."
                        isOpen={isCreateEventModalOpen}
                        onClose={() => setIsCreateEventModalOpen(false)}
                    >
                        <EditEventForm
                            onSubmit={handleEditEvent}
                        ></EditEventForm>
                    </Modal>
                </div>
            </div>

            <div className="flex w-full flex-row flex-wrap gap-5 bg-gradient-to-tr p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                {events.map(event => (
                    <Card
                        key={event.id}
                        className="flex min-w-fit flex-1 flex-col justify-between gap-10 p-12"
                    >
                        <div className="flex flex-col gap-5">
                            <Text className="min-w-fit" variant="big-heading">
                                {event.title}
                            </Text>
                            <Text variant="paragraph">{event.description}</Text>

                            <div className="flex flex-row justify-end gap-2">
                                <Link href={`events/${event.id}`}>
                                    <a>
                                        <Button variant="orange">
                                            View Preview
                                        </Button>
                                    </a>
                                </Link>

                                <Link href={`events/${event.id}/settings`}>
                                    <a>
                                        <Button variant="black">
                                            Settings
                                        </Button>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default EventsPage;
