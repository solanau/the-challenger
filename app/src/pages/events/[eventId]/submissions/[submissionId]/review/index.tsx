import Button from 'components/common/button';
import Markdown from 'components/common/markdown';
import Text from 'components/common/text';
import SubmissionReviewForm from 'components/submission-review-page/submission-review-form';
import { FirebaseError } from 'firebase/app';
import { Formik } from 'formik';
import { useEvent } from 'hooks/use-event';
import { useSubmission } from 'hooks/use-submission';
import { reviewSubmission } from 'lib/api';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useAuth } from 'providers/AuthProvider';
import { useState } from 'react';
import { TbBrandGithub } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { ReviewSubmissionPayload } from 'types/submission';

type SubmissionReviewPageProps = {
    eventId: string;
    submissionId: string;
};

const SubmissionReviewPage: NextPage<SubmissionReviewPageProps> = ({
    eventId,
    submissionId,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();
    const submission = useSubmission(eventId, submissionId);
    const event = useEvent(eventId);

    const handleSendReview = (
        reviewSubmissionPayload: ReviewSubmissionPayload,
    ) => {
        setIsLoading(true);

        reviewSubmission(eventId, submissionId, reviewSubmissionPayload)
            .then(() =>
                toast('Submission status changed and review sent!', {
                    type: 'success',
                }),
            )
            .catch(error => {
                if (typeof error === 'string') {
                    toast(error, {
                        type: 'error',
                    });
                } else if (error instanceof FirebaseError) {
                    toast(error.code, {
                        type: 'error',
                    });
                } else {
                    toast(JSON.stringify(error), {
                        type: 'error',
                    });
                }
            })
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
                                                {submission.title ??
                                                    'Challenge not found'}
                                            </h1>
                                        </div>
                                    </div>
                                </section>

                                <section className="flex w-full flex-col gap-7 p-2 !pb-0 sm:p-8 md:px-16 lg:px-32 lg:py-6 xl:px-48 xl:py-8">
                                    <Markdown>
                                        {submission.description}
                                    </Markdown>

                                    <Text variant="paragraph">
                                        Submission: {submission.id}
                                    </Text>

                                    <Formik
                                        initialValues={{
                                            comments: submission.comments,
                                            status: submission.status,
                                            answers: submission.answers.map(
                                                answer => ({
                                                    isApproved:
                                                        answer.isApproved,
                                                    comments: answer.comments,
                                                }),
                                            ),
                                        }}
                                        onSubmit={handleSendReview}
                                    >
                                        <SubmissionReviewForm
                                            isLoading={isLoading}
                                            answers={submission.answers}
                                        ></SubmissionReviewForm>
                                    </Formik>
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
                                <Link href={`/events/${eventId}`} passHref>
                                    <a>
                                        <Button
                                            variant="transparent"
                                            text="Go back"
                                        />
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

export default SubmissionReviewPage;

export const getServerSideProps: GetServerSideProps = async context => {
    let submissionId = context.params.submissionId;
    if (submissionId instanceof Array) {
        submissionId = submissionId[0];
    }

    let eventId = context.params.eventId;
    if (eventId instanceof Array) {
        eventId = eventId[0];
    }

    return {
        props: {
            eventId,
            submissionId,
        },
    };
};
