import { useCurrentUser } from 'hooks/use-current-user';
import Link from 'next/link';
import { useAuth } from 'providers/AuthProvider';
import { useRef, useState } from 'react';
import {
    MdLogin,
    MdLogout,
    MdOutlineManageAccounts,
    MdSettings,
} from 'react-icons/md';
import Button from '../button';
import Card from '../card';
import Text from '../text';

const OverflowMenu = () => {
    const buttonRef = useRef();
    const [menuOpen, setMenuOpen] = useState(false);
    const {
        user: { uid },
        logOut,
    } = useAuth();
    const user = useCurrentUser();

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
                                    {user && (
                                        <>
                                            <Text
                                                variant="nav-heading"
                                                className="capitalize text-secondary"
                                            >
                                                {user.fullName}
                                            </Text>
                                            <Text
                                                variant="label"
                                                className="lowercase text-primary underline"
                                            >
                                                <Link
                                                    onClick={() =>
                                                        setMenuOpen(false)
                                                    }
                                                    href={`/${user.userName}`}
                                                    passHref
                                                >
                                                    {`@${user.userName}`}
                                                </Link>
                                            </Text>
                                            <Link
                                                href="/users/profile-settings"
                                                passHref
                                            >
                                                <a className="flex flex-row justify-end">
                                                    <Button
                                                        text="Edit Profile"
                                                        icon={MdSettings}
                                                        variant="orange"
                                                        className="mt-2 !w-full"
                                                        onClick={() =>
                                                            setMenuOpen(false)
                                                        }
                                                    />
                                                </a>
                                            </Link>
                                            <Button
                                                text="Log out"
                                                icon={MdLogout}
                                                variant="danger"
                                                className="mt-2 !w-full"
                                                onClick={logOut}
                                            />
                                        </>
                                    )}

                                    {!uid && (
                                        <div>
                                            <Text
                                                variant="nav-heading"
                                                className="text-secondary"
                                            >
                                                Sign in
                                            </Text>
                                            <Text
                                                variant="label"
                                                className="!normal-case text-secondary"
                                            >
                                                Connect and earn your spot in
                                                the leaderboard by solving
                                                challenges.
                                            </Text>
                                            <Text
                                                variant="paragraph"
                                                className="mt-2"
                                            >
                                                <Link href="/login" passHref>
                                                    <a>
                                                        <Button
                                                            text="Sign in"
                                                            icon={MdLogin}
                                                            variant="orange"
                                                            className="!w-full"
                                                            onClick={() =>
                                                                setMenuOpen(
                                                                    false,
                                                                )
                                                            }
                                                        />
                                                    </a>
                                                </Link>
                                            </Text>
                                        </div>
                                    )}

                                    {uid && !user && (
                                        <div>
                                            <Text
                                                variant="nav-heading"
                                                className="text-secondary"
                                            >
                                                Set up your profile.
                                            </Text>
                                            <Text
                                                variant="label"
                                                className="!normal-case text-secondary"
                                            >
                                                You will need to set up your
                                                profile in order to start doing
                                                challenges.
                                            </Text>
                                            <Link
                                                href="/users/profile-settings"
                                                passHref
                                            >
                                                <a className="flex flex-row justify-end">
                                                    <Button
                                                        text="Set up profile"
                                                        icon={MdSettings}
                                                        variant="orange"
                                                        className="mt-2 !w-full"
                                                        onClick={() =>
                                                            setMenuOpen(false)
                                                        }
                                                    />
                                                </a>
                                            </Link>
                                            <Button
                                                text="Log out"
                                                icon={MdLogout}
                                                variant="danger"
                                                className="mt-2 !w-full"
                                                onClick={logOut}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="h-px w-full bg-line" />
                    </Card>
                )}
            </div>
        </>
    );
};

export default OverflowMenu;
