import ActiveChallengesSection from 'components/challenges-page/active-challenges-section';
import ExpiredChallengesSection from 'components/challenges-page/expired-challenges-section';
import PendingChallengesSection from 'components/challenges-page/pending-challenges-section';
import { useChallenges } from 'hooks/use-challenges';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import {
    isActiveChallenge,
    isExpiredChallenge,
    isPendingChallenge,
} from 'utils/challenge';

const ChallengesPage: NextPage = () => {
    const challenges = useChallenges();

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
