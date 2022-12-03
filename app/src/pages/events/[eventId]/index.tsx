import HeroSection from 'components/event-page/hero-section';
import { useEvent } from 'hooks/use-event';
import { GetServerSideProps, NextPage } from 'next';

type EventPageProps = {
    eventId: string;
};

const EventPage: NextPage<EventPageProps> = ({ eventId }) => {
    const event = useEvent(eventId);

    return (
        <>
            <HeroSection
                title={event?.title ?? ''}
                description={event?.description ?? ''}
            />
        </>
    );
};

export default EventPage;

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
