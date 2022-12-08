import { doc, onSnapshot } from 'firebase/firestore';
import { useAuth } from 'providers/AuthProvider';
import { useEffect, useState } from 'react';
import { EventPayload } from 'types/event';
import { firestore } from 'utils/firebase';
import { useSubmissions } from './use-submissions';

export const useEvent = (eventId: string | null): EventPayload | null => {
    const {
        credential: { uid: userId },
    } = useAuth();
    const submissions = useSubmissions(eventId, { userId: userId });
    const [event, setEvent] = useState<EventPayload>(null);

    useEffect(() => {
        if (eventId === null) {
            setEvent(null);
            return;
        }

        const unsubscribe = onSnapshot(
            doc(firestore, `events/${eventId}`),
            snapshot => {
                const data = snapshot.data();

                if (!data) {
                    setEvent(null);
                } else {
                    setEvent({
                        id: snapshot.id,
                        ...data,
                    } as EventPayload);
                }
            },
        );

        return () => unsubscribe();
    }, [eventId, submissions]);

    return event;
};
