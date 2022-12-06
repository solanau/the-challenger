import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Button from 'components/common/button';

import Image from 'components/common/image';
import Text from 'components/common/text';
import Link from 'next/link';
import React from 'react';
import { TbBrandChrome } from 'react-icons/tb';
import { cn } from 'utils';

const HeroSection = () => {
    const [MousePosition, setMousePosition] = React.useState({
        left: 0,
        top: 0,
    });

    function handleMouseMove(ev) {
        setMousePosition({ left: ev.pageX, top: ev.pageY });
    }

    return (
        <section
            className={cn(
                'relative flex min-h-[calc(100vh_+_40px)] w-full flex-col items-start overflow-hidden bg-gradient-to-b from-black to-transparent  sm:justify-start md:mt-0 md:h-[calc(100vh_+_300px)] md:min-h-0 md:flex-row md:justify-start lg:h-[calc(100vh)] lg:items-center lg:justify-center',
            )}
            onMouseMove={ev => handleMouseMove(ev)}
        >
            <div
                className="spotlight absolute hidden h-full w-full sm:block"
                style={{
                    background: `radial-gradient(circle at ${MousePosition.left}px ${MousePosition.top}px, rgba(240, 117, 70, 0.765) 0%, rgba(203, 68, 184, 0) 60%, rgba(219, 65, 75, 0) 60%)`,
                }}
            ></div>
            <div
                className="absolute block aspect-square h-[130%] sm:hidden"
                style={{
                    background: `radial-gradient(circle at center 30%, rgba(240, 117, 70, 0.765) 0%, rgba(203, 68, 184, 0) 40%, rgba(219, 65, 75, 0) 40%)`,
                }}
            ></div>
            <div className="bp-backdrop _backdrop absolute left-0 z-10 h-full min-h-[calc(100vh_+_300px)] w-[70%] md:min-h-0 lg:h-[calc(100vh)]"></div>
            <div className="flex">
                <div className="relative z-30 mt-28 flex h-full w-full flex-col items-center justify-evenly gap-16 px-4 pt-20 text-left sm:mt-20 sm:items-start sm:px-8 md:px-16 lg:mt-0 lg:px-32 xl:px-64">
                    <Text className="font-bold" variant="super-hero">
                        BERLIN DEV CHALLENGE
                    </Text>
                    <Text className="max-w-[650px]" variant="paragraph">
                        Welcome
                        <a className="mx-1 font-bold text-primary">
                            hackers
                        </a>{' '}
                        to the
                        <a className="mx-1 font-bold text-primary">Berlin </a>
                        bounty challenge competition!! We are excited to be
                        hosting this special challenge event where hackers
                        compete to
                        <a className="mx-1 font-bold text-primary">
                            earn prizes, rewards,
                        </a>
                        and the title of
                        <a className="mx-1 font-bold text-primary">
                            bounty challenge champion!
                        </a>
                        Learn to
                        <a className="mx-1 font-bold text-primary">
                            build on Solana
                        </a>
                        while exploring the many protocols, sdks, and tools in
                        the ecosystem. Complete challenges to
                        <a className="mx-1 font-bold text-primary">level up</a>
                        your position on the leaderboard and battle your way to
                        the top ranks!
                    </Text>
                    <div className="mb-10 mt-72 flex w-full flex-row flex-wrap justify-center  gap-4  sm:mb-20 md:mt-0 md:justify-start">
                        <Link href="https://heavyduty.builders/" passHref>
                            <a className="flex-1 sm:flex-none" target="_blank">
                                <Button
                                    icon={TbBrandChrome}
                                    text={'View Heavy Duty website'}
                                    variant="transparent"
                                    className="!w-full bg-zinc-700"
                                ></Button>
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="flex">
                    <div className="absolute -right-10 top-[-10px] lg:-top-[150px]">
                        <Image
                            src="/clouds.png"
                            alt="solana icon"
                            width={2000}
                        />
                    </div>
                    <div className="absolute top-[450px] -right-[200px] z-20 sm:top-[350px] sm:-right-[100px] md:-right-[400px] md:top-[150px] lg:-top-[150px]">
                        {/* <Image
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
                        /> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
