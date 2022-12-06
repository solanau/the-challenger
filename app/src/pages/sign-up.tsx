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
    const { signUp } = useAuth();
    const router = useRouter();

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();

        setIsLoading(true);

        signUp(email, password)
            .then(() => router.push('/'))
            .catch(error => alert(error))
            .finally(() => setIsLoading(false));
    };

    return (
        <>
            <section className="mt-36 px-4 pt-20 sm:px-8 md:mt-0 md:px-16 lg:px-32 xl:px-48">
                <div className='flex w-full flex-col gap-6 px-5 sm:px-8 md:px-16 lg:px-32 xl:px-48'>
                    <h1>
                        <Text variant="heading">Sign up</Text>
                    </h1>

                    <form onSubmit={handleFormSubmit} className="flex gap-6 flex-col w-full">
                        <label className="block">
                            <Text className='mb-2' variant="label">Email</Text>
                            <input
                                type="email"
                                className="flex w-full h-10 p-2 rounded-md text-black"
                                value={email}
                                onChange={ev => setEmail(ev.target.value)}
                            />
                        </label>

                        <label className="block">
                            <Text className='mb-2' variant="label">Password</Text>
                            <input
                                type="password"
                                className="flex w-full h-10 p-2 rounded-md text-black "
                                value={password}
                                onChange={ev => setPassword(ev.target.value)}
                            />
                        </label>

                        <div className="width-full flex flex-row justify-end ">
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
                        <Text variant="paragraph" className="flex flex-col text-center text-xs">
                        Already registered?
                            <Link href="/login" passHref>
                                <a className="text-primary"> Go to login page.</a>
                            </Link>
                        </Text>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LoginPage;
