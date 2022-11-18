/* eslint-disable react/no-unescaped-entities */
import Button from 'components/common/button';
import Text from 'components/common/text';
import { NextPage } from 'next';
import { useAuth } from 'providers/AuthProvider';
import { FormEvent, useState } from 'react';

const LoginPage: NextPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { logIn } = useAuth();

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const response = await logIn(email, password);

        console.log(response);
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
                        <Button variant="orange" type="submit">
                            Submit
                        </Button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default LoginPage;
