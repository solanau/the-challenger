import ActiveChallengesSection from 'components/challenges-page/active-challenges-section';
import ExpiredChallengesSection from 'components/challenges-page/expired-challenges-section';
import PendingChallengesSection from 'components/challenges-page/pending-challenges-section';
import { useChallenges } from 'hooks/use-challenges';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { ChangeEvent, useMemo, useState } from 'react';
import {
    isActiveChallenge,
    isExpiredChallenge,
    isPendingChallenge,
} from 'utils/challenge';

const ChallengesPage: NextPage = () => {
    const challenges = useChallenges(
        process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_EVENT_ID,
    );
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
                <>
                    <div>
                        <select
                            name="category-list"
                            id="category-list"
                            onChange={handleCategoryChange}
                            className="rounded-md border-2 border-white bg-transparent px-4 py-2 text-white"
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
                    <div className="flex w-full flex-row flex-wrap gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                        <ActiveChallengesSection
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
                            challenges={filteredChallenges.filter(
                                isExpiredChallenge,
                            )}
                        />
                    </div>
                </>
            ) : (
                <div className="flex h-20 items-center justify-center">
                    <p className="text-secondary">No challenges found.</p>
                </div>
            )}
        </>
    );
};

export default ChallengesPage;
