import Button from 'components/common/button';
import Text from 'components/common/text';
import { useCurrentUser } from 'hooks/use-current-user';
import { setUser } from 'lib/api';
import { NextPage } from 'next';
import Link from 'next/link';
import { useAuth } from 'providers/AuthProvider';
import { FormEvent, useMemo, useState } from 'react';
import { TbBrandGithub } from 'react-icons/tb';

const UserProfilePage: NextPage = () => {
    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [walletPublicKey, setWalletPublicKey] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { isLoggedIn } = useAuth();
    const user = useCurrentUser();

    useMemo(() => {
        setFullName(user?.fullName ?? '');
        setUserName(user?.userName ?? '');
        setWalletPublicKey(user?.walletPublicKey ?? '');
    }, [user?.fullName, user?.userName, user?.walletPublicKey]);

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();

        setIsLoading(true);

        setUser({ fullName, userName, walletPublicKey })
            .then(() => alert('Changes successfully saved!'))
            .catch(error => alert(error))
            .finally(() => setIsLoading(false));
    };

    return (
        <>
            <section className="mt-36 px-4 pt-20 sm:px-8 md:mt-0 md:px-16 lg:px-32 xl:px-48">
                {!isLoggedIn && (
                    <div className="flex w-full grow flex-col items-center justify-center gap-3 p-5 text-center sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                        <TbBrandGithub size={35} />
                        <Text variant="sub-heading">
                            Sign in with GitHub to view the challenge.
                        </Text>

                        <div className="flex flex-row gap-2">
                            <Link href="/" passHref>
                                <a>
                                    <Button
                                        variant="transparent"
                                        text="Go back"
                                    />
                                </a>
                            </Link>
                            <Link href="/login" passHref>
                                <a>
                                    <Button variant="orange" text="Sign in" />
                                </a>
                            </Link>
                        </div>
                    </div>
                )}

                {isLoggedIn && (
                    <>
                        <h1>
                            <Text variant="heading">Profile Settings</Text>
                        </h1>

                        <form onSubmit={handleFormSubmit}>
                            <label className="block">
                                <Text variant="label">Full Name *</Text>
                                <input
                                    type="text"
                                    className="text-black"
                                    value={fullName}
                                    onChange={ev =>
                                        setFullName(ev.target.value)
                                    }
                                    required
                                />
                            </label>

                            <label className="block">
                                <Text variant="label">User Name *</Text>
                                <input
                                    type="text"
                                    className="text-black"
                                    value={userName}
                                    onChange={ev =>
                                        setUserName(ev.target.value)
                                    }
                                    required
                                />
                            </label>

                            <label className="block">
                                <Text variant="label">Wallet Public Key *</Text>
                                <input
                                    type="text"
                                    className="text-black"
                                    value={walletPublicKey}
                                    onChange={ev =>
                                        setWalletPublicKey(ev.target.value)
                                    }
                                    required
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
                    </>
                )}
            </section>
        </>
    );
};

export default UserProfilePage;
