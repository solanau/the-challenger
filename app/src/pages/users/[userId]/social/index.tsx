import Button from 'components/common/button';
import Card from 'components/common/card';
import Text from 'components/common/text';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { FaFacebook, FaGithub, FaTwitter } from 'react-icons/fa';
import { TbBrandGithub } from 'react-icons/tb';
import {
    facebookAuthProvider,
    githubAuthProvider,
    twitterAuthProvider,
} from 'utils/firebase';

const UserSocialPage: NextPage = () => {
    const { isLoggedIn, credential, link } = useAuth();
    const router = useRouter();
    const eventId =
        router.query.eventId instanceof Array
            ? router.query.eventId[0]
            : router.query.eventId;

    const handleLinkGitHub = () => {
        link(githubAuthProvider).then(() => {
            console.log('linked');
        });
    };

    const handleLinkTwitter = () => {
        link(twitterAuthProvider).then(() => {
            console.log('linked');
        });
    };

    const handleLinkFacebook = () => {
        link(facebookAuthProvider).then(() => {
            console.log('linked');
        });
    };

    return (
        <>
            <section className="mt-36 px-4 pt-20 sm:px-8 md:mt-0 md:px-16 lg:px-32 xl:px-48">
                {!isLoggedIn && (
                    <div className="flex w-full grow flex-col items-center justify-center gap-3 p-5 text-center sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                        <TbBrandGithub size={35} />
                        <Text variant="sub-heading">
                            Sign in with GitHub to view the challenge.
                        </Text>

                        <div className="flex flex-row gap-2">
                            <Link
                                href={eventId ? `/events/${eventId}` : '/'}
                                passHref
                            >
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
                                    <Button variant="orange" text="Sign in" />
                                </a>
                            </Link>
                        </div>
                    </div>
                )}

                {isLoggedIn && (
                    <>
                        <h1 className="mb-8">
                            <Text variant="heading">Socials</Text>
                        </h1>

                        <Card className="mb-8 flex p-5">
                            <div className="grow">
                                <Text variant="sub-heading" className="mb-2">
                                    <FaGithub size={24} className="inline" />{' '}
                                    GitHub
                                </Text>

                                {credential.githubUserName === null && (
                                    <Text
                                        variant="paragraph"
                                        className="text-danger"
                                    >
                                        Not linked
                                    </Text>
                                )}

                                {credential.githubUserName !== null && (
                                    <Link
                                        href={`https://github.com/${credential.githubUserName}`}
                                        passHref
                                    >
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Text
                                                variant="paragraph"
                                                className="text-primary"
                                            >{`@${credential.githubUserName}`}</Text>
                                        </a>
                                    </Link>
                                )}

                                <Text variant="paragraph">
                                    By linking your GitHub account you'll get
                                    access to the challenges that require GitHub
                                    interactions.
                                </Text>
                            </div>

                            <div>
                                <Button
                                    variant="orange"
                                    onClick={handleLinkGitHub}
                                >
                                    Link GitHub
                                </Button>
                            </div>
                        </Card>

                        <Card className="mb-8 flex p-5">
                            <div className="grow">
                                <Text variant="sub-heading" className="mb-2">
                                    <FaTwitter size={24} className="inline" />{' '}
                                    Twitter
                                </Text>

                                {credential.twitterUserName === null && (
                                    <Text
                                        variant="paragraph"
                                        className="text-danger"
                                    >
                                        Not linked
                                    </Text>
                                )}

                                {credential.twitterUserName !== null && (
                                    <Link
                                        href={`https://twitter.com/${credential.twitterUserName}`}
                                        passHref
                                    >
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Text
                                                variant="paragraph"
                                                className="text-primary"
                                            >{`@${credential.twitterUserName}`}</Text>
                                        </a>
                                    </Link>
                                )}

                                <Text variant="paragraph">
                                    By linking your Twitter account you'll get
                                    access to the challenges that require
                                    Twitter interactions.
                                </Text>
                            </div>

                            <div>
                                <Button
                                    variant="orange"
                                    onClick={handleLinkTwitter}
                                >
                                    Link Twitter
                                </Button>
                            </div>
                        </Card>

                        <Card className="mb-8 flex p-5">
                            <div className="grow">
                                <Text variant="sub-heading" className="mb-2">
                                    <FaFacebook size={24} className="inline" />{' '}
                                    Facebook
                                </Text>

                                {credential.facebookUserName === null && (
                                    <Text
                                        variant="paragraph"
                                        className="text-danger"
                                    >
                                        Not linked
                                    </Text>
                                )}

                                {credential.facebookUserName !== null && (
                                    <Link
                                        href={`https://facebook.com/${credential.facebookUserName}`}
                                        passHref
                                    >
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Text
                                                variant="paragraph"
                                                className="text-primary"
                                            >{`@${credential.facebookUserName}`}</Text>
                                        </a>
                                    </Link>
                                )}

                                <Text variant="paragraph">
                                    By linking your Facebook account you'll get
                                    access to the challenges that require
                                    Facebook interactions.
                                </Text>
                            </div>

                            <div>
                                <Button
                                    variant="orange"
                                    onClick={handleLinkFacebook}
                                >
                                    Link Facebook
                                </Button>
                            </div>
                        </Card>
                    </>
                )}
            </section>
        </>
    );
};

export default UserSocialPage;
