import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { User } from 'types/user';
import { firestore } from 'utils/firebase';

export const useUserByUserName = (userName: string | null) => {
    const [user, setUser] = useState<User>(null);

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
                    } as User);
                }
            },
        );

        return () => unsubscribe();
    }, [userName]);

    return user;
};
