/* eslint-disable react/no-unescaped-entities */
import Button from 'components/common/button';
import Text from 'components/common/text';
import { sendPasswordResetEmail } from 'firebase/auth';
import { NextPage } from 'next';
import { FormEvent, useState } from 'react';
import { auth } from 'utils/firebase';

const ResetPasswordPage: NextPage = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();

        setIsLoading(true);

        sendPasswordResetEmail(auth, email)
            .then(() => alert('Reset password email sent!'))
            .catch(error => {
                alert(error);
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <>
            <section className="mt-36 px-4 pt-20 sm:px-8 md:mt-0 md:px-16 lg:px-32 xl:px-48">
                <h1>
                    <Text variant="heading">Reset your password</Text>
                </h1>

                <form onSubmit={handleFormSubmit}>
                    <label className="block">
                        <Text variant="label">Email</Text>
                        <input
                            type="email"
                            className="text-black"
                            value={email}
                            onChange={ev => setEmail(ev.target.value)}
                        />
                    </label>

                    <div>
                        <Button
                            variant="orange"
                            type="submit"
                            disabled={isLoading}
                        >
                            Send password reset email
                        </Button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default ResetPasswordPage;
