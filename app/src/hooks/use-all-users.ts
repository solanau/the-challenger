import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { UserPayload } from 'types/user';
import { firestore } from 'utils/firebase';

export const useAllUsers = (): UserPayload[] => {
    const [allUsers, setAllUsers] = useState<UserPayload[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(firestore, 'users')),
            querySnapshot => {
                if (querySnapshot.empty) {
                    setAllUsers([]);
                } else {
                    setAllUsers(
                        querySnapshot.docs.map(
                            doc =>
                                ({
                                    id: doc.id,
                                    ...doc.data(),
                                } as UserPayload),
                        ),
                    );
                }
            },
        );
        return () => unsubscribe();
    }, []);

    return allUsers;
};
