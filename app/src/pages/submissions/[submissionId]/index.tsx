import Button from 'components/common/button';
import Card from 'components/common/card';
import Markdown from 'components/common/markdown';
import Text from 'components/common/text';
import { useEvent } from 'hooks/use-event';
import { useSubmission } from 'hooks/use-submission';
import { updateSubmissionStatus } from 'lib/api';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useAuth } from 'providers/AuthProvider';
import { FormEvent, useState } from 'react';
import { TbBrandGithub } from 'react-icons/tb';
import { SubmissionStatus } from 'types/submission';

type SubmissionPageProps = {
    submissionId: string;
};

const Submission: NextPage<SubmissionPageProps> = ({ submissionId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();
    const submission = useSubmission(
        process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_EVENT_ID,
        submissionId,
    );
    const event = useEvent(
        process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_EVENT_ID,
    );
    const [status, setStatus] = useState<SubmissionStatus | ''>('');

    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (status === '') {
            return;
        }

        setIsLoading(true);

        updateSubmissionStatus({
            id: submissionId,
            status,
            eventId: process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_EVENT_ID,
        })
            .then(() => alert('Submission status changed!'))
            .catch(error => alert(error))
            .finally(() => setIsLoading(false));
    };

    return (
        <>
            {submission && (
                <>
                    <NextSeo title="Submission"></NextSeo>

                    {user ? (
                        event?.reviewers.includes(user.uid) ? (
                            <div className="flex flex-col">
                                <section className="flex w-full flex-col gap-7 bg-gradient-to-tr from-primary/75 to-secondary/75 p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                                    <div>
                                        <div className="flex h-12 flex-col justify-between md:h-20">
                                            <h1 className="peer border-none bg-transparent text-4xl font-medium placeholder-white/90 outline-none md:text-6xl">
                                                {submission.challenge.title ??
                                                    'Challenge not found'}
                                            </h1>
                                        </div>
                                    </div>
                                </section>

                                <section className="flex w-full flex-col gap-7 p-2 !pb-0 sm:p-8 md:px-16 lg:px-32 lg:py-6 xl:px-48 xl:py-8">
                                    <Markdown>
                                        {submission.challenge.description}
                                    </Markdown>

                                    <Text variant="paragraph">
                                        Submission: {submission.id}
                                    </Text>

                                    <Text variant="label">
                                        Status: {submission.status}
                                    </Text>

                                    {submission.answers.map((answer, index) => (
                                        <Card key={index} className="p-4">
                                            <Text variant="paragraph">
                                                {index + 1}:{' '}
                                                {answer.field.label}
                                            </Text>
                                            <Text
                                                className="pl-4"
                                                variant="sub-paragraph"
                                            >
                                                {answer.value}
                                            </Text>
                                        </Card>
                                    ))}

                                    <form onSubmit={handleFormSubmit}>
                                        <label>
                                            Status:
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
                                                    value={''}
                                                    className="bg-black bg-opacity-60"
                                                    disabled
                                                >
                                                    Select status
                                                </option>
                                                <option
                                                    value={'pending'}
                                                    className="bg-black bg-opacity-60"
                                                    disabled={
                                                        'pending' ===
                                                        submission.status
                                                    }
                                                >
                                                    Pending
                                                </option>
                                                <option
                                                    value="invalid"
                                                    className="bg-black bg-opacity-60"
                                                    disabled={
                                                        'invalid' ===
                                                        submission.status
                                                    }
                                                >
                                                    Invalid
                                                </option>
                                                <option
                                                    value="incorrect"
                                                    className="bg-black bg-opacity-60"
                                                    disabled={
                                                        'incorrect' ===
                                                        submission.status
                                                    }
                                                >
                                                    Incorrect
                                                </option>
                                                <option
                                                    value="completed"
                                                    className="bg-black bg-opacity-60"
                                                    disabled={
                                                        'completed' ===
                                                        submission.status
                                                    }
                                                >
                                                    Completed
                                                </option>
                                            </select>
                                        </label>
                                        <Button
                                            type="submit"
                                            variant="orange"
                                            disabled={
                                                submission.status === status ||
                                                isLoading
                                            }
                                        >
                                            Save
                                        </Button>
                                    </form>
                                </section>
                            </div>
                        ) : (
                            <div className="flex w-full grow flex-col items-center justify-center gap-3 p-5 text-center sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                                <TbBrandGithub size={35} />
                                <Text variant="sub-heading">
                                    You&apos;re not authorized to access this
                                    page.
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
                                        <Button
                                            variant="transparent"
                                            text="Go back"
                                        />
                                    </a>
                                </Link>
                                <Link href="/login" passHref>
                                    <a>
                                        <Button
                                            variant="orange"
                                            text="Sign in"
                                        />
                                    </a>
                                </Link>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default Submission;

export const getServerSideProps: GetServerSideProps = async context => {
    let submissionId = context.params.submissionId;
    if (submissionId instanceof Array) {
        submissionId = submissionId[0];
    }

    return {
        props: {
            submissionId,
        },
    };
};
