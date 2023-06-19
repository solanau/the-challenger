import Button from 'components/common/button';
import Card from 'components/common/card';
import Text from 'components/common/text';
import Link from 'next/link';

const UpcomingChallengersSection = () => (
    <section className="pt-30 md:pt-60 sm:my-20 grid place-items-center overflow-hidden">
        {/* <div
            className="hidden sm:block absolute order-3 sm:mt-10 bg-blend-overlay left-0 bottom-50"
            style={{
                backgroundImage: `url(/upcoming-left-picture.png)`,
                backgroundPosition: "left",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "150%",

            }}
        /> */}
        <div className="w-full max-w-6xl px-4 py-12 mx-auto flex flex-col items-center gap-6 sm:gap-12 relative z-30">
            <div className="text-center sm:text-left">

                <Card className="gap-10 p-4 sm:p-8 lg:p-12 bg-black rounded-xl bg-opacity-10 border-white border relative">
                    <Text variant="big-heading" className="text-white text-center items-center mb-10">
                        Current Competition
                    </Text>
                    <div className="flex flex-col sm:flex-row">
                        <div className="flex items-center justify-start">
                            <img
                                src="melbourne-banner.jpeg"
                                alt="Your Image"
                                className="w-full sm:w-auto"
                                style={{ maxWidth: '500px' }}
                            />
                        </div>
                        <div className="flex flex-col gap-5 ml-5">
                            <div className="flex flex-col gap-1">
                                <Text variant="heading" className="mt-2 text-white">
                                    Melbourne Hacker House
                                </Text>
                                <Text variant="nav-heading" className="mt-2 text-white/80">
                                    Date: February 20 to 24, 2023
                                </Text>
                            </div>
                            <Text variant="paragraph" className="text-white">
                                Welcome hackers to the New York Hacker House Challenger competition! Earn prizes, rewards, and the ‘Social Club Champion’ title 🏆.
                            </Text>
                            <Link href="https://solana.com/events/melbournehh" target="_blank" rel="noopener noreferrer" passHref className="flex flex-col sm:flex-row sm:justify-end">
                                <Button
                                    text="View Challenges"
                                    variant="transparent"
                                    className="my-2 place-self-end sm:place-self-auto text-purple-500 border-purple-500 text-sm py-2"
                                />
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    </section>
);

export default UpcomingChallengersSection;
