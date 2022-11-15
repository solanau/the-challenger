/* eslint-disable indent */
import { MdLogout, MdOutlineManageAccounts } from 'react-icons/md';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRef, useState } from 'react';

import Button from '../button';
import Card from '../card';
import Chip from '../chip';
import Image from '../image';
import Link from 'next/link';
import { TbBrandGithub } from 'react-icons/tb';
import Text from '../text';
import { useUser } from 'hooks/use-user';

const OverflowMenu = () => {
    const buttonRef = useRef();
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);
    const { user } = useUser(session?.login as string);

    const closedBountiesCount = user?.closedBountiesCount.toString() ?? '-';
    const level = `${user?.level ?? '-'}`;

    const onProfileClick = async () => {
        if (session) {
            await signOut();
        } else {
            await signIn('github');
        }
    };

    return (
        <>
            <div className="dropdown dropdown-end">
                <label tabIndex={0}>
                    <div className="flex flex-row items-center gap-3">
                        <Button
                            variant="orange"
                            icon={MdOutlineManageAccounts}
                            onClick={() => setMenuOpen(!menuOpen)}
                            buttonRef={buttonRef}
                        />
                    </div>
                </label>
                <Card
                    tabIndex={0}
                    className="bg-opacity-85 dropdown-content mt-3 block w-[calc(100vw-3rem)] !bg-[#232225] sm:w-80" // TODO: Background is temporarily solid color due to blur issue.
                >
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
                                    className={session && 'text-primary'}
                                >
                                    {session ? (
                                        <Link
                                            href={`/${session.login}`}
                                            onClick={() => setMenuOpen(false)}
                                            passHref
                                        >
                                            {session.login}
                                        </Link>
                                    ) : (
                                        'Sign in with GitHub'
                                    )}
                                </Text>
                                {!session ? (
                                    <Text
                                        variant="label"
                                        className="!normal-case text-secondary"
                                    >
                                        Connect your GitHub account for an
                                        enhanced user experience, including the
                                        ability to create new and claim
                                        completed bounties.
                                    </Text>
                                ) : (
                                    <div className="flex flex-row items-center gap-1">
                                        <Chip
                                            highlightValue={closedBountiesCount}
                                            value="Bounties"
                                        />
                                        <Chip
                                            value="Lv."
                                            highlightValue={level}
                                            reversed={true}
                                        />
                                    </div>
                                )}
                            </div>
                            {session && (
                                <Image
                                    alt="Avatar"
                                    src={session.user.image}
                                    height={40}
                                    className="aspect-square"
                                    style={{ borderRadius: '50%' }}
                                />
                            )}
                        </div>
                        <Button
                            text={'Sign ' + (session ? 'out' : 'in')}
                            icon={session ? MdLogout : TbBrandGithub}
                            variant={session ? 'danger' : 'orange'}
                            className="!w-full"
                            onClick={onProfileClick}
                        />
                    </div>
                    <div className="h-px w-full bg-line" />
                </Card>
            </div>

            <input type="checkbox" id="wallet-modal" className="modal-toggle" />
        </>
    );
};

export default OverflowMenu;
