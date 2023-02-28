import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { SubmissionPayload } from 'types/submission';
import { UserPayload } from 'types/user';
import { firestore } from 'utils/firebase';

export const useUserByUserId = (
    submission: SubmissionPayload,
): UserPayload | null => {
    const [user, setUser] = useState<UserPayload>(null);

    useEffect(() => {
        console.log('ENTER HERE', submission);
        if (submission === null) {
            setUser(null);
            return;
        }

        const unsubscribe = onSnapshot(
            query(
                collection(firestore, 'users'),
                where('Document ID', '==', submission.userId),
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

    return user;
};
