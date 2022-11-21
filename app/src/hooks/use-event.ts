import { doc, onSnapshot } from 'firebase/firestore';
import { useAuth } from 'providers/AuthProvider';
import { useEffect, useState } from 'react';
import { Event } from 'types/event';
import { firestore } from 'utils/firebase';
import { useSubmissions } from './use-submissions';

export const useEvent = (eventId: string | null) => {
    const { user } = useAuth();
    const submissions = useSubmissions({ userId: user.uid });
    const [event, setEvent] = useState<Event>(null);

    useEffect(() => {
        if (eventId === null) {
            setEvent(null);
            return;
        }

        const unsubscribe = onSnapshot(
            doc(firestore, `events/${eventId}`),
            snapshot => {
                const data = snapshot.data();

                console.log(data);

                if (!data) {
                    setEvent(null);
                } else {
                    setEvent({
                        id: snapshot.id,
                        ...data,
                    } as Event);
                }
            },
        );

        return () => unsubscribe();
    }, [eventId, submissions]);

    return event;
};
