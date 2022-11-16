import Button from 'components/common/button';
import FormBuilder from 'components/common/form-builder';
import Markdown from 'components/common/markdown';
import Text from 'components/common/text';
import { useFormik } from 'formik';
import {
    createNewSubmission,
    fetchChallengeById,
    fetchSubmissions,
} from 'lib/api';
import { getCurrentUser } from 'lib/github';
import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { signIn } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { useState } from 'react';
import { TbBrandGithub } from 'react-icons/tb';
import { ChallengeView } from 'types/challenge';
import { User } from 'types/github';
import { cn } from 'utils';
import { toChallenge_Firebase } from 'utils/challenge';
import { v4 as uuid } from 'uuid';

type ChallengePageProps = {
    user: User;
    challengePubkey: string;
    challenge: ChallengeView;
};

const Challenge: NextPage<ChallengePageProps> = ({
    user,
    challengePubkey,
    challenge,
}) => {
    const router = useRouter();
    const [validBountyName] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

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

            try {
                await createNewSubmission({
                    id: uuid(),
                    challengeId: challenge.id,
                    challengePubkey,
                    username: user.login,
                    answers,
                    eventId:
                        process.env
                            .NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_EVENT_PUBKEY,
                    status: 'pending',
                });
                alert('Submission Sent!');
                router.push('/challenges');
            } catch (e) {
                alert(JSON.stringify(e));
                setIsLoading(false);
            }
        },
    });

    return (
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

            <p>Challenge Pubkey: x</p>
            <p>Prize Pubkeys: [x]</p>

            {user ? (
                <div className="flex flex-col">
                    <section className="flex w-full flex-col gap-7 bg-gradient-to-tr from-primary/75 to-secondary/75 p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                        <Text variant="label">
                            Bounty Challenge: #{challenge.id}
                        </Text>
                        <div
                            className={cn(
                                'tooltip-bottom tooltip-error',
                                !validBountyName && 'tooltip tooltip-open',
                            )}
                            data-tip="Challenge name"
                        >
                            <div className="flex h-12 flex-col justify-between md:h-20">
                                <h1 className="peer border-none bg-transparent text-4xl font-medium placeholder-white/90 outline-none md:text-6xl">
                                    {challenge.title}
                                </h1>

                                <Text variant="paragraph">
                                    {challenge.timeStatus === 'pending' && (
                                        <span>
                                            Starts <b>{challenge.startsIn}</b>
                                        </span>
                                    )}

                                    {challenge.timeStatus === 'active' && (
                                        <span>
                                            Expires <b>{challenge.expiresIn}</b>
                                        </span>
                                    )}

                                    {challenge.timeStatus === 'expired' && (
                                        <span>
                                            Expired{' '}
                                            <b>{challenge.expiredAgo}</b>
                                        </span>
                                    )}
                                </Text>
                            </div>
                        </div>
                    </section>

                    <section className="flex w-full flex-col gap-7 p-2 !pb-0 sm:p-8 md:px-16 lg:px-32 lg:py-6 xl:px-48 xl:py-8">
                        <Markdown>
                            {`### Rewards: ${challenge.reward} Points 🔥 `}
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
                                    <form onSubmit={formik.handleSubmit}>
                                        <Markdown>{`### How to Submit `}</Markdown>

                                        <FormBuilder
                                            config={challenge.formComponents}
                                            formik={formik}
                                        />

                                        <div className="flex flex-row justify-end gap-2 pt-4 text-right font-thin">
                                            <Markdown>
                                                **please review your entry
                                                before clicking submit*
                                            </Markdown>
                                        </div>
                                        <div className="width-full flex flex-row justify-end gap-2 pt-4">
                                            <Button
                                                className="w-40"
                                                type="submit"
                                                variant="orange"
                                                text="Submit"
                                                disabled={isLoading}
                                            />
                                        </div>
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

export default Challenge;

export const getServerSideProps: GetServerSideProps = async context => {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions,
    );

    const accessToken = session?.accessToken as string;

    const user = await getCurrentUser(accessToken);
    const userSubmissions = await fetchSubmissions({ username: user.login });

    let challengeId = context.params.id;
    if (challengeId instanceof Array) {
        challengeId = challengeId[0];
    }

    const challengePayload = await fetchChallengeById(challengeId);

    return {
        props: {
            user,
            challengePubkey: challengePayload.pubkey,
            challenge: await toChallenge_Firebase(
                userSubmissions,
                challengePayload,
            ),
        },
    };
};
