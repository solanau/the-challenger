import Button from 'components/common/button';
import Markdown from 'components/common/markdown';
import Text from 'components/common/text';
import Link from 'next/link';
import { useAuth } from 'providers/AuthProvider';
import { useState } from 'react';
import { TbLogin, TbTrophy } from 'react-icons/tb';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { cn } from 'utils';

interface HeroSectionProps {
    eventId: string;
    title: string;
    body: string;
}

const HeroSection = ({ eventId, title, body }: HeroSectionProps) => {
    const { user } = useAuth();
    const [mousePosition, setMousePosition] = useState({ left: 0, top: 0 });

    function handleMouseMove(ev) {
        setMousePosition({ left: ev.pageX, top: ev.pageY });
    }

    return (
        <section
            className={cn(
                'relative flex min-h-screen w-full flex-col items-start overflow-hidden bg-gradient-to-b from-black to-transparent sm:justify-start md:min-h-screen md:flex-row md:justify-start lg:min-h-screen lg:items-center lg:justify-center'
            )}
            onMouseMove={handleMouseMove}
        >
            <div
                className="spotlight absolute hidden h-full w-full sm:block"
                style={{
                    background: `radial-gradient(circle at ${mousePosition.left}px ${mousePosition.top}px, rgba(0, 204, 102, 0.765) 0%, rgba(0, 255, 0, 0) 60%, rgba(0, 153, 0, 0) 60%)`,
                    transition: 'background 0.3s ease-out',
                }}
            ></div>
            <div
                className="absolute block aspect-square h-[130%] sm:hidden"
                style={{
                    background: `radial-gradient(circle at center 30%, rgba(0, 204, 102, 0.765) 0%, rgba(0, 255, 0, 0) 40%, rgba(0, 153, 0, 0) 40%)`,
                    transition: 'background 0.3s ease-out',
                }}
            ></div>
            <div className="bp-backdrop _backdrop absolute left-0 z-10 h-full min-h-screen w-[70%] md:w-[60%] lg:w-[70%]"></div>
            <div className="relative z-30 flex flex-col items-center justify-evenly gap-8 px-2 pt-10 text-center sm:text-left sm:items-start sm:px-8 md:px-16 lg:px-32 xl:px-64">
                <Text className="font-bold text-4xl sm:text-6xl" variant="super-hero">
                    {title}
                </Text>
                <div className="max-w-[650px] text-lg sm:text-xl text-gray-200">
                    <Markdown>{body}</Markdown>
                </div>
                <div className="mb-5 mt-24 sm:mt-36 flex w-full flex-col sm:flex-row sm:mb-6 md:mt-0 md:justify-start">
                    <Link
                        href={{
                            pathname: user
                                ? `${eventId}/challenges`
                                : '/login',
                            query:
                                eventId && !user
                                    ? {
                                        eventId,
                                    }
                                    : {},
                        }}
                        passHref
                    >
                        <a className="mb-2 sm:mb-0 sm:mr-2">
                            <Button
                                icon={!user && TbLogin}
                                text={
                                    !user
                                        ? 'Sign In'
                                        : 'View the challenges !'
                                }
                                variant="orange"
                                className="!w-full"
                                reversed={user !== null}
                            ></Button>
                        </a>
                    </Link>
                    <Link
                        href={{
                            pathname: `${eventId}/leader-board`,
                        }}
                        passHref
                    >
                        <a>
                            <Button
                                icon={TbTrophy}
                                text={'View Leaderboard'}
                                variant="transparent"
                                className="!w-full bg-zinc-700"
                            ></Button>
                        </a>
                    </Link>
                </div>
            </div>
            <div className="flex">
                {/* <div className="absolute top-[450px] -right-[200px] z-20 sm:top-[350px] sm:-right-[100px] md:-right-[400px] md:top-[150px] lg:-top-[150px]">
                    <Image
                            src="/helicopter.png"
                            className="hidden md:block"
                            alt="solana icon"
                            width={2000}
                        />
                        <Image
                            src="/helicopter.png"
                            className="block md:hidden"
                            alt="solana icon"
                            width={1000}
                        />
                </div> */}
            </div>
        </section>
    );
};



export default HeroSection;


