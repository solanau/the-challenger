import ActiveChallengesSection from 'components/challenges-page/active-challenges-section';
import ExpiredChallengesSection from 'components/challenges-page/expired-challenges-section';
import PendingChallengesSection from 'components/challenges-page/pending-challenges-section';
import {
    DRILL_BOUNTY_CHALLENGE_LABEL,
    getCurrentUser, getIssuesPagingUpgrade
} from 'lib/github';
import { mockChallenges } from 'mocks/challenges';
import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { NextSeo } from 'next-seo';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { ChallengeView } from 'types/challenge';
import {
    isActiveChallenge,
    isExpiredChallenge,
    isPendingChallenge,
    toChallenge
} from 'utils/challenge';

type ChallengesPageProps = {
    challenges: ChallengeView[];
};

const ChallengesPage: NextPage<ChallengesPageProps> = ({
    challenges: challenges,
}) => (
    <>
        <NextSeo
            title="Solana Bounty Challenges"
            description="Complete the Solana challenges to collect Solana rewards!"
        ></NextSeo>

        <p>Event Pubkey: x</p>

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

    const challenges = mockChallenges;
    const userIssues = user ? await getIssuesPagingUpgrade(
        `${DRILL_BOUNTY_CHALLENGE_LABEL},user:${user.login}`,
    ) : [];

    return {
        props: {
            challenges: await Promise.all(
                challenges.map(
                    async challenge => await toChallenge(userIssues, challenge),
                ),
            ),
        },
    };
};
