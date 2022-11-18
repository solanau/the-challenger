import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from 'utils/firebase';

export const useUser = (userId: string | null) => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        if (userId === null) {
            setUser(null);
            return;
        }

        const unsubscribe = onSnapshot(
            doc(firestore, `users/${userId}`),
            snapshot => ({
                uid: snapshot.id,
                ...snapshot.data(),
            }),
        );

        return () => unsubscribe();
    }, [userId]);

    return user;
};
