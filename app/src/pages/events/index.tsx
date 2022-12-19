import Button from 'components/common/button';
import Modal from 'components/common/modal';
import Text from 'components/common/text';
import CreateEventForm from 'components/events-page/create-event-form';
import EventsPreviewComponent from 'components/events-page/events-preview-page';
import { Formik } from 'formik';
import { useEvents } from 'hooks/use-events';
import { createEvent } from 'lib/api';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { useState } from 'react';
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

            <EventsPreviewComponent events={events} user={user} />
        </>
    );
};

export default EventsPage;
