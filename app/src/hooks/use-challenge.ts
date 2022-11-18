import { doc, onSnapshot } from 'firebase/firestore';
import { useAuth } from 'providers/AuthProvider';
import { useEffect, useState } from 'react';
import { ChallengePayload } from 'types/api';
import { ChallengeView } from 'types/challenge';
import { toChallengeFirebase } from 'utils/challenge';
import { firestore } from 'utils/firebase';
import { useSubmissions } from './use-submissions';

export const useChallenge = (challengeId: string) => {
    const { user } = useAuth();
    const submissions = useSubmissions({ userId: user.uid });
    const [challenge, setChallenge] = useState<ChallengeView | null>(null);

    useEffect(
        () =>
            onSnapshot(
                doc(firestore, `challenges/${challengeId}`),
                snapshot => {
                    setChallenge(
                        toChallengeFirebase(submissions, {
                            uid: snapshot.id,
                            ...snapshot.data(),
                        } as ChallengePayload),
                    );
                },
            ),
        [challengeId, submissions],
    );

    return challenge;
};
