import HeroSection from 'components/event-page/hero-section';
import { useEvent } from 'hooks/use-event';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';

const EventPage: NextPage = () => {
    const router = useRouter();
    const eventId =
        (router.query.eventId instanceof Array
            ? router.query.eventId[0]
            : router.query.eventId) ?? null;

    const { user } = useAuth();
    const event = useEvent(eventId);

    return (
        <>
            <Head>
                <title>{event?.title ?? ''} - The Challenger</title>
            </Head>
            <HeroSection
                eventId={eventId}
                title={event?.title ?? ''}
                body={event?.body ?? ''}
            />
        </>
    );
};

export default EventPage;
