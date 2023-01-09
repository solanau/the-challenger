import Image from 'components/common/image';
import OverflowMenu from 'components/common/overflow-menu';
import Text from 'components/common/text';
import { useEvent } from 'hooks/use-event';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { useState } from 'react';
import {
    AUTH_PATH_NAMES,
    EVENT_PATH_NAMES,
    USER_PATH_NAMES,
} from 'utils/router';
import NavElement from './nav-element';

const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const router = useRouter();
    const eventId =
        router.query.eventId instanceof Array
            ? router.query.eventId[0]
            : router.query.eventId;
    const isEventPage =
        EVENT_PATH_NAMES.includes(router.pathname) ||
        (eventId &&
            (AUTH_PATH_NAMES.includes(router.pathname) ||
                USER_PATH_NAMES.includes(router.pathname)));

    const { user } = useAuth();
    const event = useEvent(eventId);

    return (
        <header className="sticky top-0 z-50 flex h-20 w-full flex-row items-center justify-between  bg-transparent bg-opacity-40 px-6  backdrop-blur-xl">
            <Link href={isEventPage ? `/events/${eventId}` : '/'} passHref>
                <a className="flex w-fit cursor-pointer flex-row items-center gap-3 md:gap-6">
                    <Image
                        src="/logo-icon.svg"
                        alt="solana icon"
                        width={29.16}
                        height={26.08}
                    />
                    <div className="flex flex-row items-center gap-3">
                        <Image
                            src="/logo-text.svg"
                            alt="solana text"
                            className="hidden md:inline"
                            width={134.46}
                            height={20.1}
                        />
                    </div>
                </a>
            </Link>

            {isEventPage &&
                user &&
                event &&
                event.managers &&
                event.managers.includes(user.id) && (
                    <div className="align-center">
                        <Text className="text-green-400" variant="label">
                            You're an admin of this event
                        </Text>
                    </div>
                )}

            <div>
                <section className="flex flex-row items-center justify-end gap-5 self-end sm:hidden sm:gap-7 lg:hidden">
                    <div
                        className="HAMBURGER-ICON space-y-2.5"
                        onClick={() => setIsNavOpen(prev => !prev)}
                    >
                        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                    </div>
                    <div className="flex h-full flex-row items-center gap-2 md:gap-10">
                        <div className="h-8 w-0.5 bg-zinc-900" />
                        <OverflowMenu
                            isEventPage={isEventPage}
                            eventId={eventId}
                        />
                    </div>
                    <div className={isNavOpen ? 'showMenuNav' : 'hideMenuNav'}>
                        <div
                            className="absolute top-0 right-0 px-8 py-8"
                            onClick={() => setIsNavOpen(false)}
                        >
                            <svg
                                className="h-8 w-8 text-gray-600"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </div>
                        <ul className="flex min-h-[200px] flex-col items-center justify-between">
                            <NavElement
                                label="Home"
                                href={isEventPage ? `/events/${eventId}` : '/'}
                                navigationStarts={() => setIsNavOpen(false)}
                            />
                            <div className="mb-5 h-0.5 w-20 gap-10 bg-zinc-500" />
                            {isEventPage && (
                                <NavElement
                                    label="Leaderboard"
                                    href={`/events/${eventId}/leaderboard`}
                                    navigationStarts={() => setIsNavOpen(false)}
                                />
                            )}
                            {!isEventPage && (
                                <NavElement
                                    label="Events"
                                    href={`/events`}
                                    navigationStarts={() => setIsNavOpen(false)}
                                />
                            )}
                            <div className="mb-5 h-0.5 w-20 gap-10 bg-zinc-500" />
                            <NavElement
                                label="Challenges"
                                href="/challenges"
                                navigationStarts={() => setIsNavOpen(false)}
                            />
                            <div className="mb-5 h-0.5 w-20 gap-10 bg-zinc-500" />
                        </ul>
                    </div>
                </section>
                <div className="hidden flex-row items-center gap-5 self-end sm:flex sm:gap-7">
                    <NavElement
                        label="Home"
                        href={isEventPage ? `/events/${eventId}` : '/'}
                        navigationStarts={() => setIsNavOpen(false)}
                    />

                    {isEventPage && (
                        <NavElement
                            label="Leaderboard"
                            href={`/events/${eventId}/leaderboard`}
                            navigationStarts={() => setIsNavOpen(false)}
                        />
                    )}

                    {!isEventPage && (
                        <NavElement
                            label="Events"
                            href={`/events`}
                            navigationStarts={() => setIsNavOpen(false)}
                        />
                    )}

                    <NavElement
                        label="Challenges"
                        href={
                            isEventPage
                                ? `/events/${eventId}/challenges`
                                : '/challenges'
                        }
                        navigationStarts={() => setIsNavOpen(false)}
                    />

                    <div className="flex h-full flex-row gap-3 md:gap-5">
                        <div className="h-15 w-px bg-line" />
                        <OverflowMenu
                            isEventPage={isEventPage}
                            eventId={eventId}
                        />
                    </div>
                </div>
            </div>
            <style>
                {`
                    .hideMenuNav {
                        display: none;
                    }.showMenuNav {
                        display: block;
                        opacity:0.93;
                        position: absolute;
                        width: 100%;
                        height: 100vh;
                        top: 0;
                        left: 0;
                        background: black;
                        z-index: 10;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-evenly;
                        align-items: center;
                    }
                    `}
            </style>
        </header>
    );
};

export default Header;
