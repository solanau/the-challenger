import HeroSection from 'components/event-page/hero-section';
import { useEvent } from 'hooks/use-event';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { useEffect, useState } from 'react';

const EventPage: NextPage = () => {
    const router = useRouter();
    const eventId =
        (router.query.eventId instanceof Array
            ? router.query.eventId[0]
            : router.query.eventId) ?? null;

    const { user } = useAuth();
    const [render, setRender] = useState(false)
    const event = useEvent(eventId);

    useEffect(() => {
        if (event) {
            if (event.reviewStatus == 'approved') {
                setRender(true)
            } else {
                if (event.userId == (user && user.id)) {
                    setRender(true)
                } else if ((user && user.id) in event.managers) {
                    setRender(true)
                } else if ((user && user.id) in event.reviewers) {
                    setRender(true)
                }
            }
        }
    })

    return (
        render ? <>
            <Head>
                <title>{event?.title ?? ''} - The Challenger</title>
            </Head>
            <HeroSection
                eventId={eventId}
                title={event?.title ?? ''}
                body={event?.body ?? ''}
            />
        </> : null
    );
};

export default EventPage;
