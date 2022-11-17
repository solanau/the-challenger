import Button from 'components/common/button';
import Card from 'components/common/card';
import Text from 'components/common/text';
import { fetchChallengesForEvent, fetchSubmissions } from 'lib/api';
import { getCurrentUser } from 'lib/github';
import { NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { signIn } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { useState } from 'react';
import { TbBrandGithub } from 'react-icons/tb';
import {
    ChallengePayload,
    SubmissionPayload,
    SubmissionStatus,
} from 'types/api';
import { User } from 'types/github';

const ALLOWED_REVIEWERS = process.env.NEXT_PUBLIC_ALLOWED_REVIEWERS.split(',');

type SubmissionsPageProps = {
    user: User;
    submissions: (SubmissionPayload & { challenge: ChallengePayload })[];
};

const SubmissionsPage: NextPage<SubmissionsPageProps> = ({
    submissions,
    user,
}) => {
    const [status, setStatus] = useState('pending');

    const filteredSubmissions = submissions.filter(
        submission => submission.status === status,
    );

    return (
        <>
            <NextSeo
                title="Solana Bounty Submissions"
                description="Complete the Solana submissions to collect Solana rewards!"
            ></NextSeo>

            {user ? (
                ALLOWED_REVIEWERS.includes(user.login) ? (
                    <div>
                        <div className="flex w-full flex-row flex-wrap gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                            <Text variant="big-heading">Submissions List</Text>
                        </div>

                        <div>
                            <div className="mt-3">
                                Filter by status:
                                <select
                                    name="status"
                                    id="status"
                                    value={status}
                                    onChange={event =>
                                        setStatus(
                                            event.target
                                                .value as SubmissionStatus,
                                        )
                                    }
                                    className="ml-3 bg-white bg-opacity-10 px-2 py-1"
                                >
                                    <option
                                        value="pending"
                                        className="bg-black bg-opacity-60"
                                    >
                                        Pending
                                    </option>
                                    <option
                                        value="invalid"
                                        className="bg-black bg-opacity-60"
                                    >
                                        Invalid
                                    </option>
                                    <option
                                        value="complete"
                                        className="bg-black bg-opacity-60"
                                    >
                                        Complete
                                    </option>
                                </select>
                            </div>

                            {filteredSubmissions.length > 0 ? (
                                filteredSubmissions.map((submission, index) => (
                                    <Card key={index} className="m-5 p-4">
                                        <Text variant="heading">
                                            {submission.challenge.title}
                                        </Text>

                                        <Text variant="label">
                                            {submission.status}
                                        </Text>

                                        <Link
                                            href={`/submissions/${submission.id}`}
                                            passHref
                                        >
                                            <a className="underline">view</a>
                                        </Link>
                                    </Card>
                                ))
                            ) : (
                                <div className="flex h-20 items-center justify-center">
                                    <p className="text-secondary">
                                        No submissions found.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex w-full grow flex-col items-center justify-center gap-3 p-5 text-center sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                        <TbBrandGithub size={35} />
                        <Text variant="sub-heading">
                            You&apos;re not authorized to access this page.
                        </Text>
                    </div>
                )
            ) : (
                <div className="flex w-full grow flex-col items-center justify-center gap-3 p-5 text-center sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                    <TbBrandGithub size={35} />
                    <Text variant="sub-heading">
                        Sign in with GitHub to view the submission.
                    </Text>

                    <div className="flex flex-row gap-2">
                        <Link href="/" passHref>
                            <a>
                                <Button variant="transparent" text="Go back" />
                            </a>
                        </Link>
                        <Button
                            variant="orange"
                            text="Sign in"
                            onClick={async () => signIn('github')}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default SubmissionsPage;

export const getServerSideProps = async context => {
    const submissions = await fetchSubmissions({
        eventId: process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_EVENT_PUBKEY,
    });
    const challenges = await fetchChallengesForEvent();

    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions,
    );
    const accessToken = session?.accessToken as string;
    const user = await getCurrentUser(accessToken);

    return {
        props: {
            user,
            submissions: submissions.map(submission => {
                const challengeIndex = challenges.findIndex(
                    challenge => challenge.id === submission.challengeId,
                );

                return {
                    ...submission,
                    challenge: challenges[challengeIndex],
                };
            }),
        },
    };
};
