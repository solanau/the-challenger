import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { UserPayload } from 'types/user';
import { firestore } from 'utils/firebase';

export const useUserByUserName = (
    userName: string | null,
): UserPayload | null => {
    const [user, setUser] = useState<UserPayload>(null);

    useEffect(() => {
        if (userName === null) {
            setUser(null);
            return;
        }

        const unsubscribe = onSnapshot(
            query(
                collection(firestore, 'users'),
                where('userName', '==', userName),
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
    }, [userName]);

    return user;
};
