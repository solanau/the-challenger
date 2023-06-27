import { DocumentData, QueryDocumentSnapshot, collection, onSnapshot, query, where } from 'firebase/firestore';
import * as _ from 'lodash';
import { useEffect, useState } from 'react';
import { EventPayload } from 'types/event';
import { UserPayload } from 'types/user';
import { firestore } from 'utils/firebase';

export type EventFilters = Partial<{
    user: UserPayload;
    includePublic: boolean
}>;

export const useEvents = (
    filters?: EventFilters
): EventPayload[] => {
    const [events, setEvents] = useState<EventPayload[]>([]);
    const { user, includePublic = false } = filters

    useEffect(() => {
        const versionConstraint = where('version', '==', 1)

        if (!user) return

        const setAllEvents = (eventsData: Array<QueryDocumentSnapshot<DocumentData>>) => {
            const allEvents = eventsData.map(
                doc =>
                ({
                    id: doc.id,
                    ...doc.data(),
                } as EventPayload),
            ).concat(events)
            setEvents(
                prevState =>
                    _.uniqWith(
                        _.orderBy(prevState.concat(allEvents), ['startDate'], ['desc']),
                        (a, b) => a.id == b.id
                    )
            );
        }


        const unsubscribeOnlyUser = !user.isAdmin ? onSnapshot(
            query(
                collection(firestore, `events`),
                versionConstraint,
                where('userId', '==', user.id)
            ),
            querySnapshot => {
                if (!querySnapshot.empty) {
                    setAllEvents(querySnapshot.docs)
                }
            },
        ) : null;

        const unsubscribePublicNotFromUser = (!user.isAdmin && includePublic) ? onSnapshot(
            query(
                collection(firestore, `events`),
                versionConstraint,
                where('userId', '!=', user.id),
                where('reviewStatus', '==', 'approved')
            ),
            querySnapshot => {
                if (!querySnapshot.empty) {
                    setAllEvents(querySnapshot.docs)
                }
            },
        ) : null;

        const unsubscribeAdmin = user.isAdmin ? onSnapshot(
            query(
                collection(firestore, `events`),
                versionConstraint,
            ),
            querySnapshot => {
                if (!querySnapshot.empty) {
                    setAllEvents(querySnapshot.docs)
                }
            },
        ) : null;

        return () => {
            if (unsubscribeOnlyUser) unsubscribeOnlyUser()
            if (unsubscribePublicNotFromUser) unsubscribePublicNotFromUser()
            if (unsubscribeAdmin) unsubscribeAdmin()
        };
    }, []);

    return events;
};
