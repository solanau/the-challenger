import { collection, onSnapshot, query } from 'firebase/firestore';
import { useAuth } from 'providers/AuthProvider';
import { useEffect, useState } from 'react';
import { ChallengePayload } from 'types/api';
import { ChallengeDto } from 'types/challenge';
import { toChallenge } from 'utils/challenge';
import { firestore } from 'utils/firebase';
import { useSubmissions } from './use-submissions';

export const useChallenges = (eventId: string): ChallengeDto[] => {
    const [challenges, setChallenges] = useState<ChallengeDto[]>([]);
    const { user } = useAuth();
    const submissions = useSubmissions(eventId, user.uid === null ? null :  { userId: user.uid });

    useEffect(
        () => {            
            const unsubscribe = onSnapshot(
                query(collection(firestore, 'challenges')),
                querySnapshot => {
                    if (querySnapshot.empty) {
                        setChallenges([]);
                    } else {
                        setChallenges(
                            querySnapshot.docs
                                .map(doc =>
                                    toChallenge(submissions, {
                                        uid: doc.id,
                                        ...doc.data(),
                                    } as ChallengePayload),
                                )
                                .sort((a, b) => (a.key > b.key ? 1 : -1)),
                        );
                    }
                },
            );

            return () => unsubscribe()
        },
        [submissions],
    );

    return challenges;
};
