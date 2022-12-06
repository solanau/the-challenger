import Text from 'components/common/text';
import EventSettingsForm from 'components/event-settings-page/event-settings-form';
import { Formik } from 'formik';
import { useChallenges } from 'hooks/use-challenges';
import { useEvent } from 'hooks/use-event';
import { updateEvent } from 'lib/api';
import { GetServerSideProps, NextPage } from 'next';
import { UpdateEventPayload } from 'types/event';
import { fromEventSettingsFormData } from 'utils/event';
import { dateToValue } from 'utils/time';

type EventSettingsPageProps = {
    eventId: string;
};

const EventSettingsPage: NextPage<EventSettingsPageProps> = ({
    eventId,
}: EventSettingsPageProps) => {
    const event = useEvent(eventId);
    const challenges = useChallenges({ version: 1, isNew: false });

    const handleUpdateEvent = (updateEventPayload: UpdateEventPayload) => {
        updateEvent(eventId, updateEventPayload)
            .then(() => alert('Event updated!'))
            .catch(error => alert(error));
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
                            startDate: event.startDate
                                ? dateToValue(event.startDate)
                                : '',
                            endDate: event.endDate
                                ? dateToValue(event.endDate)
                                : '',
                            challenges: event.challenges,
                            managers: event.managers?.join(', ') ?? '',
                            reviewers: event.reviewers?.join(', ') ?? '',
                        }}
                        onSubmit={values =>
                            handleUpdateEvent(fromEventSettingsFormData(values))
                        }
                    >
                        <EventSettingsForm
                            challenges={challenges}
                        ></EventSettingsForm>
                    </Formik>
                )}
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
