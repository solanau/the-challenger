import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the required css

import Button from 'components/common/button';
import Card from 'components/common/card';
import Text from 'components/common/text';
import Link from 'next/link';

const cardData = [
    {
        title: 'Melbourne Hacker House',
        date: 'February 20 to 24, 2023',
        image: 'melbourne-banner.jpeg',
        description: 'Welcome hackers to the Melbourne Hacker House Challenger competition! Earn prizes, rewards, and the ‘Social Club Champion’ title 🏆.',
        link: 'https://solana.com/events/melbournehh'
    },
    {
        title: 'Berlin Code Fest',
        date: 'March 10 to 15, 2023',
        image: 'breakpoint.png',
        description: 'Welcome hackers to the Melbourne Hacker House Challenger competition! Earn prizes, rewards, and the ‘Social Club Champion’ title 🏆.',
        link: 'https://solana.com/events/Berlincodefest'
    },
    {
        title: 'Brisbane Hackathon',
        date: 'April 5 to 10, 2023',
        image: 'playgg.png',
        description: 'Welcome hackers to the Melbourne Hacker House Challenger competition! Earn prizes, rewards, and the ‘Social Club Champion’ title 🏆.',
        link: 'https://solana.com/events/brisbanehackathon'
    },
    {
        title: 'Perth Developer Summit',
        date: 'May 1 to 6, 2023',
        image: 'tel-aviv-hh.png',
        description: 'Welcome hackers to the Melbourne Hacker House Challenger competition! Earn prizes, rewards, and the ‘Social Club Champion’ title 🏆.',
        link: 'https://solana.com/events/perthdevsummit'
    },
];

const UpcomingChallengersSection = () => (
    <section className="pt-20 md:pt-20 grid place-items-center overflow-hidden">
        <div className="w-full max-w-6xl px-4 py-12 mx-auto flex flex-col items-center gap-6 sm:gap-12 relative z-30">
            <div className="text-center sm:text-left">
                <div className="mx-auto max-w-screen-lg">
                    <Text variant="big-heading" className="text-white text-center items-center mt-20">
                        Current Competitions
                    </Text>
                    <Carousel
                        showArrows={true}
                        infiniteLoop={true}
                        showThumbs={false}
                        showStatus={false}
                        autoPlay={true}
                        interval={4000}
                        className="w-full px-5 py-5 rounded-xl shadow-lg carousel"
                    >
                        {cardData.map((data, index) => (
                            <div key={index}>
                                <Card className="h-full p-2 sm:p-4 lg:p-8 bg-black rounded-4xl bg-opacity-10 border-zinc-800 hover:border-zinc-500 border relative transition-all duration-200 ease-in-out">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-full">
                                        <div className="sm:col-span-2 h-full">
                                            <div style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '5%' }}>
                                                <img
                                                    src={data.image || 'defaultPlaceholderImage.png'}
                                                    alt={data.title || 'No Title'}
                                                    className="w-full h-auto object-cover"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-1 flex flex-col gap-4 h-full">
                                            <div className="flex flex-col gap-1">
                                                <Text variant="heading" className="text-white text-left">
                                                    {data.title || 'No Title'}
                                                </Text>
                                                <Text variant="nav-heading" className="text-white/80 text-left">
                                                    Date: {data.date || 'No Date'}
                                                </Text>
                                                <Text variant="paragraph" className="text-white text-left">
                                                    {data.description || 'No Description'}
                                                </Text>
                                            </div>
                                            <div className="flex justify-center mt-auto sm:mt-0">
                                                <Link href={data.link || '#'} passHref>
                                                    <a target="_blank" rel="noopener noreferrer">
                                                        <Button
                                                            variant="transparent"
                                                            className="text-white border-white text-lg py-2 flex items-center"
                                                        >
                                                            <span>⛨ View Challenges</span>
                                                        </Button>
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Card>






                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
        <div
            className="absolute order-3 sm:mt-10 bg-blend-overlay"
            style={{
                backgroundImage: `url(/upcoming-right-picture.png)`,
                backgroundPosition: "right",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "100%",
                top: 1500,
                right: 0,
                maxHeight: 1500,
                maxWidth: 1500,
            }}
        ></div>
    </section>
);

export default UpcomingChallengersSection;