/* eslint-disable indent */
import Link from 'next/link';
import { useAuth } from 'providers/AuthProvider';
import { useRef, useState } from 'react';
import { MdLogin, MdLogout, MdOutlineManageAccounts } from 'react-icons/md';
import Button from '../button';
import Card from '../card';
import Text from '../text';

const OverflowMenu = () => {
    const buttonRef = useRef();
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logOut } = useAuth();

    return (
        <>
            <div className="dropdown-end dropdown">
                <Button
                    variant="orange"
                    icon={MdOutlineManageAccounts}
                    onClick={() => setMenuOpen(true)}
                    buttonRef={buttonRef}
                />

                {menuOpen && (
                    <Card className="bg-opacity-85 dropdown-content mt-3 block w-[calc(100vw-3rem)] !bg-[#232225] sm:w-80">
                        <div className="flex flex-col gap-3 p-5">
                            <div className="flex items-center justify-between">
                                <div className="flex w-full flex-col gap-1">
                                    <Text
                                        variant="label"
                                        className="text-secondary"
                                    >
                                        Profile
                                    </Text>
                                    <Text
                                        variant="nav-heading"
                                        className={user.uid && 'text-primary'}
                                    >
                                        {user.uid ? (
                                            <Link
                                                href={`/${user.uid}`}
                                                onClick={() =>
                                                    setMenuOpen(false)
                                                }
                                                passHref
                                            >
                                                {user.email}
                                            </Link>
                                        ) : (
                                            'Sign in with GitHub'
                                        )}
                                    </Text>
                                    {user.uid ? (
                                        <div className="flex flex-row items-center gap-1">
                                            user logged in
                                        </div>
                                    ) : (
                                        <Text
                                            variant="label"
                                            className="!normal-case text-secondary"
                                        >
                                            Connect your GitHub account for an
                                            enhanced user experience, including
                                            the ability to create new and claim
                                            completed bounties.
                                        </Text>
                                    )}
                                </div>
                                {/* {session && (
                                <Image
                                    alt="Avatar"
                                    src={session.user.image}
                                    height={40}
                                    className="aspect-square"
                                    style={{ borderRadius: '50%' }}
                                />
                            )} */}
                            </div>

                            {user.uid && (
                                <Button
                                    text="Log out"
                                    icon={MdLogout}
                                    variant="danger"
                                    className="!w-full"
                                    onClick={logOut}
                                />
                            )}

                            {!user.uid && (
                                <Link href="/login" passHref>
                                    <a className="flex flex-row justify-end">
                                        <Button
                                            text="Sign in"
                                            icon={MdLogin}
                                            variant="orange"
                                            className="!w-full"
                                            onClick={() => setMenuOpen(false)}
                                        />
                                    </a>
                                </Link>
                            )}
                        </div>
                        <div className="h-px w-full bg-line" />
                    </Card>
                )}
            </div>
        </>
    );
};

export default OverflowMenu;
