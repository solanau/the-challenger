/* eslint-disable react/no-unescaped-entities */
import Button from 'components/common/button';
import Text from 'components/common/text';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { FormEvent, useState } from 'react';

const LoginPage: NextPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { logIn } = useAuth();
    const router = useRouter();

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();

        setIsLoading(true);

        logIn(email, password)
            .then(() => router.push('/'))
            .catch(error => alert(error))
            .finally(() => setIsLoading(false));
    };

    return (
        <>
            <section className="mt-36 px-4 pt-20 sm:px-8 md:mt-0 md:px-16 lg:px-32 xl:px-48">
                <h1>
                    <Text variant="heading">Login</Text>
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

                    <label className="block">
                        <Text variant="label">Password</Text>
                        <input
                            type="password"
                            className="text-black"
                            value={password}
                            onChange={ev => setPassword(ev.target.value)}
                        />
                    </label>

                    <div>
                        <Button
                            variant="orange"
                            type="submit"
                            disabled={isLoading}
                        >
                            Submit
                        </Button>
                    </div>
                </form>

                <div>
                    <Text variant="paragraph" className="text-xs">
                        Haven't signed up yet?
                        <Link href="/sign-up" passHref>
                            <a className="text-primary"> Visit sign up page.</a>
                        </Link>
                    </Text>
                </div>
            </section>
        </>
    );
};

export default LoginPage;
