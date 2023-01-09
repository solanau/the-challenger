import SubmissionList from 'components/common/submission-list';
import Text from 'components/common/text';
import Hero from 'components/profile-page/hero';
import { useLeaderboard } from 'hooks/use-leaderboard';
import { useSubmissions } from 'hooks/use-submissions';
import { useUserByUserName } from 'hooks/use-user-by-user-name';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { useMemo } from 'react';
import { TbBrandGithub } from 'react-icons/tb';

const ProfilePage: NextPage = () => {
    const router = useRouter();
    const eventId =
        router.query.eventId instanceof Array
            ? router.query.eventId[0]
            : router.query.eventId;

    const userName =
        router.query.username instanceof Array
            ? router.query.username[0]
            : router.query.username;
    const { credential } = useAuth();
    const user = useUserByUserName(userName);
    const submissions = useSubmissions(eventId, { userId: user?.id });
    const leaderboard = useLeaderboard(eventId, 'individual');
    const rank = useMemo(() => {
        if (leaderboard === null) {
            return null;
        }

        const participantIndex = leaderboard.participants.findIndex(
            participant => participant.userId === user?.id,
        );

        if (participantIndex === -1) {
            return null;
        }

        return participantIndex + 1;
    }, [user?.id, leaderboard]);
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
                        <Hero
                            {...user}
                            isCurrentUser={credential.id === user.id}
                        />
                        <div className="flex flex-col gap-7 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48">
                            {rank && totalPoints && (
                                <Text variant="label">{`Rank: #${rank}. (${totalPoints} points)`}</Text>
                            )}

                            {credential.githubUserName && (
                                <Link
                                    href={`https://github.com/${credential.githubUserName}`}
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

                            {user.id === credential.id && (
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
