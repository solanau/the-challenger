import { useCurrentUser } from 'hooks/use-current-user';
import { useLeaderBoard } from 'hooks/use-leader-board';
import Link from 'next/link';
import { useAuth } from 'providers/AuthProvider';
import { useMemo, useRef, useState } from 'react';
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
    eventId: string;
}

const OverflowMenu = ({ eventId }: OverflowMenuProps) => {
    const buttonRef = useRef();
    const [menuOpen, setMenuOpen] = useState(false);
    const {
        user: { uid },
        logOut,
    } = useAuth();
    const user = useCurrentUser();
    const leaderBoard = useLeaderBoard(eventId, 'individual');
    const rank = useMemo(() => {
        const participantIndex = leaderBoard?.participants.findIndex(
            participant => participant.userId === user?.id,
        );

        if (participantIndex === -1) {
            return null;
        }

        return participantIndex + 1;
    }, [user?.id, leaderBoard?.participants]);
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
                                            {rank && totalPoints && (
                                                <div>
                                                    <Text variant="label">{`Rank: #${rank}. (${totalPoints} points)`}</Text>
                                                </div>
                                            )}
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
                                                Sign in with GitHub
                                            </Text>
                                            <Text
                                                variant="label"
                                                className="!normal-case text-secondary"
                                            >
                                                Connect your GitHub account for
                                                an enhanced user experience,
                                                including the ability to create
                                                new and claim completed
                                                bounties.
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
