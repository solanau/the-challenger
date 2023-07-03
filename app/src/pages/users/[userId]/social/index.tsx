import Button from 'components/common/button';
import Card from 'components/common/card';
import Spinner from 'components/common/spinner';
import Text from 'components/common/text';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { useState } from 'react';
import { FaFacebook, FaGithub, FaTwitter } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
    facebookAuthProvider,
    githubAuthProvider,
    twitterAuthProvider
} from 'utils/firebase';

const UserSocialPage: NextPage = () => {
    const { isLoggedIn, credential, link, unlink } = useAuth();
    const router = useRouter();
    const eventId =
        (router.query.eventId instanceof Array
            ? router.query.eventId[0]
            : router.query.eventId) ?? null;
    const [isLinkingGitHub, setIsLinkingGitHub] = useState(false);
    const [isUnlinkingGitHub, setIsUnlinkingGitHub] = useState(false);
    const [isLinkingTwitter, setIsLinkingTwitter] = useState(false);
    const [isUnlinkingTwitter, setIsUnlinkingTwitter] = useState(false);
    const [isLinkingFacebook, setIsLinkingFacebook] = useState(false);
    const [isUnlinkingFacebook, setIsUnlinkingFacebook] = useState(false);

    const handleLinkGitHub = () => {
        setIsLinkingGitHub(true);

        link(githubAuthProvider)
            .then(() => {
                toast('GitHub linked to profile!', {
                    type: 'success',
                });
            })
            .catch(error => {
                toast(error, {
                    type: 'error',
                });
            })
            .finally(() => setIsLinkingGitHub(false));
    };

    const handleUnlinkGitHub = () => {
        setIsUnlinkingGitHub(true);

        unlink(githubAuthProvider.providerId)
            .then(() => {
                toast('Unlinked GitHub from profile!', {
                    type: 'success',
                });
            })
            .catch(error => {
                toast(error, {
                    type: 'error',
                });
            })
            .finally(() => setIsUnlinkingGitHub(false));
    };

    const handleLinkTwitter = () => {
        setIsLinkingTwitter(true);

        link(twitterAuthProvider)
            .then(() => {
                toast('Twitter linked to profile!', {
                    type: 'success',
                });
            })
            .catch(error => {
                toast(error, {
                    type: 'error',
                });
            })
            .finally(() => setIsLinkingTwitter(false));
    };

    const handleUnlinkTwitter = () => {
        setIsUnlinkingTwitter(true);

        unlink(twitterAuthProvider.providerId)
            .then(() => {
                toast('Unlinked Twitter from profile!', {
                    type: 'success',
                });
            })
            .catch(error => {
                toast(error, {
                    type: 'error',
                });
            })
            .finally(() => setIsUnlinkingTwitter(false));
    };

    const handleLinkFacebook = () => {
        setIsLinkingFacebook(true);

        link(facebookAuthProvider)
            .then(() => {
                toast('Facebook linked to profile!', {
                    type: 'success',
                });
            })
            .catch(error => {
                toast(error, {
                    type: 'error',
                });
            })
            .finally(() => setIsLinkingFacebook(false));
    };

    const handleUnlinkFacebook = () => {
        setIsUnlinkingFacebook(true);

        unlink(facebookAuthProvider.providerId)
            .then(() => {
                toast('Unlinked Facebook from profile!', {
                    type: 'success',
                });
            })
            .catch(error => {
                toast(error, {
                    type: 'error',
                });
            })
            .finally(() => setIsUnlinkingFacebook(false));
    };

    return (
        <>
            <section className="mt-36 px-4 pt-20 sm:px-8 md:mt-0 md:px-32 lg:px-64 xl:px-96">
                {!isLoggedIn && (
                    <div className="flex w-full grow flex-col items-center justify-center gap-3 p-5 text-center sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                        <Text variant="sub-heading">
                            Sign in to view the challenge.
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
                                    <Button variant="purple" text="Sign in" />
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
                                            className="text-primary"
                                        >
                                            {`@${credential.githubUserName}`}
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
                                {credential.githubUserName !== null && (
                                    <Button
                                        variant="danger"
                                        onClick={handleUnlinkGitHub}
                                        disabled={isUnlinkingGitHub}
                                    >
                                        {isUnlinkingGitHub && (
                                            <Spinner variant="large"></Spinner>
                                        )}
                                        Unlink GitHub
                                    </Button>
                                )}

                                {credential.githubUserName === null && (
                                    <Button
                                        variant="purple"
                                        onClick={handleLinkGitHub}
                                        disabled={isLinkingGitHub}
                                    >
                                        {isLinkingGitHub && (
                                            <Spinner variant="large"></Spinner>
                                        )}
                                        Link GitHub
                                    </Button>
                                )}
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
                                            className="text-primary"
                                        >
                                            {`@${credential.twitterUserName}`}
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
                                {credential.twitterUserName !== null && (
                                    <Button
                                        variant="danger"
                                        onClick={handleUnlinkTwitter}
                                        disabled={isUnlinkingTwitter}
                                    >
                                        {isUnlinkingTwitter && (
                                            <Spinner variant="large"></Spinner>
                                        )}
                                        Unlink Twitter
                                    </Button>
                                )}

                                {credential.twitterUserName === null && (
                                    <Button
                                        variant="purple"
                                        onClick={handleLinkTwitter}
                                        disabled={isLinkingTwitter}
                                    >
                                        {isLinkingTwitter && (
                                            <Spinner variant="large"></Spinner>
                                        )}
                                        Link Twitter
                                    </Button>
                                )}
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
                                            className="text-primary"
                                        >
                                            {`@${credential.facebookUserName}`}
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
                                {credential.facebookUserName !== null && (
                                    <Button
                                        variant="danger"
                                        onClick={handleUnlinkFacebook}
                                        disabled={isUnlinkingFacebook}
                                    >
                                        {isUnlinkingFacebook && (
                                            <Spinner variant="large"></Spinner>
                                        )}
                                        Unlink Facebook
                                    </Button>
                                )}

                                {credential.facebookUserName === null && (
                                    <Button
                                        variant="purple"
                                        onClick={handleLinkFacebook}
                                        disabled={isLinkingFacebook}
                                    >
                                        {isLinkingFacebook && (
                                            <Spinner variant="large"></Spinner>
                                        )}
                                        Link Facebook
                                    </Button>
                                )}
                            </div>
                        </Card>
                    </>
                )}
            </section>
        </>
    );
};

export default UserSocialPage;
