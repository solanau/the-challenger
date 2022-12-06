import ActiveChallengesSection from 'components/challenges-page/active-challenges-section';
import ExpiredChallengesSection from 'components/challenges-page/expired-challenges-section';
import PendingChallengesSection from 'components/challenges-page/pending-challenges-section';
import { useChallengesByIds } from 'hooks/use-challenges-by-ids';
import { useEvent } from 'hooks/use-event';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { ChangeEvent, useMemo, useState } from 'react';
import {
    isActiveChallenge,
    isExpiredChallenge,
    isPendingChallenge,
} from 'utils/challenge';

type ChallengesPageProps = {
    eventId: string;
};

const ChallengesPage: NextPage<ChallengesPageProps> = ({ eventId }) => {
    const event = useEvent(eventId);
    const challenges = useChallengesByIds(event?.challenges ?? []);

    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const filteredChallenges = useMemo(() => {
        // Avoid filter when selectedCategory is null
        if (!selectedCategory) {
            return challenges;
        }
        return challenges.filter(
            challenge => challenge.type === selectedCategory,
        );
    }, [selectedCategory, challenges]);

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <>
            <NextSeo
                title="Solana Bounty Challenges"
                description="Complete the Solana challenges to collect Solana rewards!"
            ></NextSeo>

            {challenges.length > 0 ? (
                <div className="flex w-full flex-row flex-wrap gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                    <div>
                        <select
                            name="category-list"
                            id="category-list"
                            onChange={handleCategoryChange}
                            className="rounded-md border-2 border-white bg-transparent px-4 py-2 text-black"
                        >
                            <option value="">All</option>
                            <option value="Social">Social</option>
                            <option value="Video">Video</option>
                            <option value="Concept">Concept</option>
                            <option value="Wallet">Wallet</option>
                            <option value="SDK">SDK</option>
                            <option value="Deploy">Deploy</option>
                            <option value="Staking">Staking</option>
                            <option value="Game">Game</option>
                            <option value="Client">Client</option>
                            <option value="NFT">NFT</option>
                        </select>
                    </div>
                    <ActiveChallengesSection
                        eventId={eventId}
                        challenges={filteredChallenges.filter(
                            isActiveChallenge,
                        )}
                    />

                    <PendingChallengesSection
                        challenges={filteredChallenges.filter(
                            isPendingChallenge,
                        )}
                    />

                    <ExpiredChallengesSection
                        eventId={eventId}
                        challenges={filteredChallenges.filter(
                            isExpiredChallenge,
                        )}
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

export const getServerSideProps: GetServerSideProps = async context => {
    let eventId = context.params.eventId;
    if (eventId instanceof Array) {
        eventId = eventId[0];
    }

    return {
        props: {
            eventId,
        },
    };
};