import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { SponsorPayload } from 'types/sponsor';
import { firestore } from 'utils/firebase';

export const useSponsors = (): SponsorPayload[] => {
    const [sponsors, setSponsors] = useState<SponsorPayload[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(firestore, `sponsors`)),
            querySnapshot => {
                if (querySnapshot.empty) {
                    setSponsors([]);
                } else {
                    setSponsors(
                        querySnapshot.docs.map(
                            doc =>
                                ({
                                    id: doc.id,
                                    ...doc.data(),
                                } as SponsorPayload),
                        ),
                    );
                }
            },
        );

        return () => unsubscribe();
    }, []);

    return sponsors;
};
