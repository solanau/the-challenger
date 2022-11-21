import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { User } from 'types/user';
import { firestore } from 'utils/firebase';

export const useUser = (userId: string | null) => {
    const [user, setUser] = useState<User>(null);

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
                    } as User);
                }
            },
        );

        return () => unsubscribe();
    }, [userId]);

    return user;
};
