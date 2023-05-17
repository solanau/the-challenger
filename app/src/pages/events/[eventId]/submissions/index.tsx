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
        (router.query.eventId instanceof Array
            ? router.query.eventId[0]
            : router.query.eventId) ?? null;
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

            {credential && event?.reviewers ? (
                event?.reviewers.includes(credential.id) ? (
                    <div>
                        <div className="flex w-full flex-row flex-wrap gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                            <Text variant="big-heading">Submissions List</Text>
                        </div>

                        <div className="my-6 mx-auto grid space-x-6 space-y-6 p-12 sm:max-w-7xl sm:items-center">
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
                                    className="ml-4 h-10 rounded-lg bg-white bg-opacity-10 px-2 py-1"
                                >
                                    <option
                                        value="pending"
                                        className="bg-black bg-opacity-60 "
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
                                <div className="mt-2">
                                    <p>
                                        Submissions:{' '}
                                        {filteredSubmissions.length}
                                    </p>
                                </div>
                            </div>

                            {filteredSubmissions.length > 0 ? (
                                filteredSubmissions.map((submission, index) => (
                                    <Card key={index} className="p-6 ">
                                        <Link
                                            href={`/events/${eventId}/submissions/${submission.id}/review`}
                                            passHref
                                        >
                                            <div className="flex cursor-pointer flex-col gap-5 overflow-hidden">
                                                <Text variant="heading">
                                                    {submission?.title ??
                                                        'Challenge not found'}
                                                </Text>

                                                <Text variant="label">
                                                    {submission.status}
                                                </Text>

                                                <a className="underline">
                                                    view
                                                </a>
                                            </div>
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
                    <Text variant="sub-heading">
                        Sign in to view the submission.
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
