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
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
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
        <div className="relative flex flex-col items-center">

            <button
                className={`rounded-full bg-gray-800 text-white px-8 py-3 transition-all duration-300 ease-in-out ${isOpen ? 'bg-gray-600' : ''
                    }`}
                onClick={handleButtonClick}
            >
                {label}
            </button>
            <div
                className={`dropdown-menu absolute top-full transform left-0 w-auto max-h-48 overflow-y-auto bg-gray-900 border border-white rounded-b-md shadow-lg z-10 transition-all duration-300 ease-in-out ${isOpen ? 'scale-100 opacity-100 translate-y-2' : 'scale-95 opacity-0 translate-y-1'
                    }`}
                style={{ minWidth: '150px' }}
                ref={dropdownRef}
            >
                <div className="flex flex-wrap">
                    {options.map((option) => (
                        <button
                            key={option.label}
                            className={`w-full px-4 py-2 text-white transition-all duration-300 ease-in-out ${option.isActive ? 'bg-gray-700' : ''
                                }`}
                            onClick={option.onClick}
                        >
                            {option.isActive ? '✅ ' : ''}
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ChallengesPage: NextPage = () => {
    const router = useRouter();
    const eventId =
        (router.query.eventId instanceof Array
            ? router.query.eventId[0]
            : router.query.eventId) ?? null;
    const { credential } = useAuth();
    const userId = credential?.id ?? null;
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
    const challenges = useEventChallenges(eventId, userId);

    const filteredChallenges = useMemo(() => {
        if (!challenges) {
            return [];
        }

        if (selectedCategories.length === 0 && selectedDifficulties.length === 0) {
            return challenges;
        }

        return challenges.filter((challenge) => {
            const filteredByCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(challenge.category);
            const filteredByDifficulty =
                selectedDifficulties.length === 0 ||
                selectedDifficulties.includes(challenge.difficulty);

            return filteredByCategory && filteredByDifficulty;
        });
    }, [selectedCategories, selectedDifficulties, challenges]);

    const handleCategoryChange = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleDifficultyChange = (difficulty: string) => {
        if (selectedDifficulties.includes(difficulty)) {
            setSelectedDifficulties(
                selectedDifficulties.filter((d) => d !== difficulty)
            );
        } else {
            setSelectedDifficulties([...selectedDifficulties, difficulty]);
        }
    };

    return (
        <>
            <NextSeo
                title="Challenges"
                description="Complete the challenges to collect rewards!"
            />

            {challenges.length > 0 ? (
                <div className="bg-gradient-to-tr from-primary to-secondary">
                    <div className="flex flex-row flex-wrap gap-5 p-5 sm:p-8 md:px-2 lg:px-32 lg:py-16 xl:px-4 xl:py-20 relative z-0">
                        <div className="flex items-center justify-center w-full gap-5">
                            <div className="flex flex-col justify-center">
                                <span className="text-white font-bold text-xl">Category:</span>
                                <DropdownMenu
                                    label={
                                        selectedCategories.length > 0
                                            ? 'Selected Categories'
                                            : 'All Categories'
                                    }
                                    options={[
                                        {
                                            label: 'All Categories',
                                            onClick: () => setSelectedCategories([]),
                                            isActive: selectedCategories.length === 0,
                                        },
                                        {
                                            label: 'Social',
                                            onClick: () => handleCategoryChange('Social'),
                                            isActive: selectedCategories.includes('Social'),
                                        },
                                        {
                                            label: 'Video',
                                            onClick: () => handleCategoryChange('Video'),
                                            isActive: selectedCategories.includes('Video'),
                                        },
                                        {
                                            label: 'Concept',
                                            onClick: () => handleCategoryChange('Concept'),
                                            isActive: selectedCategories.includes('Concept'),
                                        },
                                        {
                                            label: 'Wallet',
                                            onClick: () => handleCategoryChange('Wallet'),
                                            isActive: selectedCategories.includes('Wallet'),
                                        },
                                        {
                                            label: 'SDK',
                                            onClick: () => handleCategoryChange('SDK'),
                                            isActive: selectedCategories.includes('SDK'),
                                        },
                                        {
                                            label: 'Deploy',
                                            onClick: () => handleCategoryChange('Deploy'),
                                            isActive: selectedCategories.includes('Deploy'),
                                        },
                                        {
                                            label: 'Staking',
                                            onClick: () => handleCategoryChange('Staking'),
                                            isActive: selectedCategories.includes('Staking'),
                                        },
                                        {
                                            label: 'Game',
                                            onClick: () => handleCategoryChange('Game'),
                                            isActive: selectedCategories.includes('Game'),
                                        },
                                        {
                                            label: 'Client',
                                            onClick: () => handleCategoryChange('Client'),
                                            isActive: selectedCategories.includes('Client'),
                                        },
                                        {
                                            label: 'NFT',
                                            onClick: () => handleCategoryChange('NFT'),
                                            isActive: selectedCategories.includes('NFT'),
                                        },
                                    ]}
                                />

                            </div>



                            <div className="flex flex-col justify-center">
                                <span className="text-white font-bold text-xl">Difficulty:</span>
                                <DropdownMenu
                                    label={
                                        selectedDifficulties.length > 0
                                            ? 'Selected Difficulties'
                                            : 'All Difficulties'
                                    }
                                    options={[
                                        {
                                            label: 'All Difficulties',
                                            onClick: () => setSelectedDifficulties([]),
                                            isActive: selectedDifficulties.length === 0,
                                        },
                                        {
                                            label: 'Easy',
                                            onClick: () => handleDifficultyChange('Easy'),
                                            isActive: selectedDifficulties.includes('Easy'),
                                        },
                                        {
                                            label: 'Medium',
                                            onClick: () => handleDifficultyChange('Medium'),
                                            isActive: selectedDifficulties.includes('Medium'),
                                        },
                                        {
                                            label: 'Hard',
                                            onClick: () => handleDifficultyChange('Hard'),
                                            isActive: selectedDifficulties.includes('Hard'),
                                        },
                                    ]}
                                />

                            </div>

                        </div>
                        <ActiveChallengesSection
                            eventId={eventId}
                            challenges={filteredChallenges.filter(isActiveChallenge)}
                        />

                        <PendingChallengesSection
                            challenges={filteredChallenges.filter(isPendingChallenge)}
                        />

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
