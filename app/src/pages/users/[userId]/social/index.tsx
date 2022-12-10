import Button from 'components/common/button';
import Text from 'components/common/text';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
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
                        <h1>
                            <Text variant="heading">Socials</Text>
                        </h1>

                        <div>
                            {credential.githubUserName !== null && (
                                <div>GitHub: {credential.githubUserName}</div>
                            )}

                            {credential.githubUserName === null && (
                                <div>
                                    Link GitHub
                                    <Button
                                        variant="orange"
                                        onClick={handleLinkGitHub}
                                    >
                                        Link GitHub
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div>
                            {credential.twitterUserName !== null && (
                                <div>Twitter: {credential.twitterUserName}</div>
                            )}

                            {credential.twitterUserName === null && (
                                <div>
                                    Link Twitter
                                    <Button
                                        variant="orange"
                                        onClick={handleLinkTwitter}
                                    >
                                        Link Twitter
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div>
                            {credential.facebookUserName !== null && (
                                <div>
                                    Facebook: {credential.facebookUserName}
                                </div>
                            )}

                            {credential.facebookUserName === null && (
                                <div>
                                    Link Facebook
                                    <Button
                                        variant="orange"
                                        onClick={handleLinkFacebook}
                                    >
                                        Link Facebook
                                    </Button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </section>
        </>
    );
};

export default UserSocialPage;
