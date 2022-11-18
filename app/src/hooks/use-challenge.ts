import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ChallengePayload } from 'types/api';
import { ChallengeView } from 'types/challenge';
import { toChallengeFirebase } from 'utils/challenge';
import { firestore } from 'utils/firebase';
import { useUserSubmissions } from './use-user-submissions';

export const useChallenge = (challengeId: string) => {
    const submissions = useUserSubmissions();
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
