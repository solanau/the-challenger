import Button from 'components/common/button';
import NavElement from 'components/common/layout/header/nav-element';
import SubmissionList from 'components/common/submission-list';
import Text from 'components/common/text';
import Hero from 'components/profile-page/hero';
import { useSubmissions } from 'hooks/use-submissions';
import { useUserByUserName } from 'hooks/use-user-by-user-name';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { useMemo } from 'react';
import { MdAdd } from 'react-icons/md';

type ProfilePageProps = {
    userName: string;
};

const ProfilePage: NextPage<ProfilePageProps> = ({ userName }) => {
    const { user: currentUser } = useAuth();
    const user = useUserByUserName(userName);
    const submissions = useSubmissions({ userId: user?.id });
    const pendingSubmissions = useMemo(
        () => submissions.filter(submission => submission.status === 'pending'),
        [submissions],
    );
    const completedSubmissions = useMemo(
        () =>
            submissions.filter(submission => submission.status === 'completed'),
        [submissions],
    );
    const invalidSubmissions = useMemo(
        () => submissions.filter(submission => submission.status === 'invalid'),
        [submissions],
    );
    const incorrectSubmissions = useMemo(
        () =>
            submissions.filter(submission => submission.status === 'incorrect'),
        [submissions],
    );

    const tabs = useMemo(
        () => [
            {
                content: (
                    <SubmissionList
                        key="completed-submissions"
                        submissions={completedSubmissions}
                    />
                ),
                id: 'completed',
                label: 'Completed',
                amount: completedSubmissions.length,
            },
            {
                content: (
                    <SubmissionList
                        key="incorrect-submissions"
                        submissions={incorrectSubmissions}
                    />
                ),
                id: 'incorrect',
                label: 'Incorrect',
                amount: incorrectSubmissions.length,
            },
            {
                content: (
                    <SubmissionList
                        key="invalid-submissions"
                        submissions={invalidSubmissions}
                    />
                ),
                id: 'invalid',
                label: 'Invalid',
                amount: invalidSubmissions.length,
            },
            {
                content: (
                    <SubmissionList
                        key="pending-submissions"
                        submissions={pendingSubmissions}
                    />
                ),
                id: 'pending',
                label: 'Pending',
                amount: pendingSubmissions.length,
            },
        ],
        [
            completedSubmissions,
            incorrectSubmissions,
            invalidSubmissions,
            pendingSubmissions,
        ],
    );

    const router = useRouter();
    const currentTabId = (router.query.tab as string) || tabs[0].id;

    const currentTab = useMemo(
        () => tabs.find(tab => tab.id === currentTabId),
        [currentTabId, tabs],
    );

    return (
        <>
            <NextSeo
                title={userName}
                description="Build your profile to contribute in style."
            ></NextSeo>

            {user && (
                <div>
                    <div className="flex flex-col gap-16 ">
                        <Hero {...user} />
                        <div className="flex flex-col gap-7 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48">
                            <div className="flex flex-row flex-wrap items-center justify-between gap-2">
                                <Text variant="big-heading"> Bounties </Text>
                                {/* TODO: Verify if user has perms to create issues in this repo, otherwise disable button and show tooltip. */}
                                {user.id === currentUser.uid && (
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
                                        as={index === 0 && `/${userName}`}
                                        href={`/${userName}?tab=${tab.id}`}
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
            )}
        </>
    );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async context => {
    let userName = context.params.username;
    if (userName instanceof Array) {
        userName = userName[0];
    }

    return {
        props: {
            userName,
        },
    };
};
