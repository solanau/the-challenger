import Text from 'components/common/text';
import SignUpForm from 'components/sign-up-page/sign-up-form';
import { Formik } from 'formik';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { SignUpFormData } from 'types/auth';
import * as Yup from 'yup';

const SignUpPage: NextPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { signUp } = useAuth();
    const router = useRouter();
    const eventId =
        router.query.eventId instanceof Array
            ? router.query.eventId[0]
            : router.query.eventId;

    const handleSignUp = async ({ email, password }: SignUpFormData) => {
        setIsLoading(true);

        signUp(email, password)
            .then(() => router.push(eventId ? `/events/${eventId}` : '/'))
            .catch(error => {
                toast(error, {
                    type: 'error',
                });
            })
            .finally(() => setIsLoading(false));
    };

    const SignupSchema = Yup.object().shape({
        password: Yup.string()
            .required('No password provided.')
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
        email: Yup.string().email('Invalid email').required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    return (
        <>
            <section className="mt-0 px-4 pt-20 sm:px-8 md:px-16 lg:px-32 xl:px-48">
                <div className="flex w-full flex-col gap-6 px-5 sm:px-8 md:px-16 lg:px-32 xl:px-48">
                    <h1>
                        <Text variant="heading">Sign up</Text>
                    </h1>

                    <Formik
                        validationSchema={SignupSchema}
                        initialValues={{
                            email: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        onSubmit={handleSignUp}
                    >
                        {({ errors, touched, validateForm }) => (
                            <SignUpForm
                                isLoading={isLoading}
                                errors={errors}
                                touched={touched}
                            ></SignUpForm>
                        )}
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
                            <a className="text-primary"> Go to login page.</a>
                        </Link>
                    </Text>
                </div>
            </section>
        </>
    );
};

export default SignUpPage;
