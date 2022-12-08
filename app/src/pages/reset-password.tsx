import Text from 'components/common/text';
import ResetPasswordForm from 'components/reset-password-page/reset-password-form';
import { FirebaseError } from 'firebase/app';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Formik } from 'formik';
import { NextPage } from 'next';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from 'utils/firebase';

const ResetPasswordPage: NextPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleFormSubmit = async ({ email }: { email: string }) => {
        setIsLoading(true);

        sendPasswordResetEmail(auth, email)
            .then(() =>
                toast('Reset password email sent!', {
                    type: 'success',
                }),
            )
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
            <section className="mt-36 px-4 pt-20 sm:px-8 md:mt-0 md:px-16 lg:px-32 xl:px-48">
                <h1>
                    <Text variant="heading">Reset your password</Text>
                </h1>

                <Formik
                    initialValues={{
                        email: '',
                    }}
                    onSubmit={handleFormSubmit}
                >
                    <ResetPasswordForm
                        isLoading={isLoading}
                    ></ResetPasswordForm>
                </Formik>
            </section>
        </>
    );
};

export default ResetPasswordPage;
