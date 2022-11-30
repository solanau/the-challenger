import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { UserPayload } from 'types/user';
import { firestore } from 'utils/firebase';

export const useUser = (userId: string | null): UserPayload | null => {
    const [user, setUser] = useState<UserPayload>(null);

    useEffect(() => {
        if (userId === null) {
            setUser(null);
            return;
        }

        const unsubscribe = onSnapshot(
            doc(firestore, `users/${userId}`),
            snapshot => {
                const data = snapshot.data();

                if (!data) {
                    setUser(null);
                } else {
                    setUser({
                        id: snapshot.id,
                        ...data,
                    } as UserPayload);
                }
            },
        );

        return () => unsubscribe();
    }, [userId]);

    return user;
};
