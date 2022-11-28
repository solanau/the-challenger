import SubmissionList from 'components/common/submission-list';
import Text from 'components/common/text';
import Hero from 'components/profile-page/hero';
import { useLeaderBoard } from 'hooks/use-leader-board';
import { useSubmissions } from 'hooks/use-submissions';
import { useUserByUserName } from 'hooks/use-user-by-user-name';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useAuth } from 'providers/AuthProvider';
import { useMemo } from 'react';
import { TbBrandGithub } from 'react-icons/tb';

type ProfilePageProps = {
    userName: string;
};

const ProfilePage: NextPage<ProfilePageProps> = ({ userName }) => {
    const { user: currentUser } = useAuth();
    const user = useUserByUserName(userName);
    const submissions = useSubmissions(
        process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_EVENT_ID,
        { userId: user?.id },
    );
    const leaderBoard = useLeaderBoard(
        process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_EVENT_ID,
        'individual',
    );
    const rank = useMemo(() => {
        const participantIndex = leaderBoard?.participants.findIndex(
            participant => participant.userId === user?.id,
        );

        if (participantIndex === -1) {
            return null;
        }

        return participantIndex + 1;
    }, [user?.id, leaderBoard?.participants]);
    const totalPoints = useMemo(
        () =>
            submissions
                .filter(submission => submission.status === 'completed')
                .reduce(
                    (totalPoints, submission) =>
                        totalPoints + submission.totalPoints,
                    0,
                ),
        [submissions],
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
                            {rank && totalPoints && (
                                <div>
                                    <Text variant="label">{`Rank: #${rank}. (${totalPoints} points)`}</Text>
                                </div>
                            )}

                            {currentUser.githubUserName && (
                                <Link
                                    href={`https://github.com/${currentUser.githubUserName}`}
                                    passHref
                                >
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <TbBrandGithub size={35} />
                                    </a>
                                </Link>
                            )}

                            {user.id === currentUser.uid && (
                                <>
                                    <Text variant="big-heading">
                                        Submissions
                                    </Text>

                                    <SubmissionList
                                        key="submissions"
                                        submissions={submissions}
                                    />
                                </>
                            )}
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
