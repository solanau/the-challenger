import ActiveChallengesSection from 'components/challenges-page/active-challenges-section';
import ExpiredChallengesSection from 'components/challenges-page/expired-challenges-section';
import PendingChallengesSection from 'components/challenges-page/pending-challenges-section';
import { fetchChallengesForEvent, fetchSubmissions } from 'lib/api';
import { getCurrentUser } from 'lib/github';
import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { NextSeo } from 'next-seo';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { useMemo, useState } from 'react';
import { ChallengeView } from 'types/challenge';
import {
    isActiveChallenge,
    isExpiredChallenge,
    isPendingChallenge,
    toChallenge_Firebase,
} from 'utils/challenge';

type ChallengesPageProps = {
    challenges: ChallengeView[];
};

const ChallengesPage: NextPage<ChallengesPageProps> = ({ challenges }) => {
    const [selectedCategory, setSelectedCategory] = useState();
    function getFilteredList() {
        // Avoid filter when selectedCategory is null
        if (!selectedCategory) {
            return challenges;
        }
        return challenges.filter(
            challenge => challenge.type === selectedCategory,
        );
    }
    var filteredList = useMemo(getFilteredList, [selectedCategory, challenges]);

    const handleCategoryChange = e => {
        setSelectedCategory(e.target.value);
    };
    return (
        <>
            <NextSeo
                title="Solana Bounty Challenges"
                description="Complete the Solana challenges to collect Solana rewards!"
            ></NextSeo>

            {/* <p>Event Pubkey: x</p> */}

            {challenges.length > 0 ? (
                <div className="flex w-full flex-row flex-wrap gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
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

                    <ActiveChallengesSection
                        challenges={filteredList.filter(isActiveChallenge)}
                    />

                    <PendingChallengesSection
                        challenges={filteredList.filter(isPendingChallenge)}
                    />

                    <ExpiredChallengesSection
                        challenges={filteredList.filter(isExpiredChallenge)}
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
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions,
    );
    const accessToken = session?.accessToken as string;

    const user = await getCurrentUser(accessToken);
    const userSubmissions = user
        ? await fetchSubmissions({ username: user.login })
        : [];

    const challengePayloads = await fetchChallengesForEvent();
    const challenges = (
        await Promise.all(
            challengePayloads.map(
                async c => await toChallenge_Firebase(userSubmissions, c),
            ),
        )
    ).sort((a, b) => (a.key > b.key ? 1 : -1));

    return {
        props: {
            challenges,
        },
    };
};
