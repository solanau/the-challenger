import { useLeaderBoard } from 'hooks/use-leader-board';
import Link from 'next/link';
import { useAuth } from 'providers/AuthProvider';
import { useMemo, useRef, useState } from 'react';
import { FaGlobe, FaTwitter } from 'react-icons/fa';
import {
    MdLogin,
    MdLogout,
    MdOutlineManageAccounts,
    MdSettings,
} from 'react-icons/md';
import Button from '../button';
import Card from '../card';
import Text from '../text';

interface OverflowMenuProps {
    eventId?: string;
    isEventPage?: boolean;
}

const OverflowMenu = ({ eventId, isEventPage = false }: OverflowMenuProps) => {
    const buttonRef = useRef();
    const [menuOpen, setMenuOpen] = useState(false);
    const { credential, user, logOut } = useAuth();
    const userId = credential?.id ?? null;
    const leaderBoard = useLeaderBoard(eventId, 'individual');
    const rank = useMemo(() => {
        if (leaderBoard === null) {
            return null;
        }

        const participantIndex = leaderBoard?.participants.findIndex(
            participant => participant.userId === user?.id,
        );

        if (participantIndex === -1) {
            return null;
        }

        return participantIndex + 1;
    }, [user?.id, leaderBoard]);
    const totalPoints = useMemo(() => {
        const participantIndex = leaderBoard?.participants.findIndex(
            participant => participant.userId === user?.id,
        );

        if (participantIndex === -1) {
            return null;
        }

        return leaderBoard?.participants[participantIndex].points;
    }, [user?.id, leaderBoard?.participants]);

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

                                            <Link
                                                href={{
                                                    pathname: `/${user.userName}`,
                                                    query: eventId
                                                        ? {
                                                              eventId,
                                                          }
                                                        : {},
                                                }}
                                                passHref
                                            >
                                                <a
                                                    onClick={() =>
                                                        setMenuOpen(false)
                                                    }
                                                >
                                                    <Text
                                                        variant="label"
                                                        className="lowercase text-primary underline"
                                                    >
                                                        {`@${user.userName}`}
                                                    </Text>
                                                </a>
                                            </Link>
                                            {rank && totalPoints && (
                                                <Text variant="label">{`Rank: #${rank}. (${totalPoints} points)`}</Text>
                                            )}

                                            <Link
                                                href={{
                                                    pathname: `/users/${userId}/settings`,
                                                    query: eventId
                                                        ? {
                                                              eventId,
                                                          }
                                                        : {},
                                                }}
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

                                            <Link
                                                href={{
                                                    pathname: `/users/${userId}/social`,
                                                    query: eventId
                                                        ? {
                                                              eventId,
                                                          }
                                                        : {},
                                                }}
                                                passHref
                                            >
                                                <a className="flex flex-row justify-end">
                                                    <Button
                                                        text="Manage Social"
                                                        icon={FaTwitter}
                                                        variant="orange"
                                                        className="mt-2 !w-full"
                                                        onClick={() =>
                                                            setMenuOpen(false)
                                                        }
                                                    />
                                                </a>
                                            </Link>

                                            {isEventPage && user.isAdmin && (
                                                <Link
                                                    href={{
                                                        pathname: `/`,
                                                    }}
                                                    passHref
                                                >
                                                    <a className="flex flex-row justify-end">
                                                        <Button
                                                            text="View global page"
                                                            icon={FaGlobe}
                                                            variant="transparent"
                                                            className="mt-2 !w-full"
                                                            onClick={() =>
                                                                setMenuOpen(
                                                                    false,
                                                                )
                                                            }
                                                        />
                                                    </a>
                                                </Link>
                                            )}

                                            <Button
                                                text="Log out"
                                                icon={MdLogout}
                                                variant="danger"
                                                className="mt-2 !w-full"
                                                onClick={logOut}
                                            />
                                        </>
                                    )}

                                    {!userId && (
                                        <div>
                                            <Text
                                                variant="nav-heading"
                                                className="text-secondary"
                                            >
                                                New to The Challenger?
                                            </Text>
                                            <Text
                                                variant="paragraph"
                                                className="mt-2"
                                            >
                                                <Link
                                                    href={{
                                                        pathname: '/sign-up',
                                                        query: eventId
                                                            ? {
                                                                  eventId,
                                                              }
                                                            : {},
                                                    }}
                                                    passHref
                                                >
                                                    <a>
                                                        <Button
                                                            text="Sign Up"
                                                            icon={MdLogin}
                                                            variant="black"
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
                                            <Text
                                                variant="nav-heading"
                                                className="mt-4 text-secondary"
                                            >
                                                Already signed up?
                                            </Text>
                                            <Text
                                                variant="paragraph"
                                                className="mt-2"
                                            >
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
                                                    <a>
                                                        <Button
                                                            text="Login"
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

                                    {userId && !user && (
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
                                                href={{
                                                    pathname: `/users/${userId}/settings`,
                                                    query: eventId
                                                        ? {
                                                              eventId,
                                                          }
                                                        : {},
                                                }}
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

                                            <Link
                                                href={{
                                                    pathname: `/users/${userId}/social`,
                                                    query: eventId
                                                        ? {
                                                              eventId,
                                                          }
                                                        : {},
                                                }}
                                                passHref
                                            >
                                                <a className="flex flex-row justify-end">
                                                    <Button
                                                        text="Manage Social"
                                                        icon={FaTwitter}
                                                        variant="orange"
                                                        className="mt-2 !w-full"
                                                        onClick={() =>
                                                            setMenuOpen(false)
                                                        }
                                                    />
                                                </a>
                                            </Link>
                                            {eventId && user?.isAdmin && (
                                                <Link
                                                    href={{
                                                        pathname: `/`,
                                                    }}
                                                    passHref
                                                >
                                                    <a className="flex flex-row justify-end">
                                                        <Button
                                                            text="View global page"
                                                            icon={FaGlobe}
                                                            variant="transparent"
                                                            className="mt-2 !w-full"
                                                            onClick={() =>
                                                                setMenuOpen(
                                                                    false,
                                                                )
                                                            }
                                                        />
                                                    </a>
                                                </Link>
                                            )}

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
