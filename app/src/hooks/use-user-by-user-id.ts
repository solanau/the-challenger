import {
    collection,
    documentId,
    onSnapshot,
    query,
    where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { SubmissionPayload } from 'types/submission';
import { UserPayload } from 'types/user';
import { firestore } from 'utils/firebase';

export const useUserByUserId = (
    submission: SubmissionPayload,
): UserPayload | null => {
    const [user, setUser] = useState<UserPayload>(null);

    useEffect(() => {
        if (submission === null) {
            setUser(null);
            return;
        }

        const unsubscribe = onSnapshot(
            query(
                collection(firestore, 'users'),
                where(documentId(), '==', submission.userId),
            ),
            querySnapshot => {
                if (querySnapshot.empty) {
                    setUser(null);
                } else {
                    setUser({
                        id: querySnapshot.docs[0].id,
                        ...querySnapshot.docs[0].data(),
                    } as UserPayload);
                }
            },
        );

        return () => unsubscribe();
    }, [submission]);
    console.log('This is the user...', user);
    return user;
};
