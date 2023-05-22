import ActiveChallengesSection from 'components/challenges-page/active-challenges-section';
import ExpiredChallengesSection from 'components/challenges-page/expired-challenges-section';
import PendingChallengesSection from 'components/challenges-page/pending-challenges-section';
import { useEventChallenges } from 'hooks/use-event-challenges';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { ChangeEvent, useMemo, useState } from 'react';
import {
    isActiveChallenge,
    isExpiredChallenge,
    isPendingChallenge,
} from 'utils/challenge';

const ChallengesPage: NextPage = () => {
    const router = useRouter();
    const eventId =
        (router.query.eventId instanceof Array
            ? router.query.eventId[0]
            : router.query.eventId) ?? null;
    const { credential } = useAuth();
    const userId = credential?.id ?? null;
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
    const challenges = useEventChallenges(eventId, userId);

    const filteredChallenges = useMemo(() => {
        if (!challenges) {
            return [];
        }

        // Avoid filter when selectedCategory is null
        if (!selectedCategory && !selectedDifficulty) {
            return challenges;
        }

        return challenges.filter(challenge => {
            const filteredByCategory = 
                selectedCategory ? challenge.category == selectedCategory : true
            const filteredByDifficulty = 
                selectedDifficulty ? challenge.difficulty == selectedDifficulty : true

            return filteredByCategory && filteredByDifficulty 
        })

    }, [selectedCategory, selectedDifficulty, challenges]);

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    const handleDifficultyChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedDifficulty(event.target.value);
    }

    return (
        <>
            <NextSeo
                title="Challenges"
                description="Complete the challenges to collect rewards!"
            ></NextSeo>

            {challenges.length > 0 ? (
                <div className="flex flex-row flex-wrap gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-2 lg:px-32 lg:py-16 xl:px-4 xl:py-20">
                    <div className="flex flex-row flex-wrap gap-5 justify-center items-center">
                        <div className="h-128 w-80 sm:w-96 lg:w-1/2 xl:w-1/3 sm:max-w-xl flex-col justify-between gap-10 p-2">
                            <div className="mx-auto w-30 grid sm:max-w-7xl sm:items-end pb-3">
                                <span>Category</span>
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

                            <div className="mx-auto w-30 grid sm:max-w-7xl sm:items-center">
                                <span>Difficulty</span>
                                <select
                                    name="category-list"
                                    id="category-list"
                                    onChange={handleDifficultyChange}
                                    className="rounded-md border-2 border-white bg-transparent px-4 py-2 text-black"
                                >
                                    <option value="">All</option>
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                            </div>
                        </div>
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
