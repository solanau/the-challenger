import Button from 'components/common/button';
import FormBuilder from 'components/common/form-builder';
import Markdown from 'components/common/markdown';
import Text from 'components/common/text';
import { useFormik } from 'formik';
import { useChallenge } from 'hooks/challenges/use-challenge';
import { useCurrentUser } from 'hooks/use-current-user';
import { createSubmission } from 'lib/api';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useAuth } from 'providers/AuthProvider';
import { useState } from 'react';
import { TbBrandGithub } from 'react-icons/tb';
import { cn } from 'utils';
import { v4 as uuid } from 'uuid';

type ChallengePageProps = {
    eventId: string;
    challengeId: string;
};

const ChallengePage: NextPage<ChallengePageProps> = ({
    eventId,
    challengeId,
}) => {
    const [validBountyName] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const { isLoggedIn } = useAuth();
    const challenge = useChallenge(eventId, challengeId);
    const user = useCurrentUser();
    const formik = useFormik({
        initialValues: {},
        onSubmit: async values => {
            setIsLoading(true);

            const answers = Object.keys(values).map(key => {
                const fieldIndex = challenge.formComponents.findIndex(
                    formComponent => formComponent.field === key,
                );

                return {
                    field: challenge.formComponents[fieldIndex],
                    value: values[key],
                };
            });

            createSubmission({
                id: uuid(),
                challengeId,
                answers,
                eventId,
            })
                .then(() => alert('Submission Sent!'))
                .catch(error => alert(error))
                .finally(() => setIsLoading(false));
        },
    });

    return (
        <>
            {challenge && (
                <>
                    <NextSeo
                        title={challenge.title}
                        description={challenge.shortDescription}
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
                                    <div className="flex h-12 flex-col justify-between md:h-20">
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
                                <Markdown>
                                    {`### Rewards: ${challenge.rewardValue} Points 🔥 `}
                                </Markdown>

                                {challenge.timeStatus !== 'pending' && (
                                    <Markdown>{challenge.description}</Markdown>
                                )}

                                {challenge.submittedStatus ? (
                                    <div className="justify-front flex flex-col gap-2 p-2 pt-4 font-thin text-green-400">
                                        <Markdown>{`### How to Submit `}</Markdown>
                                        <p className="mt-4">
                                            You&apos;ve already submitted this
                                            challenge!
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        {challenge.timeStatus === 'active' && (
                                            <form
                                                onSubmit={formik.handleSubmit}
                                            >
                                                <Markdown>{`### How to Submit `}</Markdown>

                                                <FormBuilder
                                                    config={
                                                        challenge.formComponents
                                                    }
                                                    formik={formik}
                                                />

                                                <div className="flex flex-row justify-end gap-2 pt-4 text-right font-thin">
                                                    <Markdown>
                                                        **please review your
                                                        entry before clicking
                                                        submit*
                                                    </Markdown>
                                                </div>
                                                <div className="width-full flex flex-row justify-end gap-2 pt-4">
                                                    <Button
                                                        className="w-40"
                                                        type="submit"
                                                        variant="orange"
                                                        text="Submit"
                                                        disabled={
                                                            isLoading ||
                                                            user === null
                                                        }
                                                    />
                                                </div>

                                                {user === null && (
                                                    <Text
                                                        variant="paragraph"
                                                        className="mt-4 text-right italic"
                                                    >
                                                        In order to submit a
                                                        challenge, you have to
                                                        &nbsp;
                                                        <Link
                                                            href="/users/profile-settings"
                                                            passHref
                                                        >
                                                            <a className="text-primary underline">
                                                                set up your
                                                                profile.
                                                            </a>
                                                        </Link>
                                                    </Text>
                                                )}
                                            </form>
                                        )}
                                    </div>
                                )}
                            </section>
                        </div>
                    ) : (
                        <div className="flex w-full grow flex-col items-center justify-center gap-3 p-5 text-center sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                            <TbBrandGithub size={35} />
                            <Text variant="sub-heading">
                                Sign in with GitHub to view the challenge.
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

export default ChallengePage;

export const getServerSideProps: GetServerSideProps = async context => {
    let challengeId = context.params.challengeId;
    if (challengeId instanceof Array) {
        challengeId = challengeId[0];
    }

    let eventId = context.params.eventId;
    if (eventId instanceof Array) {
        eventId = eventId[0];
    }

    return {
        props: {
            eventId,
            challengeId,
        },
    };
};
