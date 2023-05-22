import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { EventPayload } from 'types/event';
import { firestore } from 'utils/firebase';

export const useEvents = (): EventPayload[] => {
    const [events, setEvents] = useState<EventPayload[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(firestore, `events`), where('version', '==', 1), orderBy('startDate', 'desc')),
            querySnapshot => {
                if (querySnapshot.empty) {
                    setEvents([]);
                } else {
                    setEvents(
                        querySnapshot.docs.map(
                            doc =>
                            ({
                                id: doc.id,
                                ...doc.data(),
                            } as EventPayload),
                        ),
                    );
                }
            },
        );

        return () => unsubscribe();
    }, []);

    return events;
};
