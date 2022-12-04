/* eslint-disable react/no-unescaped-entities */
import Button from 'components/common/button';
import Card from 'components/common/card';
import Text from 'components/common/text';
import EditEventForm from 'components/events-page/edit-event-form';
import { Formik } from 'formik';
import { useChallenges } from 'hooks/use-challenges';
import { useEvent } from 'hooks/use-event';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { EditEventPayload } from 'types/event';

type EventSettingsPageProps = {
    eventId: string;
};

const EventSettingsPage: NextPage<EventSettingsPageProps> = ({
    eventId,
}: EventSettingsPageProps) => {
    const event = useEvent(eventId);
    const challenges = useChallenges();
    const [title, setTitle] = useState(event?.title ?? '');
    const [description, setDescription] = useState(event?.description ?? '');

    const handleEventChanges = (data: EditEventPayload) => {
        setTitle(data.title);
        setDescription(data.description);
    };

    const handleSaveChanges = () => {
        console.log({ title, description });
    };

    return (
        <>
            <div className="flex w-full flex-col gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                <Text variant="big-heading">Event Settings</Text>

                <Text variant="paragraph">
                    Adapt the event to your needs, customize it as much as you
                    want. Once the event is published, no more changes can be
                    issued.
                </Text>
            </div>

            <div className="flex w-full flex-col gap-5 bg-gradient-to-tr p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                {event && (
                    <Formik
                        initialValues={{
                            title: event.title,
                            description: event.description,
                        }}
                        onSubmit={() => null}
                    >
                        <EditEventForm
                            onChange={handleEventChanges}
                        ></EditEventForm>
                    </Formik>
                )}

                <div className="flex w-full flex-row flex-wrap gap-5">
                    {challenges.map(challenge => (
                        <Card
                            key={challenge.id}
                            className="flex min-w-fit flex-1 flex-col justify-between gap-10 p-12"
                        >
                            <div className="flex flex-col gap-5">
                                <Text
                                    className="min-w-fit"
                                    variant="big-heading"
                                >
                                    {challenge.title}
                                </Text>
                                <Text variant="paragraph">
                                    {challenge.description}
                                </Text>
                            </div>
                        </Card>
                    ))}
                </div>

                <div>
                    <Button variant="orange" onClick={handleSaveChanges}>
                        Save changes
                    </Button>
                </div>
            </div>
        </>
    );
};

export default EventSettingsPage;

export const getServerSideProps: GetServerSideProps = async context => {
    let eventId = context.params.eventId;
    if (eventId instanceof Array) {
        eventId = eventId[0];
    }

    return {
        props: {
            eventId,
        },
    };
};
