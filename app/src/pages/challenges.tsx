import ActiveChallengesSection from 'components/challenges-page/active-challenges-section';
import ExpiredChallengesSection from 'components/challenges-page/expired-challenges-section';
import PendingChallengesSection from 'components/challenges-page/pending-challenges-section';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useAuth } from 'providers/AuthProvider';
import { useEffect, useMemo, useState } from 'react';
import {
    isActiveChallenge,
    isExpiredChallenge,
    isPendingChallenge,
    toChallengeFirebase,
} from 'utils/challenge';
import { firestore } from 'utils/firebase';

const ChallengesPage: NextPage = () => {
    const { user } = useAuth();
    const [challengesPayload, setChallengesPayload] = useState([]);
    const [submissions, setSubmissions] = useState([]);

    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(firestore, 'challenges'),
                    where(
                        'eventPubkey',
                        '==',
                        process.env
                            .NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_EVENT_PUBKEY,
                    ),
                ),
                querySnapshot => {
                    setChallengesPayload(
                        querySnapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data(),
                        })),
                    );
                },
            ),
        [],
    );

    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(firestore, 'submissions'),
                    where('userId', '==', user.uid),
                ),
                querySnapshot => {
                    setSubmissions(
                        querySnapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data(),
                        })),
                    );
                },
            ),
        [user],
    );

    const challenges = useMemo(
        () =>
            challengesPayload
                .map(c => toChallengeFirebase(submissions, c))
                .sort((a, b) => (a.key > b.key ? 1 : -1)),
        [submissions, challengesPayload],
    );

    return (
        <>
            <NextSeo
                title="Solana Bounty Challenges"
                description="Complete the Solana challenges to collect Solana rewards!"
            ></NextSeo>

            {challenges.length > 0 ? (
                <div className="flex w-full flex-row flex-wrap gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                    <ActiveChallengesSection
                        challenges={challenges.filter(isActiveChallenge)}
                    />

                    <PendingChallengesSection
                        challenges={challenges.filter(isPendingChallenge)}
                    />

                    <ExpiredChallengesSection
                        challenges={challenges.filter(isExpiredChallenge)}
                    />
                </div>
            ) : (
                <div className="flex h-20 items-center justify-center">
                    <p className="text-secondary">No challenges found.</p>
                </div>
            )}
        </>
    );
};

export default ChallengesPage;
