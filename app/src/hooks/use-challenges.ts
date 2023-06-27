import { DocumentData, QueryDocumentSnapshot, collection, onSnapshot, query, where } from 'firebase/firestore';
import * as _ from 'lodash';
import { useEffect, useState } from 'react';
import { ChallengePayload } from 'types/challenge';
import { UserPayload } from 'types/user';
import { firestore } from 'utils/firebase';

export type ChallengeFilters = Partial<{
    isNew: boolean;
    version: number;
    user: UserPayload;
    includePublic: boolean;
}>;

export const useChallenges = (
    filters?: ChallengeFilters,
): ChallengePayload[] => {
    const [challenges, setChallenges] = useState<ChallengePayload[]>([]);
    const { isNew = false, version, user, includePublic = false } = filters

    useEffect(() => {
        const constraints = _.filter([
            where("isNew", "==", isNew),
            includePublic ? where('reviewStatus', '==', 'approved') : null
        ], x => x != null);

        if (!user) return

        const setAllChallenges = (eventsData: Array<QueryDocumentSnapshot<DocumentData>>) => {
            const allChallenges = eventsData.map(
                doc =>
                ({
                    id: doc.id,
                    ...doc.data(),
                } as ChallengePayload),
            )
            setChallenges(
                prevState =>
                    _.uniqWith(
                        _.orderBy(prevState.concat(allChallenges), ['createdAt'], ['desc']),
                        (a, b) => a.id == b.id
                    )
            );
        }


        const unsubscribeOnlyUser = !user.isAdmin ? onSnapshot(
            query(
                collection(firestore, `challenges`),
                ...constraints,
                where('userId', '==', user.id),
            ),
            querySnapshot => {
                if (!querySnapshot.empty) {
                    setAllChallenges(querySnapshot.docs)
                }
            },
        ) : null;

        const unsubscribePublicNotFromUser = (!user.isAdmin && includePublic) ? onSnapshot(
            query(
                collection(firestore, `challenges`),
                ...constraints,
                where('userId', '!=', user.id),
            ),
            querySnapshot => {
                if (!querySnapshot.empty) {
                    setAllChallenges(querySnapshot.docs)
                }
            },
        ) : null;

        const unsubscribeAdmin = user.isAdmin ? onSnapshot(
            query(
                collection(firestore, `challenges`),
                ...constraints,
            ),
            querySnapshot => {
                if (!querySnapshot.empty) {
                    setAllChallenges(querySnapshot.docs)
                }
            },
        ) : null;

        return () => {
            if (unsubscribeOnlyUser) unsubscribeOnlyUser()
            if (unsubscribePublicNotFromUser) unsubscribePublicNotFromUser()
            if (unsubscribeAdmin) unsubscribeAdmin()
        }
    }, [isNew, version, user]);

    return challenges;
};
