import Button from 'components/common/button';
import EnterPasswordDialog from 'components/common/enter-password';
import EnterNewPasswordWithSocialDialog from 'components/common/enter-password-or-social';

import EnterSocialDialog from 'components/common/enter-social';
import Text from 'components/common/text';
import LoginForm from 'components/login-page/login-form';
import { FirebaseError } from 'firebase/app';
import {
    EmailAuthProvider,
    fetchSignInMethodsForEmail,
    linkWithCredential,
    OAuthCredential,
    signInWithEmailAndPassword,
    signInWithPopup
} from 'firebase/auth';
import { Formik } from 'formik';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { useState } from 'react';
import { TbBrandGithub, TbBrandTwitter } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { AuthProviderType } from 'types/api';
import { auth, getSocialProvider, handleSocialError } from 'utils/firebase';

const LoginPage: NextPage = () => {
    const [email, setEmail] = useState('');
    const [socialEmail, setSocialEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isUserNeedPassword, setUserNeedPassword] = useState(false);
    const [isEnteringPassword, setIsEnteringPassword] = useState(false);
    const [isEnteringSocial, setIsEnteringSocial] = useState(false);
    const [userAuthMethods, setUserAuthMethods] = useState(['']);

    const [userCredential, setUserCredential] = useState<OAuthCredential>(null);
    const { logIn } = useAuth();
    const router = useRouter();
    const eventId =
        (router.query.eventId instanceof Array
            ? router.query.eventId[0]
            : router.query.eventId) ?? null;

    const handleLogIn = async data => {
        setIsLoading(true);
        setEmail(data.email);
        logIn(data.email, data.password)
            .then(() => router.push(eventId ? `/events/${eventId}` : '/'))
            .catch(error => {
                fetchSignInMethodsForEmail(auth, data.email)
                    .then(methods => {
                        setUserAuthMethods(methods);
                        // if no methods or ir already have and email and password set up
                        if (!methods.length || methods.includes('password')) {
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
                        } else {
                            setUserNeedPassword(true);
                        }
                    })
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
                    });
            })
            .finally(() => setIsLoading(false));
    };

    const handleLogInWithSocial = (authProviderType: AuthProviderType) => {
        const authProvider = getSocialProvider(authProviderType);
        setIsLoading(true);

        signInWithPopup(auth, authProvider)
            .then(() => router.push(eventId ? `/events/${eventId}` : '/'))
            .catch(error => {
                console.log(error);
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
                        setUserCredential(
                            handleSocialError(error, authProviderType),
                        );
                        setSocialEmail(error.customData.email);
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

    const handleLinkWithNewPasswordEmailSocial = (
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
                email={socialEmail}
                isOpen={isEnteringPassword && !!socialEmail && !!userCredential}
                onClose={(password: string) => {
                    if (!password) return;
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
                    if (!authProviderType) return;
                    handleLinkWithSocial(authProviderType, userCredential);
                }}
            ></EnterSocialDialog>
            <EnterNewPasswordWithSocialDialog
                methods={userAuthMethods}
                isOpen={isUserNeedPassword && !!email}
                onClose={async (
                    authProviderType: AuthProviderType,
                    userPassword: string,
                ) => {
                    if (!authProviderType || !userPassword) return;
                    setUserNeedPassword(false);
                    setIsLoading(true);
                    handleLinkWithNewPasswordEmailSocial(
                        authProviderType,
                        email,
                        userPassword,
                    );
                }}
            ></EnterNewPasswordWithSocialDialog>

            <section className="mt-0 px-8 pt-20 sm:px-16 md:px-32 lg:px-64 xl:px-96 mb-40">
                <div className="flex w-full flex-col gap-6 px-10 sm:px-16 md:px-32 lg:px-64 xl:px-96 justify-center">
                    <h1>
                        <Text variant="heading">Login</Text>
                    </h1>

                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        onSubmit={handleLogIn}
                    >
                        <LoginForm isLoading={isLoading}></LoginForm>
                    </Formik>

                    <Text variant="paragraph" className="text-xs">
                        Not registered yet?
                        <Link
                            href={{
                                pathname: '/sign-up',
                                query: eventId
                                    ? {
                                        eventId,
                                    }
                                    : {},
                            }}
                            passHref
                        >
                            <a className="text-primary"> Go to sign up page.</a>
                        </Link>
                    </Text>

                    <hr></hr>

                    <div className="flex gap-4">
                        <Button
                            icon={TbBrandGithub}
                            variant="transparentpurple"
                            className="w-full md:w-1/2"
                            disabled={isLoading}
                            onClick={() =>
                                handleLogInWithSocial(
                                    AuthProviderType.githubProvider,
                                )
                            }
                        >
                            Log In GitHub
                        </Button>

                        <Button
                            icon={TbBrandTwitter}
                            variant="transparentpurple"
                            className="w-full md:w-1/2"
                            disabled={isLoading}
                            onClick={() =>
                                handleLogInWithSocial(
                                    AuthProviderType.twitterProvider,
                                )
                            }
                        >
                            Log In Twitter
                        </Button>
                        {/* <Button
                            icon={TbBrandFacebook}
                            variant="transparentpurple"
                            className="w-full md:w-auto"
                            disabled={isLoading}
                            onClick={() =>
                                handleLogInWithSocial(
                                    AuthProviderType.facebookProvider,
                                )
                            }
                        >
                            Login with Facebook
                        </Button> */}
                    </div>
                </div>
            </section>
        </>
    );
};

export default LoginPage;
