import ActiveChallengesSection from 'components/challenges-page/active-challenges-section';
import ExpiredChallengesSection from 'components/challenges-page/expired-challenges-section';
import PendingChallengesSection from 'components/challenges-page/pending-challenges-section';
import { fetchChallengesForEvent, fetchSubmissionsForUsername } from 'lib/api';
import { getCurrentUser } from 'lib/github';
import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { NextSeo } from 'next-seo';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { ChallengeView } from 'types/challenge';
import {
    isActiveChallenge,
    isExpiredChallenge,
    isPendingChallenge,
    toChallenge_Firebase
} from 'utils/challenge';

type ChallengesPageProps = {
    challenges: ChallengeView[];
};

const ChallengesPage: NextPage<ChallengesPageProps> = ({ challenges }) => (
    <>
        <NextSeo
            title="Solana Bounty Challenges"
            description="Complete the Solana challenges to collect Solana rewards!"
        ></NextSeo>

        {/* <p>Event Pubkey: x</p> */}

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

export default ChallengesPage;

export const getServerSideProps: GetServerSideProps = async context => {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions,
    );
    const accessToken = session?.accessToken as string;

    const user = await getCurrentUser(accessToken);
    const userSubmissions = await fetchSubmissionsForUsername(user.login);

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
