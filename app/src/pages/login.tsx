import Text from 'components/common/text';
import LoginForm from 'components/login-page/login-form';
import { Formik } from 'formik';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { useState } from 'react';
import { LoginFormData } from 'types/auth';

const LoginPage: NextPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { logIn } = useAuth();
    const router = useRouter();

    const handleLogIn = ({ email, password }: LoginFormData) => {
        setIsLoading(true);

        logIn(email, password)
            .then(() => router.push('/'))
            .catch(error => alert(error))
            .finally(() => setIsLoading(false));
    };

    return (
        <>
            <section className="mt-36 px-4 pt-20 sm:px-8 md:mt-0 md:px-16 lg:px-32 xl:px-48">
                <div className="flex w-full flex-col gap-6 px-5 sm:px-8 md:px-16 lg:px-32 xl:px-48">
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
                        <LoginForm disabled={isLoading}></LoginForm>
                    </Formik>

                    <div>
                        <Text variant="paragraph" className="text-xs">
                            Haven't signed up yet?
                            <Link href="/sign-up" passHref>
                                <a className="text-primary">
                                    {' '}
                                    Visit sign up page.
                                </a>
                            </Link>
                        </Text>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LoginPage;
