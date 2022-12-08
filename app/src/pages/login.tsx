import Button from 'components/common/button';
import Card from 'components/common/card';
import EnterPasswordDialog from 'components/common/enter-password';
import EnterSocialDialog from 'components/common/enter-social';
import Text from 'components/common/text';
import { FirebaseError } from 'firebase/app';
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
import { toast } from 'react-toastify';
import { AuthProviderType } from 'types/api';
import {
    auth,
    facebookAuthProvider,
    githubAuthProvider,
    twitterAuthProvider,
} from 'utils/firebase';

const LoginPage: NextPage = () => {
    const [email, setEmail] = useState('');
    const [socialEmail, setSocialEmail] = useState('');
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
    const [isEnteringPassword, setIsEnteringPassword] = useState(false);
    const [isEnteringSocial, setIsEnteringSocial] = useState(false);
    const [userAuthMethods, setUserAuthMethods] = useState(['']);

    const [userCredential, setUserCredential] = useState<OAuthCredential>(null);
    const { logIn } = useAuth();
    const router = useRouter();
    const eventId =
        router.query.eventId instanceof Array
            ? router.query.eventId[0]
            : router.query.eventId;

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

    const handleLogIn = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        logIn(email, password)
            .then(() => router.push(eventId ? `/events/${eventId}` : '/'))
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

    const handleSignInWithSocial = async (
        authProviderType: AuthProviderType,
    ) => {
        const authProvider = getSocialProvider(authProviderType);
        setIsLoading(true);

        signInWithPopup(auth, authProvider)
            .then(() => router.push(eventId ? `/events/${eventId}` : '/'))
            .catch(error => {
                if (
                    error.code ===
                    'auth/account-exists-with-different-credential'
                ) {
                    console.log('JUST TESTING ', error.customData.email);
                    fetchSignInMethodsForEmail(
                        auth,
                        error.customData.email,
                    ).then(methods => {
                        console.log('METHODS', methods);
                        setUserAuthMethods(methods);
                        if (methods.includes('password')) {
                            setIsEnteringPassword(true);
                        } else {
                            setIsEnteringSocial(true);
                        }
                        setUserCredential(
                            OAuthProvider.credentialFromError(error),
                        );
                        setSocialEmail(error.customData.email);
                        console.log('out');
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
        console.log(socialEmail, password, credential);
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                linkWithCredential(result.user, credential);
            })
            .then(() => {
                setIsEnteringPassword(false);
                setUserCredential(null);
                setSocialEmail('');
                router.push(eventId ? `/events/${eventId}` : '/');
            });
    };

    const handleLinkWithSocial = (
        authProviderType: AuthProviderType,
        credential: OAuthCredential,
    ) => {
        const authProvider = getSocialProvider(authProviderType);
        signInWithPopup(auth, authProvider)
            .then(result => {
                linkWithCredential(result.user, credential).then(() => {
                    setIsEnteringSocial(false);
                    setUserCredential(null);
                    setEmail('');
                    router.push(eventId ? `/events/${eventId}` : '/');
                });
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
                    setUserCredential(null);
                    setSocialEmail('');
                    router.push(eventId ? `/events/${eventId}` : '/');
                });
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <>
            <EnterPasswordDialog
                isOpen={isEnteringPassword && !!socialEmail && !!userCredential}
                email={socialEmail}
                onClose={(password: string) => {
                    handleLinkWithEmailPassword(
                        socialEmail,
                        password,
                        userCredential,
                    );
                }}
            ></EnterPasswordDialog>

            <EnterSocialDialog
                methods={userAuthMethods}
                isOpen={isEnteringSocial && !!socialEmail && !!userCredential}
                onClose={(authProviderType: AuthProviderType) => {
                    handleLinkWithSocial(authProviderType, userCredential);
                }}
            ></EnterSocialDialog>

            <section className="mt-36 px-4 pt-20 sm:px-8 md:mt-0 md:px-16 lg:px-32 xl:px-48">
                <div className="flex w-full flex-col gap-6 px-5 sm:px-8 md:px-16 lg:px-32 xl:px-48">
                    <h1>
                        <Text variant="heading">Login</Text>
                    </h1>

                    {!isUsingEmailPasswordProvider && (
                        <div className="flex gap-4">
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
                                onClick={() =>
                                    handleSignInWithSocial(
                                        AuthProviderType.githubProvider,
                                    )
                                }
                            >
                                Sign in with GitHub
                            </Button>

                            <Button
                                variant="orange"
                                disabled={isLoading}
                                onClick={() =>
                                    handleSignInWithSocial(
                                        AuthProviderType.twitterProvider,
                                    )
                                }
                            >
                                Sign in with Twitter
                            </Button>

                            <Button
                                variant="orange"
                                disabled={isLoading}
                                onClick={() =>
                                    handleSignInWithSocial(
                                        AuthProviderType.facebookProvider,
                                    )
                                }
                            >
                                Sign in with Facebook
                            </Button>
                        </div>
                    )}

                    {isUsingEmailPasswordProvider && (
                        <>
                            <form onSubmit={handleLogIn}>
                                <label
                                    htmlFor="credential-email"
                                    className="required block w-full border-none bg-transparent py-2 outline-none"
                                >
                                    Email
                                </label>

                                <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                                    <input
                                        id="credential-email"
                                        type="email"
                                        className="w-full bg-transparent outline-none"
                                        placeholder="Enter an email for the credential"
                                        value={email}
                                        onChange={ev => {
                                            setEmail(ev.target.value);
                                            setSocialEmail(ev.target.value);
                                        }}
                                    />
                                </Card>

                                {isEmailPasswordProviderIncluded && (
                                    <>
                                        <label className="mt-4 mb-2 block">
                                            <label
                                                htmlFor="credential-password"
                                                className="required block w-full border-none bg-transparent py-2 outline-none"
                                            >
                                                Password
                                            </label>
                                            <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                                                <input
                                                    id="credential-password"
                                                    type="password"
                                                    className="w-full bg-transparent outline-none"
                                                    placeholder="Enter an password for the credential"
                                                    value={password}
                                                    onChange={ev =>
                                                        setPassword(
                                                            ev.target.value,
                                                        )
                                                    }
                                                />
                                            </Card>
                                        </label>

                                        <Text variant="label" className="mt-2">
                                            <Link
                                                href="/reset-password"
                                                className="mt-2"
                                            >
                                                <a>Forgot password?</a>
                                            </Link>
                                        </Text>

                                        <div className="width-full flex flex-row justify-end gap-2 pt-4">
                                            <Button
                                                className="w-40"
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
                                                variant="label"
                                                className="mt-2"
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
                                                        <div className="mt-4">
                                                            <Text variant="sub-paragraph">
                                                                Email registered
                                                                to another
                                                                provider.&nbsp;
                                                            </Text>
                                                            <Text variant="sub-paragraph">
                                                                Please set a new
                                                                password and
                                                                then verify with
                                                                one of the valid
                                                                social providers
                                                            </Text>
                                                        </div>
                                                        <label
                                                            htmlFor="credential-new-password"
                                                            className="required block w-full border-none bg-transparent py-2 outline-none"
                                                        >
                                                            Set new password
                                                        </label>

                                                        <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                                                            <input
                                                                id="credential-new-password"
                                                                type="password"
                                                                className="w-full bg-transparent outline-none"
                                                                placeholder="Enter an email for the credential"
                                                                value={password}
                                                                onChange={ev =>
                                                                    setPassword(
                                                                        ev
                                                                            .target
                                                                            .value,
                                                                    )
                                                                }
                                                            />
                                                        </Card>
                                                        <div className="width-full flex flex-row justify-end gap-2 pt-4">
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
                                                                    disabled={
                                                                        isLoading
                                                                    }
                                                                    onClick={() =>
                                                                        handleLinkWithSocialEmail(
                                                                            AuthProviderType.facebookProvider,
                                                                            socialEmail,
                                                                            password,
                                                                        )
                                                                    }
                                                                ></Button>
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
                                                                    disabled={
                                                                        isLoading
                                                                    }
                                                                    onClick={() =>
                                                                        handleLinkWithSocialEmail(
                                                                            AuthProviderType.twitterProvider,
                                                                            socialEmail,
                                                                            password,
                                                                        )
                                                                    }
                                                                ></Button>
                                                            )}
                                                            {userAuthMethods.includes(
                                                                'github.com',
                                                            ) && (
                                                                <Button
                                                                    icon={
                                                                        TbBrandGithub
                                                                    }
                                                                    text={
                                                                        'Verify with Github'
                                                                    }
                                                                    variant="orange"
                                                                    disabled={
                                                                        isLoading
                                                                    }
                                                                    className="mt-4"
                                                                    onClick={() =>
                                                                        handleLinkWithSocialEmail(
                                                                            AuthProviderType.githubProvider,
                                                                            socialEmail,
                                                                            password,
                                                                        )
                                                                    }
                                                                ></Button>
                                                            )}
                                                        </div>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}

                                {isVerifyingEmail && (
                                    <Text variant="label" className="mt-2">
                                        Verifying email...
                                    </Text>
                                )}
                            </form>

                            <Button
                                variant="black"
                                onClick={() =>
                                    setIsUsingEmailPasswordProvider(false)
                                }
                            >
                                Back
                            </Button>
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default LoginPage;
