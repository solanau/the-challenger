import Text from 'components/common/text';
import SignUpForm from 'components/sign-up-page/sign-up-form';
import { FirebaseError } from 'firebase/app';
import { Formik } from 'formik';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { SignUpFormData } from 'types/auth';

const SignUpPage: NextPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { signUp } = useAuth();
    const router = useRouter();
    const eventId =
        (router.query.eventId instanceof Array
            ? router.query.eventId[0]
            : router.query.eventId) ?? null;

    const handleSignUp = async ({ email, password }: SignUpFormData) => {
        setIsLoading(true);

        signUp(email, password)
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

    return (
        <>
            <section className="mt-0 px-8 pt-20 sm:px-16 md:px-32 lg:px-64 xl:px-96 mb-40">
                <div className="flex w-full flex-col gap-6 px-10 sm:px-16 md:px-32 lg:px-64 xl:px-96 justify-center">
                    <h1>
                        <Text variant="heading">Sign up</Text>
                    </h1>

                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        onSubmit={handleSignUp}
                    >
                        <SignUpForm isLoading={isLoading}></SignUpForm>
                    </Formik>

                    <Text variant="paragraph" className="text-xs">
                        Already registered?
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
                            <a className="text-primary underline"> Go to login page.</a>
                        </Link>
                    </Text>
                </div>
            </section>
        </>
    );
};

export default SignUpPage;
