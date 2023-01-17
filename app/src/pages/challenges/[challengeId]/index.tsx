import Button from 'components/common/button';
import Markdown from 'components/common/markdown';
import Text from 'components/common/text';
import { useChallenge } from 'hooks/use-challenge';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { useState } from 'react';
import { TbBrandGithub } from 'react-icons/tb';
import { cn } from 'utils';

const ChallengePage: NextPage = () => {
    const router = useRouter();
    const challengeId =
        router.query.challengeId instanceof Array
            ? router.query.challengeId[0]
            : router.query.challengeId;
    const [validBountyName] = useState(true);
    const { isLoggedIn, credential, user } = useAuth();
    const challenge = useChallenge(challengeId);

    return (
        <>
            {!isLoggedIn && (
                <div className="flex w-full grow flex-col items-center justify-center gap-3 p-5 text-center sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                    <Text variant="sub-heading">
                        Sign in to access this page.
                    </Text>

                    <div className="flex flex-row gap-2">
                        <Link href="/" passHref>
                            <a>
                                <Button variant="transparent" text="Go back" />
                            </a>
                        </Link>

                        <Link href="/login" passHref>
                            <a>
                                <Button variant="orange" text="Sign in" />
                            </a>
                        </Link>
                    </div>
                </div>
            )}

            {isLoggedIn && user === null && (
                <div className="flex w-full grow flex-col items-center justify-center gap-3 p-5 text-center sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                    <Text variant="sub-heading">
                        Only users that have a profile can access this page. In
                        order to set yours, go ahead and{' '}
                        <Link href={`/users/${credential.id}/settings`}>
                            <a className="text-primary underline">
                                set up your profile
                            </a>
                        </Link>{' '}
                        to get started.
                    </Text>
                </div>
            )}

            {isLoggedIn && user !== null && !user.isAdmin && (
                <div className="flex w-full grow flex-col items-center justify-center gap-3 p-5 text-center sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                    <Text variant="sub-heading">
                        You're not authorized to access this page.
                    </Text>
                </div>
            )}

            {isLoggedIn && user !== null && user.isAdmin && challenge && (
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
                                    </div>
                                </div>
                            </section>

                            <section className="flex w-full flex-col gap-7 p-2 !pb-0 sm:p-8 md:px-16 lg:px-32 lg:py-6 xl:px-48 xl:py-8">
                                <Markdown>
                                    {`### Rewards: ${challenge.points} Points 🔥 `}
                                </Markdown>

                                <Markdown>{challenge.description}</Markdown>
                                {/* <Markdown>{challenge.fullDescription}</Markdown> */}

                                <Markdown>{`### How to Submit `}</Markdown>

                                {challenge.fieldsConfig.map(
                                    (fieldConfig, index) => (
                                        <Text variant="paragraph" key={index}>
                                            #{index + 1}. {fieldConfig.label}
                                        </Text>
                                    ),
                                    {},
                                )}
                            </section>
                        </div>
                    ) : (
                        <div className="flex w-full grow flex-col items-center justify-center gap-3 p-5 text-center sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                            <TbBrandGithub size={35} />
                            <Text variant="sub-heading">
                                Sign in to view the challenge.
                            </Text>

                            <div className="flex flex-row gap-2">
                                <Link href={`/`} passHref>
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
