import ActiveChallengesSection from 'components/challenges-page/active-challenges-section';
import ExpiredChallengesSection from 'components/challenges-page/expired-challenges-section';
import PendingChallengesSection from 'components/challenges-page/pending-challenges-section';
import { useEventChallenges } from 'hooks/use-event-challenges';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
    isActiveChallenge,
    isExpiredChallenge,
    isPendingChallenge
} from 'utils/challenge';

interface ButtonProps {
    label: string;
    onClick: () => void;
    isActive: boolean;
}

const DropdownMenu: React.FC<{ label: string; options: ButtonProps[] }> = ({
    label,
    options,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className="relative">
            <button
                className={`rounded-full bg-black text-white px-8 py-3 ${isOpen ? 'bg-gray-500' : ''}`}
                onClick={handleButtonClick}
            >
                {label}
            </button>
            {isOpen && (
                <div
                    className="absolute top-full transform -translate-x-1/2 left-1/2 w-max max-h-48 overflow-y-auto bg-black border border-white rounded-b-md shadow-lg z-10"
                    style={{ minWidth: '150px' }}
                    ref={dropdownRef}
                >
                    <div className="flex flex-col items-center">
                        {options.map((option) => (
                            <button
                                key={option.label}
                                className={`w-full px-4 py-2 text-white ${option.isActive ? 'bg-gray-800' : ''}`}
                                onClick={option.onClick}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};


const ChallengesPage: NextPage = () => {
    const router = useRouter();
    const eventId = (router.query.eventId instanceof Array ? router.query.eventId[0] : router.query.eventId) ?? null;
    const { credential } = useAuth();
    const userId = credential?.id ?? null;
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
    const challenges = useEventChallenges(eventId, userId);

    const filteredChallenges = useMemo(() => {
        if (!challenges) {
            return [];
        }

        if (!selectedCategory && !selectedDifficulty) {
            return challenges;
        }

        return challenges.filter((challenge) => {
            const filteredByCategory = selectedCategory ? challenge.category === selectedCategory : true;
            const filteredByDifficulty = selectedDifficulty ? challenge.difficulty === selectedDifficulty : true;

            return filteredByCategory && filteredByDifficulty;
        });
    }, [selectedCategory, selectedDifficulty, challenges]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    const handleDifficultyChange = (difficulty: string) => {
        setSelectedDifficulty(difficulty);
    };

    return (
        <>
            <NextSeo title="Challenges" description="Complete the challenges to collect rewards!" />

            {challenges.length > 0 ? (
                <div className="bg-gradient-to-tr from-primary to-secondary">
                    <div className="flex flex-row flex-wrap gap-5 p-5 sm:p-8 md:px-2 lg:px-32 lg:py-16 xl:px-4 xl:py-20 relative z-0">
                        <div className="flex items-center justify-center w-full gap-5">
                            <div className="flex flex-col justify-center">
                                <span className="text-white">Category</span>
                                <DropdownMenu
                                    label={selectedCategory || 'All'}
                                    options={[
                                        { label: 'All', onClick: () => handleCategoryChange(''), isActive: !selectedCategory },
                                        { label: 'Social', onClick: () => handleCategoryChange('Social'), isActive: selectedCategory === 'Social' },
                                        { label: 'Video', onClick: () => handleCategoryChange('Video'), isActive: selectedCategory === 'Video' },
                                        { label: 'Concept', onClick: () => handleCategoryChange('Concept'), isActive: selectedCategory === 'Concept' },
                                        { label: 'Wallet', onClick: () => handleCategoryChange('Wallet'), isActive: selectedCategory === 'Wallet' },
                                        { label: 'SDK', onClick: () => handleCategoryChange('SDK'), isActive: selectedCategory === 'SDK' },
                                        { label: 'Deploy', onClick: () => handleCategoryChange('Deploy'), isActive: selectedCategory === 'Deploy' },
                                        { label: 'Staking', onClick: () => handleCategoryChange('Staking'), isActive: selectedCategory === 'Staking' },
                                        { label: 'Game', onClick: () => handleCategoryChange('Game'), isActive: selectedCategory === 'Game' },
                                        { label: 'Client', onClick: () => handleCategoryChange('Client'), isActive: selectedCategory === 'Client' },
                                        { label: 'NFT', onClick: () => handleCategoryChange('NFT'), isActive: selectedCategory === 'NFT' },
                                    ]}
                                />
                            </div>

                            <div className="flex flex-col justify-center">
                                <span className="text-white">Difficulty</span>
                                <DropdownMenu
                                    label={selectedDifficulty || 'All'}
                                    options={[
                                        { label: 'All', onClick: () => handleDifficultyChange(''), isActive: !selectedDifficulty },
                                        { label: 'Easy', onClick: () => handleDifficultyChange('Easy'), isActive: selectedDifficulty === 'Easy' },
                                        { label: 'Medium', onClick: () => handleDifficultyChange('Medium'), isActive: selectedDifficulty === 'Medium' },
                                        { label: 'Hard', onClick: () => handleDifficultyChange('Hard'), isActive: selectedDifficulty === 'Hard' },
                                    ]}
                                />
                            </div>
                        </div>

                        <ActiveChallengesSection
                            eventId={eventId}
                            challenges={filteredChallenges.filter(isActiveChallenge)}
                        />

                        <PendingChallengesSection challenges={filteredChallenges.filter(isPendingChallenge)} />

                        <ExpiredChallengesSection
                            eventId={eventId}
                            challenges={filteredChallenges.filter(isExpiredChallenge)}
                        />
                    </div>
                </div>
            ) : (
                <div className="flex h-20 items-center justify-center">
                    <p className="text-white">No challenges found.</p>
                </div>
            )}
        </>
    );
};
export default ChallengesPage;
