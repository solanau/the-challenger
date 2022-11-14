import Button from 'components/common/button';
import NavElement from 'components/common/layout/header/nav-element';
import Text from 'components/common/text';
import Hero from 'components/profile-page/hero';
import { DRILL_BOUNTY_CHALLENGE_LABEL, getCurrentUser, getIssuesPagingUpgrade } from 'lib/github';
import { getUser } from 'lib/user';
import { mockChallenges } from 'mocks/challenges';
import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { MdAdd } from 'react-icons/md';
import { ChallengeDto } from 'types/challenge';
import { User } from 'types/user';
import { getSubmittedChallengesForUserWithStatus } from 'utils/challenge';

import ChallengeList from 'components/common/challenge-list';
import { authOptions } from './api/auth/[...nextauth]';

type ProfilePageProps = {
    completedChallenges: ChallengeDto[],
    incorrectChallenges: ChallengeDto[],
    invalidChallenges: ChallengeDto[],
    pendingChallenges: ChallengeDto[],
    user: User & { isCurrentUser: boolean };
};

const ProfilePage: NextPage<ProfilePageProps> = ({
    completedChallenges: completedChallenges,
    incorrectChallenges: incorrectChallenges,
    invalidChallenges: invalidChallenges,
    pendingChallenges: pendingChallenges,
    user: user,
}) => {

    const tabs = useMemo(
        () => [
            {
                content: (
                    <ChallengeList
                        challenges={completedChallenges}
                        key="completed-challenges"
                    />
                ),
                id: 'completed',
                label: 'Completed',
                amount: completedChallenges.length,
            },
            {
                content: (
                    <ChallengeList
                        challenges={incorrectChallenges}
                        key="incorrect-challenges"
                    />
                ),
                id: 'incorrect',
                label: 'Incorrect',
                amount: incorrectChallenges.length,
            },
            {
                content: (
                    <ChallengeList
                        challenges={invalidChallenges}
                        key="invalid-challenges"
                    />
                ),
                id: 'invalid',
                label: 'Invalid',
                amount: invalidChallenges.length,
            },
            {
                content: (
                    <ChallengeList
                        challenges={pendingChallenges}
                        key="pending-challenges"
                    />
                ),
                id: 'pending',
                label: 'Pending',
                amount: pendingChallenges.length,
            },
            
        ],
        [completedChallenges, incorrectChallenges, invalidChallenges, pendingChallenges],
    );

    const { username } = user;

    const router = useRouter();
    const currentTabId = (router.query.tab as string) || tabs[0].id;

    const currentTab = useMemo(
        () => tabs.find(tab => tab.id === currentTabId),
        [currentTabId, tabs],
    );

    return (
        <>
            <NextSeo
                title={username}
                description="Build your profile to contribute in style."
            ></NextSeo>
            <div>
                <div className="flex flex-col gap-16 ">
                    <Hero {...user} />
                    <div className="flex flex-col gap-7 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48">
                        <div className="flex flex-row flex-wrap items-center justify-between gap-2">
                            <Text variant="big-heading"> Bounties </Text>
                            {/* TODO: Verify if user has perms to create issues in this repo, otherwise disable button and show tooltip. */}
                            {user.isCurrentUser && (
                                <Link href="/explorer/new" passHref>
                                    <a>
                                        <Button
                                            variant="orange"
                                            text="Create new"
                                            icon={MdAdd}
                                            reversed
                                        />
                                    </a>
                                </Link>
                            )}
                        </div>

                        <div className="sticky top-20 z-30 -mt-px flex h-16 flex-row gap-8 border-b-1.5 border-b-line bg-neutral bg-opacity-40 pt-4 backdrop-blur-xl">
                            {tabs.map((tab, index) => (
                                <NavElement
                                    as={index === 0 && `/${username}`}
                                    href={`/${username}?tab=${tab.id}`}
                                    key={tab.id}
                                    label={tab.label}
                                    chipLabel={tab.amount.toString()} // Amount of bounties in each category.
                                    scroll={false} // TODO: Scroll to navbar position.
                                />
                            ))}
                        </div>

                        {currentTab.content}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async context => {
    const username = context.query.username as string;

    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions,
    );
    const accessToken = session?.accessToken as string;

    const user = await getUser(username, accessToken);
    const githubUsername = user ? user.username : (await getCurrentUser(accessToken)).login;
    const userIssues = await getIssuesPagingUpgrade(`${DRILL_BOUNTY_CHALLENGE_LABEL},user:${githubUsername}`);

    if (!userIssues) {
        return { notFound: true };
    }

    const challenges = mockChallenges;
    const [completedChallenges, incorrectChallenges, invalidChallenges, pendingChallenges] = getSubmittedChallengesForUserWithStatus(
        userIssues,
        challenges,
    );

    return {
        props: {
            completedChallenges,
            incorrectChallenges,
            invalidChallenges,
            pendingChallenges,
            user: { ...user, isCurrentUser: username === session?.login },
        },
    };
};
