import CreateSubmissionForm from 'components/challenge-page/create-submission-form';
import Button from 'components/common/button';
import Card from 'components/common/card';
import Markdown from 'components/common/markdown';
import Modal from 'components/common/modal';
import Spinner from 'components/common/spinner';
import Text from 'components/common/text';
import { Formik } from 'formik';
import { useEventChallenge } from 'hooks/use-event-challenge';
import { createSubmission } from 'lib/api';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { CreateSubmissionAnswerPayload } from 'types/api';
import { cn } from 'utils';
import { getFieldDefaultValueByType } from 'utils/form';
import { v4 as uuid } from 'uuid';

const ChallengePage: NextPage = () => {
    const router = useRouter();
    const eventId =
        (router.query.eventId instanceof Array
            ? router.query.eventId[0]
            : router.query.eventId) ?? null;
    const challengeId =
        router.query.challengeId instanceof Array
            ? router.query.challengeId[0]
            : router.query.challengeId;

    const [validBountyName] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [answers, setAnswers] = useState<CreateSubmissionAnswerPayload[]>([]);
    const { isLoggedIn, credential, user } = useAuth();
    const challenge = useEventChallenge(eventId, challengeId, user?.id);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const handleConfirmSubmission = (values: { [key: string]: string }) => {
        setIsConfirmModalOpen(true);
        setAnswers(
            Object.keys(values).map(key => {
                const fieldIndex = challenge.fieldsConfig.findIndex(
                    formComponent => formComponent.name === key,
                );

                return {
                    question: challenge.fieldsConfig[fieldIndex].label,
                    field: challenge.fieldsConfig[fieldIndex].name,
                    reply: values[key],
                };
            }),
        );
    };

    const handleCreateSubmission = (
        answers: CreateSubmissionAnswerPayload[],
    ) => {
        setIsLoading(true);

        const submissionId = uuid();

        createSubmission(submissionId, {
            challengeId,
            answers,
            eventId,
        })
            .then(() =>
                toast('Submission Sent!', {
                    type: 'success',
                }),
            )
            .catch(error => {
                toast(error, {
                    type: 'error',
                });
            })
            .finally(() => {
                setIsLoading(false);
                setIsConfirmModalOpen(false);
            });
    };

    return (
        <>
            {challenge && (
                <>
                    <NextSeo
                        title={challenge.title}
                        description={challenge.description}
                        twitter={{
                            site: '@HeavyDutyBuild',
                            cardType: 'summary_large_image',
                            handle: '@HeavyDutyBuild',
                        }}
                        openGraph={{
                            site_name: 'Solana Bounty Program',
                            type: 'website',
                            locale: 'en_US',
                            url: `challenges/${challenge.id}`,
                            images: [
                                {
                                    url: `${process.env.NEXT_PUBLIC_HOST}/static/preview-background-${challenge.id}.png`,
                                    width: 800,
                                    height: 420,
                                    alt: '',
                                },
                            ],
                        }}
                    ></NextSeo>

                    {isLoggedIn ? (
                        <div className="flex flex-col">
                            <section className="flex w-full flex-col gap-7 bg-gradient-to-tr from-primary/75 to-secondary/75 p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                                <Text variant="label">
                                    Bounty Challenge: #{challenge.id}
                                </Text>
                                <div
                                    className={cn(
                                        'tooltip-bottom tooltip-error',
                                        !validBountyName &&
                                            'tooltip-open tooltip',
                                    )}
                                    data-tip="Challenge name"
                                >
                                    <div className="md:min-h-20 min-h-12 flex flex-col justify-between">
                                        <h1 className="peer border-none bg-transparent text-4xl font-medium placeholder-white/90 outline-none md:text-6xl">
                                            {challenge.title}
                                        </h1>

                                        <Text variant="paragraph">
                                            {challenge.timeStatus ===
                                                'pending' && (
                                                <span>
                                                    Starts{' '}
                                                    <b>{challenge.startsIn}</b>
                                                </span>
                                            )}

                                            {challenge.timeStatus ===
                                                'active' && (
                                                <span>
                                                    Expires{' '}
                                                    <b>{challenge.expiresIn}</b>
                                                </span>
                                            )}

                                            {challenge.timeStatus ===
                                                'expired' && (
                                                <span>
                                                    Expired{' '}
                                                    <b>
                                                        {challenge.expiredAgo}
                                                    </b>
                                                </span>
                                            )}
                                        </Text>
                                    </div>
                                </div>
                            </section>

                            <section className="flex w-full flex-col gap-7 p-2 !pb-0 sm:p-8 md:px-16 lg:px-32 lg:py-6 xl:px-48 xl:py-8">
                                <div className="my-6 mx-auto grid space-y-6 sm:max-w-6xl sm:items-center">
                                    <Markdown>
                                        {`### Rewards: ${challenge.points} Points 🔥 `}
                                    </Markdown>

                                    {challenge.timeStatus !== 'pending' && (
                                        // <Markdown>{challenge.description}</Markdown>
                                        <Markdown>
                                            {challenge.fullDescription}
                                        </Markdown>
                                    )}

                                    {challenge.submissionStatus ==
                                        'completed' && (
                                        <div className="justify-front flex flex-col gap-2 p-2 pt-4 font-thin text-green-400">
                                            <p className="mt-4">
                                                You&apos;ve already submitted
                                                this challenge, and you were
                                                awarded points for a correct
                                                answer!
                                            </p>
                                        </div>
                                    )}

                                    {challenge.submissionStatus ==
                                        'pending' && (
                                        <div className="justify-front flex flex-col gap-2 p-2 pt-4 font-thin text-pink-400">
                                            <p className="mt-4">
                                                You&apos;ve already submitted
                                                this challenge! Your answers are
                                                currently pending.
                                            </p>
                                        </div>
                                    )}

                                    {challenge.submissionStatus !=
                                        'completed' &&
                                        challenge.submissionStatus !=
                                            'pending' &&
                                        challenge.timeStatus === 'active' &&
                                        user !== null && (
                                            <div>
                                                <Markdown>{`### How to Submit `}</Markdown>

                                                <Formik
                                                    initialValues={challenge.fieldsConfig.reduce(
                                                        (
                                                            initialValues,
                                                            field,
                                                        ) => ({
                                                            ...initialValues,
                                                            [field.name]:
                                                                getFieldDefaultValueByType(
                                                                    field.type,
                                                                ),
                                                        }),
                                                        {},
                                                    )}
                                                    onSubmit={
                                                        handleConfirmSubmission
                                                    }
                                                >
                                                    <CreateSubmissionForm
                                                        fieldsConfig={
                                                            challenge.fieldsConfig
                                                        }
                                                    ></CreateSubmissionForm>
                                                </Formik>
                                            </div>
                                        )}

                                    {!challenge.isSubmitted &&
                                        challenge.timeStatus === 'active' &&
                                        user === null && (
                                            <Text
                                                variant="paragraph"
                                                className="mt-4 text-right italic"
                                            >
                                                In order to submit a challenge,
                                                you have to{' '}
                                                <Link
                                                    passHref
                                                    href={{
                                                        pathname: `/users/${credential.id}/settings`,
                                                        query: eventId
                                                            ? {
                                                                  eventId,
                                                              }
                                                            : {},
                                                    }}
                                                >
                                                    <a className="text-primary underline">
                                                        set up your profile.
                                                    </a>
                                                </Link>
                                            </Text>
                                        )}

                                    <Modal
                                        title="Confirm submission"
                                        subTitle="A submission cannot be changed after it's been sent. Make sure to double-check your answers before confirming."
                                        isOpen={isConfirmModalOpen}
                                        onClose={() =>
                                            !isLoading &&
                                            setIsConfirmModalOpen(false)
                                        }
                                    >
                                        <div className="grid p-6 sm:items-center">
                                            <div className="w-content max-h-106 max-w-124 mb-4 space-y-4 overflow-y-auto pb-2">
                                                {answers.map(
                                                    (answer, index) => (
                                                        <Card
                                                            key={index}
                                                            className="p-4"
                                                        >
                                                            <Text variant="sub-heading">
                                                                #{index + 1}{' '}
                                                                {
                                                                    answer.question
                                                                }
                                                                :
                                                            </Text>
                                                            {/* TODO:Support Multiple field types */}
                                                            <Text
                                                                className="max-h-256 max-w-124 mx-auto w-full overflow-y-auto pl-4 pt-4 pb-2 font-normal text-green-200"
                                                                variant="sub-paragraph"
                                                            >
                                                                {answer.reply}
                                                            </Text>
                                                        </Card>
                                                    ),
                                                )}
                                            </div>
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="black"
                                                    className="sm:px-12"
                                                    onClick={() =>
                                                        setIsConfirmModalOpen(
                                                            false,
                                                        )
                                                    }
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    variant="orange"
                                                    className="sm:px-12"
                                                    onClick={() =>
                                                        handleCreateSubmission(
                                                            answers,
                                                        )
                                                    }
                                                    disabled={isLoading}
                                                >
                                                    {isLoading && (
                                                        <Spinner variant="large"></Spinner>
                                                    )}
                                                    Confirm
                                                </Button>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            </section>
                        </div>
                    ) : (
                        <div className="flex w-full grow flex-col items-center justify-center gap-3 p-5 text-center sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                            <Text variant="sub-heading">
                                Sign in to view the challenge.
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

export default ChallengePage;
