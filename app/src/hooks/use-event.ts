import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useAuth } from 'providers/AuthProvider';
import { useEffect, useState } from 'react';
import { EventPayload } from 'types/event';
import { UserPayload } from 'types/user';
import { firestore } from 'utils/firebase';
import { useSubmissions } from './use-submissions';

export const useEvent = (eventId: string | null, user: UserPayload | null): EventPayload | null => {
    const { credential } = useAuth();
    const userId = credential?.id ?? null;
    const submissions = useSubmissions(eventId, { userId: userId });
    const [event, setEvent] = useState<EventPayload>(null);

    useEffect(() => {
        if (eventId === null || user == null) {
            setEvent(null);
            return;
        }
        const whereFilters = [where('__name__', '==', eventId)];

        const unsubscribe = onSnapshot(
            query(collection(firestore, `events`), ...whereFilters),
            snapshot => {
                if (snapshot.docs.length == 0) {
                    setEvent(null);
                } else {
                    const doc = snapshot.docs[0]
                    const data = doc.data()
                    setEvent({
                        id: doc.id,
                        ...data,
                    } as EventPayload);
                }
            },
        );

        return () => unsubscribe();
    }, [eventId, submissions]);

    return event;
};
