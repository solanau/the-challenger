import { DocumentData, QueryDocumentSnapshot, collection, onSnapshot, query, where } from 'firebase/firestore';
import * as _ from 'lodash';
import { useEffect, useState } from 'react';
import { ReviewStatus } from 'types/challenge';
import { EventPayload } from 'types/event';
import { UserPayload } from 'types/user';
import { firestore } from 'utils/firebase';

export type EventFilters = Partial<{
    user: UserPayload;
    includePublic: boolean;
    userEventsStatus?: ReviewStatus;
}>;

export const useEvents = (
    filters?: EventFilters
): EventPayload[] => {
    const [events, setEvents] = useState<EventPayload[]>([]);
    const { user, includePublic = false, userEventsStatus = 'approved' } = filters

    useEffect(() => {
        const versionConstraint = where('version', '==', 1)

        const aggregatedEvents = []

        if (!user) return

        // console.log('user.isAdmin', user.isAdmin)
        // console.log('includePublic', includePublic)
        console.log('userEventsStatus', userEventsStatus)

        const setAllEvents = (eventsData: Array<QueryDocumentSnapshot<DocumentData>>) => {
            const allEvents = eventsData.map(
                doc =>
                ({
                    id: doc.id,
                    ...doc.data(),
                } as EventPayload),
            )
            allEvents.forEach(x => aggregatedEvents.push(x))
            console.log('aggregatedEvents', aggregatedEvents)
            setEvents(
                _.clone(aggregatedEvents)
            );
        }

        const userEventsStatusConstraints =
            userEventsStatus == '' ?
                [] : [where('reviewStatus', '==', userEventsStatus)]



        const unsubscribeOnlyUser = !user.isAdmin ? onSnapshot(
            query(
                collection(firestore, `events`),
                versionConstraint,
                where('userId', '==', user.id),
                ...userEventsStatusConstraints
            ),
            querySnapshot => {
                console.log('unsubscribeOnlyUser', querySnapshot.docs)
                if (!querySnapshot.empty) {
                    setAllEvents(querySnapshot.docs)
                } else {
                    setAllEvents([])
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
                console.log('unsubscribePublicNotFromUser', querySnapshot.docs)
                if (!querySnapshot.empty) {
                    setAllEvents(querySnapshot.docs)
                } else {
                    setAllEvents([])
                }
            },
        ) : null;

        const unsubscribeAdmin = user.isAdmin ? onSnapshot(
            query(
                collection(firestore, `events`),
                versionConstraint,
            ),
            querySnapshot => {
                console.log('unsubscribeAdmin', querySnapshot.docs)
                if (!querySnapshot.empty) {
                    setAllEvents(querySnapshot.docs)
                } else {
                    setAllEvents([])
                }
            },
        ) : null;


        return () => {
            if (unsubscribeOnlyUser) unsubscribeOnlyUser()
            if (unsubscribePublicNotFromUser) unsubscribePublicNotFromUser()
            if (unsubscribeAdmin) unsubscribeAdmin()
        };
    }, [filters.includePublic, filters.user, filters.userEventsStatus]);

    return events;
};
