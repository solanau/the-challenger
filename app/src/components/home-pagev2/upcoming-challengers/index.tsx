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
    <section className="pt-40 md:pt-80 sm:my-10 grid place-items-center overflow-hidden">
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
                        className="w-full px-5 py-5 rounded-xl shadow-lg"
                    >
                        {cardData.map((data, index) => (
                            <div key={index}>
                                <Card
                                    className="h-full p-4 sm:p-8 lg:p-14º bg-black rounded-4xl bg-opacity-10 border-zinc-800 hover:border-zinc-500 border relative transition-all duration-200 ease-in-out"

                                >
                                    <div className="flex flex-col sm:flex-row">
                                        <div className="flex items-center justify-start">
                                            <div style={{ width: '500px', height: '250px', overflow: 'hidden', borderRadius: '5%' }}>
                                                <img
                                                    src={data.image}
                                                    alt={data.title}
                                                    className="w-full h-full object-cover" // object-cover to ensure the image covers the entire div
                                                />
                                            </div>
                                        </div>


                                        <div className="flex flex-col gap-5 ml-5">
                                            <div className="flex flex-col gap-1">
                                                <Text variant="heading" className="mt-2 text-white text-left">
                                                    {data.title}
                                                </Text>
                                                <Text variant="nav-heading" className="mt-2 text-white/80 text-left ">
                                                    Date: {data.date}
                                                </Text>
                                            </div>
                                            <Text variant="paragraph" className="text-white text-left">
                                                {data.description}
                                            </Text>
                                            <Link href={data.link} target="_blank" rel="noopener noreferrer" passHref className="flex flex-col sm:flex-row sm:justify-end">
                                                <Button
                                                    variant="transparent"
                                                    className="my-2 place-self-end sm:place-self-auto text-white border-white text-lg py-2 flex items-center mx-10"
                                                >

                                                    <span className="ml-1"> ⛨ View Challenges</span>
                                                </Button>


                                            </Link>
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
                top: 1900,
                right: 0,
                maxHeight: 1500,
                maxWidth: 1500,
            }}
        ></div>
    </section >
);

export default UpcomingChallengersSection;
