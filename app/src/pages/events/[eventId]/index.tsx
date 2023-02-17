import HeroSection from 'components/event-page/hero-section';
import { useEvent } from 'hooks/use-event';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const EventPage: NextPage = () => {
    const router = useRouter();
    const eventId =
        (router.query.eventId instanceof Array
            ? router.query.eventId[0]
            : router.query.eventId) ?? null;
    const event = useEvent(eventId);

    return (
        <>
            <HeroSection
                eventId={eventId}
                title={event?.title ?? ''}
                body={event?.body ?? ''}
            />
        </>
    );
};

export default EventPage;
