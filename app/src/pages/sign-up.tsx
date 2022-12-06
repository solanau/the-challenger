import Text from 'components/common/text';
import SignUpForm from 'components/sign-up-page/sign-up-form';
import { Formik } from 'formik';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { useState } from 'react';
import { SignUpFormData } from 'types/auth';

const SignUpPage: NextPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { signUp } = useAuth();
    const router = useRouter();

    const handleSignUp = async ({ email, password }: SignUpFormData) => {
        setIsLoading(true);

        signUp(email, password)
            .then(() => router.push('/'))
            .catch(error => alert(error))
            .finally(() => setIsLoading(false));
    };

    return (
        <>
            <section className="mt-36 px-4 pt-20 sm:px-8 md:mt-0 md:px-16 lg:px-32 xl:px-48">
                <div className="flex w-full flex-col gap-6 px-5 sm:px-8 md:px-16 lg:px-32 xl:px-48">
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
                        <SignUpForm disabled={isLoading}></SignUpForm>
                    </Formik>

                    <div>
                        <Text variant="paragraph" className="text-xs">
                            Already registered?
                            <Link href="/login" passHref>
                                <a className="text-primary">
                                    {' '}
                                    Go to login page.
                                </a>
                            </Link>
                        </Text>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SignUpPage;
