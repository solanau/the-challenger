import { collection, onSnapshot, query } from 'firebase/firestore';
import { useAuth } from 'providers/AuthProvider';
import { useEffect, useState } from 'react';
import { ChallengePayload } from 'types/api';
import { toChallengeFirebase } from 'utils/challenge';
import { firestore } from 'utils/firebase';
import { useSubmissions } from './use-submissions';

export const useChallenges = (eventId: string) => {
    const [challenges, setChallenges] = useState([]);
    const { user } = useAuth();
    const submissions = useSubmissions(eventId, { userId: user.uid });

    useEffect(
        () =>
            onSnapshot(
                query(collection(firestore, 'challenges')),
                querySnapshot => {
                    if (querySnapshot.empty) {
                        setChallenges([]);
                    } else {
                        setChallenges(
                            querySnapshot.docs
                                .map(doc =>
                                    toChallengeFirebase(submissions, {
                                        uid: doc.id,
                                        ...doc.data(),
                                    } as ChallengePayload),
                                )
                                .sort((a, b) => (a.key > b.key ? 1 : -1)),
                        );
                    }
                },
            ),
        [submissions],
    );

    return challenges;
};
