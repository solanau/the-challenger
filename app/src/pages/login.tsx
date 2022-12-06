/* eslint-disable react/no-unescaped-entities */
import Button from 'components/common/button';
import EnterPasswordDialog from 'components/common/enter-password';
import EnterSocialDialog from 'components/common/enter-social';
import Text from 'components/common/text';
import {
    EmailAuthProvider,
    FacebookAuthProvider,
    fetchSignInMethodsForEmail,
    GithubAuthProvider,
    linkWithCredential,
    OAuthCredential,
    OAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    TwitterAuthProvider,
} from 'firebase/auth';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { FormEvent, useEffect, useState } from 'react';
import { TbBrandFacebook, TbBrandGithub, TbBrandTwitter } from 'react-icons/tb';
import { AuthProviderType } from 'types/api';
import {
    auth,
    facebookAuthProvider,
    githubAuthProvider,
    twitterAuthProvider,
} from 'utils/firebase';

const LoginPage: NextPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isUsingEmailPasswordProvider, setIsUsingEmailPasswordProvider] =
        useState(false);
    const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
    const [isEmailRegistered, setIsEmailRegistered] = useState(false);
    const [
        isEmailPasswordProviderIncluded,
        setIsEmailPasswordProviderIncluded,
    ] = useState(false);
    const [githubUserEmail, setGithubUserEmail] = useState('');
    const [twitterUserEmail, setTwitterUserEmail] = useState('');
    const [facebookUserEmail, setFacebookUserEmail] = useState('');
    const [isEnteringPassword, setIsEnteringPassword] = useState(false);
    const [isEnteringSocial, setIsEnteringSocial] = useState(false);
    const [userAuthMethods, setUserAuthMethods] = useState(['']);

    const [githubUserCredential, setGithubUserCredential] =
        useState<OAuthCredential>(null);
    const [twitterUserCredential, setTwitterUserCredential] =
        useState<OAuthCredential>(null);
    const [facebookUserCredential, setFacebookUserCredential] =
        useState<OAuthCredential>(null);
    const { logIn, signUp } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (email === '') {
            setIsEmailRegistered(false);
            setIsEmailPasswordProviderIncluded(false);
            return;
        }

        setIsVerifyingEmail(true);

        const timeoutRef = setTimeout(() => {
            fetchSignInMethodsForEmail(auth, email)
                .then(methods => {
                    setUserAuthMethods(methods);
                    setIsEmailRegistered(methods.length > 0);
                    setIsEmailPasswordProviderIncluded(
                        methods.includes('password'),
                    );
                })
                .catch(error => console.log('invalid email', error))
                .finally(() => setIsVerifyingEmail(false));
        }, 500);

        return () => clearTimeout(timeoutRef);
    }, [email]);

    const handleLogIn = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        if (isEmailPasswordProviderIncluded) {
            logIn(email, password)
                .then(() => router.push('/'))
                .catch(error => alert(error))
                .finally(() => setIsLoading(false));
        } else {
            signUp(email, password)
                .then(() => router.push('/'))
                .catch(error => {
                    console.log('ERROR ->', error);
                })
                .finally(() => setIsLoading(false));
        }
    };

    const handleSignInWithGitHub = async () => {
        setIsLoading(true);

        signInWithPopup(auth, githubAuthProvider)
            .then(() => router.push('/'))
            .catch(error => {
                if (
                    error.code ===
                    'auth/account-exists-with-different-credential'
                ) {
                    fetchSignInMethodsForEmail(
                        auth,
                        error.customData.email,
                    ).then(methods => {
                        setUserAuthMethods(methods);
                        if (methods.includes('password')) {
                            setIsEnteringPassword(true);
                        } else {
                            setIsEnteringSocial(true);
                        }
                        setGithubUserCredential(
                            OAuthProvider.credentialFromError(error),
                        );
                        setGithubUserEmail(error.customData.email);
                    });
                }
            })
            .finally(() => setIsLoading(false));
    };

    const handleSignInWithTwitter = async () => {
        setIsLoading(true);

        signInWithPopup(auth, twitterAuthProvider)
            .then(() => router.push('/'))
            .catch(error => {
                if (
                    error.code ===
                    'auth/account-exists-with-different-credential'
                ) {
                    fetchSignInMethodsForEmail(
                        auth,
                        error.customData.email,
                    ).then(methods => {
                        setUserAuthMethods(methods);
                        if (methods.includes('password')) {
                            setIsEnteringPassword(true);
                        } else {
                            setIsEnteringSocial(true);
                        }

                        setTwitterUserCredential(
                            TwitterAuthProvider.credentialFromError(error),
                        );
                        setTwitterUserEmail(error.customData.email);
                    });
                }
            })
            .finally(() => setIsLoading(false));
    };

    const handleSignInWithFacebook = async () => {
        setIsLoading(true);

        signInWithPopup(auth, facebookAuthProvider)
            .then(() => router.push('/'))
            .catch(error => {
                if (
                    error.code ===
                    'auth/account-exists-with-different-credential'
                ) {
                    fetchSignInMethodsForEmail(
                        auth,
                        error.customData.email,
                    ).then(methods => {
                        console.log('METHODS 3 -> ', methods);
                        setUserAuthMethods(methods);
                        if (methods.includes('password')) {
                            setIsEnteringPassword(true);
                        } else {
                            setIsEnteringSocial(true);
                        }
                        setFacebookUserCredential(
                            FacebookAuthProvider.credentialFromError(error),
                        );
                        setFacebookUserEmail(error.customData.email);
                    });
                }
            })
            .finally(() => setIsLoading(false));
    };

    const handleLinkWithEmailPassword = (
        email: string,
        password: string,
        credential: OAuthCredential,
    ) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(result => linkWithCredential(result.user, credential))
            .then(() => {
                setIsEnteringPassword(false);

                setGithubUserCredential(null);
                setGithubUserEmail(null);

                setFacebookUserCredential(null);
                setFacebookUserEmail(null);

                setTwitterUserCredential(null);
                setTwitterUserEmail(null);

                router.push('/');
            });
    };

    const getSocialProvider = (
        authProviderType: AuthProviderType,
    ): TwitterAuthProvider | FacebookAuthProvider | GithubAuthProvider => {
        switch (authProviderType) {
            case AuthProviderType.githubProvider:
                return githubAuthProvider;
            case AuthProviderType.facebookProvider:
                return facebookAuthProvider;
            case AuthProviderType.twitterProvider:
                return twitterAuthProvider;
        }
    };

    const handleLinkWithSocial = (
        authProviderType: AuthProviderType,
        credential: OAuthCredential,
    ) => {
        // EmailAuthProvider.credential(email,password);
        const authProvider = getSocialProvider(authProviderType);
        signInWithPopup(auth, authProvider)
            .then(result => {
                linkWithCredential(result.user, credential).then(() => {
                    setIsEnteringSocial(false);

                    setGithubUserCredential(null);
                    setGithubUserEmail(null);

                    setFacebookUserCredential(null);
                    setFacebookUserEmail(null);

                    setTwitterUserCredential(null);
                    setTwitterUserEmail(null);

                    router.push('/');
                });
            })
            .catch(error => {
                console.log('ERROR - CONTACT ADMIN!', error);
            })
            .finally(() => setIsLoading(false));
    };

    const handleLinkWithSocialEmail = (
        authProviderType: AuthProviderType,
        email: string,
        password: string,
    ) => {
        const credential = EmailAuthProvider.credential(email, password);
        const authProvider = getSocialProvider(authProviderType);
        signInWithPopup(auth, authProvider)
            .then(result => {
                linkWithCredential(result.user, credential).then(() => {
                    setIsEnteringSocial(false);

                    setGithubUserCredential(null);
                    setGithubUserEmail(null);

                    setFacebookUserCredential(null);
                    setFacebookUserEmail(null);

                    setTwitterUserCredential(null);
                    setTwitterUserEmail(null);

                    router.push('/');
                });
            })
            .catch(error => {
                console.log('ERROR - CONTACT ADMIN!', error);
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <>
            <EnterPasswordDialog
                isOpen={
                    isEnteringPassword &&
                    !!githubUserEmail &&
                    !!githubUserCredential
                }
                email={githubUserEmail}
                onClose={(password: string) => {
                    handleLinkWithEmailPassword(
                        githubUserEmail,
                        password,
                        githubUserCredential,
                    );
                }}
            ></EnterPasswordDialog>

            <EnterPasswordDialog
                isOpen={
                    isEnteringPassword &&
                    !!twitterUserEmail &&
                    !!twitterUserCredential
                }
                email={twitterUserEmail}
                onClose={(password: string) => {
                    handleLinkWithEmailPassword(
                        twitterUserEmail,
                        password,
                        twitterUserCredential,
                    );
                }}
            ></EnterPasswordDialog>

            <EnterPasswordDialog
                isOpen={
                    isEnteringPassword &&
                    !!facebookUserEmail &&
                    !!facebookUserCredential
                }
                email={facebookUserEmail}
                onClose={(password: string) => {
                    handleLinkWithEmailPassword(
                        facebookUserEmail,
                        password,
                        facebookUserCredential,
                    );
                }}
            ></EnterPasswordDialog>

            <EnterSocialDialog
                methods={userAuthMethods}
                isOpen={
                    isEnteringSocial &&
                    !!twitterUserEmail &&
                    !!twitterUserCredential
                }
                onClose={(authProviderType: AuthProviderType) => {
                    handleLinkWithSocial(
                        authProviderType,
                        twitterUserCredential,
                    );
                }}
            ></EnterSocialDialog>

            <EnterSocialDialog
                methods={userAuthMethods}
                isOpen={
                    isEnteringSocial &&
                    !!facebookUserEmail &&
                    !!facebookUserCredential
                }
                onClose={(authProviderType: AuthProviderType) => {
                    handleLinkWithSocial(
                        authProviderType,
                        facebookUserCredential,
                    );
                }}
            ></EnterSocialDialog>

            <EnterSocialDialog
                methods={userAuthMethods}
                isOpen={
                    isEnteringSocial &&
                    !!githubUserEmail &&
                    !!githubUserCredential
                }
                onClose={(authProviderType: AuthProviderType) => {
                    handleLinkWithSocial(
                        authProviderType,
                        githubUserCredential,
                    );
                }}
            ></EnterSocialDialog>

            <section className="mt-36 px-4 pt-20 sm:px-8 md:mt-0 md:px-16 lg:px-32 xl:px-48">
                <h1>
                    <Text variant="heading">Login</Text>
                </h1>

                {!isUsingEmailPasswordProvider && (
                    <div>
                        <Button
                            variant="orange"
                            disabled={isLoading}
                            onClick={() =>
                                setIsUsingEmailPasswordProvider(true)
                            }
                        >
                            Sign in with email/password
                        </Button>

                        <Button
                            variant="orange"
                            disabled={isLoading}
                            onClick={handleSignInWithGitHub}
                        >
                            Sign in with GitHub
                        </Button>

                        <Button
                            variant="orange"
                            disabled={isLoading}
                            onClick={handleSignInWithTwitter}
                        >
                            Sign in with Twitter
                        </Button>

                        <Button
                            variant="orange"
                            disabled={isLoading}
                            onClick={handleSignInWithFacebook}
                        >
                            Sign in with Facebook
                        </Button>
                    </div>
                )}

                {isUsingEmailPasswordProvider && (
                    <>
                        <Button
                            variant="black"
                            onClick={() =>
                                setIsUsingEmailPasswordProvider(false)
                            }
                        >
                            Back
                        </Button>

                        <form onSubmit={handleLogIn}>
                            <label className="block">
                                <Text variant="label">Email</Text>
                                <input
                                    type="email"
                                    className="text-black"
                                    value={email}
                                    onChange={ev => setEmail(ev.target.value)}
                                />
                            </label>

                            {isEmailPasswordProviderIncluded && (
                                <>
                                    <label className="block">
                                        <Text variant="label">Password</Text>
                                        <input
                                            type="password"
                                            className="text-black"
                                            value={password}
                                            onChange={ev =>
                                                setPassword(ev.target.value)
                                            }
                                        />
                                    </label>

                                    <Link href="/reset-password">
                                        <a>Forgot password?</a>
                                    </Link>

                                    <div>
                                        <Button
                                            variant="orange"
                                            type="submit"
                                            disabled={isLoading}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </>
                            )}

                            {email !== '' && !isVerifyingEmail && (
                                <>
                                    {!isEmailRegistered && (
                                        <Text
                                            variant="paragraph"
                                            className="text-xs"
                                        >
                                            Email is not registered.&nbsp;
                                            <Link href="/sign-up" passHref>
                                                <a className="text-primary">
                                                    Visit sign up page.
                                                </a>
                                            </Link>
                                        </Text>
                                    )}

                                    {isEmailRegistered && (
                                        <>
                                            {!isEmailPasswordProviderIncluded && (
                                                <>
                                                    <Text variant="sub-paragraph">
                                                        Email registered to
                                                        another provider.&nbsp;
                                                    </Text>
                                                    <Text variant="sub-paragraph">
                                                        Please set a new
                                                        password and then verify
                                                        with one of the valid
                                                        social providers
                                                    </Text>
                                                    <label className="mt-2 block">
                                                        <Text variant="label">
                                                            Set new password
                                                        </Text>
                                                        <input
                                                            type="password"
                                                            className="text-black"
                                                            value={password}
                                                            onChange={ev =>
                                                                setPassword(
                                                                    ev.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                    {userAuthMethods.includes(
                                                        'facebook.com',
                                                    ) && (
                                                        <Button
                                                            icon={
                                                                TbBrandFacebook
                                                            }
                                                            text={
                                                                'Verify with Facebook'
                                                            }
                                                            variant="orange"
                                                            className="mt-4"
                                                            disabled={isLoading}
                                                            onClick={() =>
                                                                handleLinkWithSocialEmail(
                                                                    AuthProviderType.facebookProvider,
                                                                    email,
                                                                    password,
                                                                )
                                                            }
                                                        >
                                                            <TbBrandFacebook
                                                                size={35}
                                                            />
                                                        </Button>
                                                    )}
                                                    {userAuthMethods.includes(
                                                        'twitter.com',
                                                    ) && (
                                                        <Button
                                                            icon={
                                                                TbBrandTwitter
                                                            }
                                                            text={
                                                                'Verify with Twitter'
                                                            }
                                                            variant="orange"
                                                            className="mt-4"
                                                            disabled={isLoading}
                                                            onClick={() =>
                                                                handleLinkWithSocialEmail(
                                                                    AuthProviderType.twitterProvider,
                                                                    email,
                                                                    password,
                                                                )
                                                            }
                                                        >
                                                            <TbBrandTwitter
                                                                size={35}
                                                            />
                                                        </Button>
                                                    )}
                                                    {userAuthMethods.includes(
                                                        'github.com',
                                                    ) && (
                                                        <Button
                                                            icon={TbBrandGithub}
                                                            text={
                                                                'Verify with Github'
                                                            }
                                                            variant="orange"
                                                            disabled={isLoading}
                                                            className="mt-4"
                                                            onClick={() =>
                                                                handleLinkWithSocialEmail(
                                                                    AuthProviderType.githubProvider,
                                                                    email,
                                                                    password,
                                                                )
                                                            }
                                                        >
                                                            <TbBrandGithub
                                                                size={35}
                                                            />
                                                        </Button>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    )}
                                </>
                            )}

                            {isVerifyingEmail && (
                                <Text variant="paragraph">
                                    Verifying email...
                                </Text>
                            )}
                        </form>
                    </>
                )}
            </section>
        </>
    );
};

export default LoginPage;
