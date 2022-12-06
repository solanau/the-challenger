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
                <div className="flex w-full flex-row flex-wrap gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                    {/* <div className="flex w-full text-center rounded-lg justify-end">

                        <Text variant="paragraph" className="flex items-center mr-4">
                        Challenges:
                        </Text>

                        <select
                            name="category-list"
                            id="category-list"
                            onChange={handleCategoryChange}
                            // className="rounded-md border-2 border-white bg-transparent px-4 py-2 text-black"
                            // className="flex bg-gradient-to-tl rounded-md border-2 border-white h-12 w-32 from-[#ef3c11] via-[#fdb735] to-[#ffeb3a]" from-primary/75 to-secondary/75 e37542 F64B62
                            className="flex w-48 self-end flex-row bg-white-50 border text-lg border-gray-300 text-primary rounded-lg focus:ring-orange-500 ring-orange-500 focus:border-slate-100 p-2.5 dark:bg-[#F64B62] dark:border-white dark:placeholder-orange-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-slate-100"
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
                    </div> */}
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
            ) : (
                <div className="flex h-20 items-center justify-center">
                    <p className="text-secondary">No challenges found.</p>
                </div>
            )}
        </>
    );
};

export default ChallengesPage;
