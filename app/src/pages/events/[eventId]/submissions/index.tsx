import Button from 'components/common/button';
import Card from 'components/common/card';
import Text from 'components/common/text';
import { useEvent } from 'hooks/use-event';
import { useSubmissions } from 'hooks/use-submissions';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { useMemo, useState } from 'react';
import { TbBrandGithub } from 'react-icons/tb';
import { SubmissionStatus } from 'types/submission';

const SubmissionsPage: NextPage = () => {
    const router = useRouter();
    const eventId =
        router.query.eventId instanceof Array
            ? router.query.eventId[0]
            : router.query.eventId;
    const [status, setStatus] = useState('pending');
    const { credential } = useAuth();
    const event = useEvent(eventId);
    const submissions = useSubmissions(eventId, null);
    const filteredSubmissions = useMemo(
        () => submissions.filter(submission => submission.status === status),
        [submissions, status],
    );

    return (
        <>
            <NextSeo
                title="Solana Bounty Submissions"
                description="Complete the Solana submissions to collect Solana rewards!"
            ></NextSeo>

            {credential ? (
                event?.reviewers.includes(credential.id) ? (
                    <div>
                        <div className="flex w-full flex-row flex-wrap gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                            <Text variant="big-heading">Submissions List</Text>
                        </div>

                        <div>
                            <div>
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
                                    className="bg-white bg-opacity-10 px-2 py-1"
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
                                        value="incorrect"
                                        className="bg-black bg-opacity-60"
                                    >
                                        Incorrect
                                    </option>
                                    <option
                                        value="completed"
                                        className="bg-black bg-opacity-60"
                                    >
                                        Completed
                                    </option>
                                </select>
                            </div>

                            {filteredSubmissions.length > 0 ? (
                                filteredSubmissions.map((submission, index) => (
                                    <Card key={index} className="p-4">
                                        <Text variant="heading">
                                            {submission?.title ??
                                                'Challenge not found'}
                                        </Text>

                                        <Text variant="label">
                                            {submission.status}
                                        </Text>

                                        <Link
                                            href={`/events/${eventId}/submissions/${submission.id}/review`}
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
                        <Link href={`/events/${eventId}`} passHref>
                            <a>
                                <Button variant="transparent" text="Go back" />
                            </a>
                        </Link>

                        <Link
                            href={{
                                pathname: '/login',
                                query: eventId
                                    ? {
                                          eventId,
                                      }
                                    : {},
                            }}
                            passHref
                        >
                            <a>
                                <Button variant="orange" text="Sign in" />
                            </a>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default SubmissionsPage;
