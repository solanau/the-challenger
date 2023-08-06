import {
    collection,
    endAt,
    onSnapshot,
    orderBy,
    query,
    startAt
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from 'utils/firebase';

export const useUserIdsByUserName = (
    name: string,
): string[] | null => {
    const [userIds, setUserIds] = useState<string[]>([]);

    console.log('name.length', name.length)
    useEffect(() => {
        const unsubscribe = name.length > 0 ? onSnapshot(
            query(
                collection(firestore, 'users'),
                orderBy('fullName'),
                startAt(name),
                endAt(name + '\uf8ff'),
            ),
            querySnapshot => {
                if (!querySnapshot.empty) {

                    setUserIds(querySnapshot.docs.map(x => x.id));
                }
            },
        ) : setUserIds([]);

        return () => {
            if (unsubscribe) unsubscribe();
        }
    }, [name]);
    return userIds;
};
