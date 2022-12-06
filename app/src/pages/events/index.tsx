/* eslint-disable react/no-unescaped-entities */
import { useWallet } from '@solana/wallet-adapter-react';
import Button from 'components/common/button';
import Card from 'components/common/card';
import Modal from 'components/common/modal';
import Text from 'components/common/text';
import CreateEventForm from 'components/events/forms/create-event-form';
import { useEvents } from 'hooks/use-events';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { TbPlus, TbWallet } from 'react-icons/tb';

const EventsPage: NextPage = () => {
    const { publicKey } = useWallet();

    const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
    const events = useEvents();

    return (
        <>
            <div className="flex w-full flex-col flex-wrap gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                <Text variant="big-heading">Events</Text>
                <Text variant="paragraph">
                    Explore events and start competing
                </Text>

                {publicKey ? (
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
                                    for participants to compete"
                            isOpen={isCreateEventModalOpen}
                            onClose={() => setIsCreateEventModalOpen(false)}
                        >
                            <CreateEventForm
                                setIsCreateEventModalOpen={
                                    setIsCreateEventModalOpen
                                }
                            ></CreateEventForm>
                        </Modal>
                    </div>
                ) : (
                    <div>
                        <Button
                            icon={TbWallet}
                            text={'Connect wallet to create Event'}
                            variant="transparent"
                            className="bg-zinc-700"
                        ></Button>
                    </div>
                )}
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
