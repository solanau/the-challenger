import Button from 'components/common/button';
import Text from 'components/common/text';
import SubmissionReviewForm from 'components/submission-review-page/submission-review-form';
import { Formik } from 'formik';
import { useEvent } from 'hooks/use-event';
import { useSubmission } from 'hooks/use-submission';
import { reviewSubmission } from 'lib/api';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { useState } from 'react';
import { TbBrandGithub } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { ReviewSubmissionPayload } from 'types/submission';

const SubmissionReviewPage: NextPage = () => {
    const router = useRouter();
    const eventId =
        (router.query.eventId instanceof Array
            ? router.query.eventId[0]
            : router.query.eventId) ?? null;
    const submissionId =
        router.query.submissionId instanceof Array
            ? router.query.submissionId[0]
            : router.query.submissionId;
    const [isLoading, setIsLoading] = useState(false);
    const { credential } = useAuth();
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
                toast(error, {
                    type: 'error',
                });
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <>
            {submission && (
                <>
                    <NextSeo title="Submission"></NextSeo>

                    {credential ? (
                        event?.reviewers.includes(credential.id) ? (
                            <div className="flex flex-col">
                                <section className="flex w-full flex-col gap-7 bg-gradient-to-tr from-primary/75 to-secondary/75 p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                                    <div>
                                        <div className="md:min-h-20 min-h-12 flex flex-col justify-between">
                                            <h1 className="peer border-none bg-transparent text-4xl font-medium placeholder-white/90 outline-none md:text-6xl">
                                                {submission.title ??
                                                    'Challenge not found'}
                                            </h1>
                                        </div>
                                    </div>
                                </section>

                                <section className="flex w-full flex-col gap-7 p-2 !pb-0 sm:p-4 md:px-16 lg:px-32 lg:py-4 xl:px-48 xl:py-4">
                                    <div className="mx-auto grid space-x-6 space-y-6 p-6 sm:max-w-7xl sm:items-center">
                                        <Text
                                            variant="heading"
                                            className="mx-auto grid text-red-500 sm:max-w-7xl sm:items-center"
                                        >
                                            {`> Review `}
                                        </Text>
                                        <Text variant="heading">
                                            {submission.description}
                                        </Text>

                                        <Text variant="paragraph">
                                            Submission: {submission.id}
                                        </Text>

                                        <Text variant="paragraph">
                                            Submission description:{' '}
                                            {submission.description}
                                        </Text>

                                        <Text variant="paragraph">
                                            Submission Event Id:{' '}
                                            {submission.challengeId}
                                        </Text>

                                        <Text variant="paragraph">
                                            User Id: {submission.userId}
                                        </Text>

                                        <Formik
                                            initialValues={{
                                                comments: submission.comments,
                                                status: submission.status,
                                                answers: submission.answers.map(
                                                    answer => ({
                                                        isApproved:
                                                            answer.isApproved,
                                                        comments:
                                                            answer.comments,
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
                                    </div>
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
                            <Text variant="sub-heading">
                                Sign in to view the submission.
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
