import Button from 'components/common/button';
import Card from 'components/common/card';
import Text from 'components/common/text';
import Link from 'next/link';
const UpcomingChallengersSection = () => (
    <section className="pt-20 md:pt-40 sm:my-20 grid place-items-center overflow-hidden">
        <div className="w-full max-w-6xl px-4 py-12 mx-auto flex flex-col items-center gap-6 sm:gap-12 z-30">
            <div className="text-center sm:text-left">
                <div className="relative group bg-zinc-900 rounded-xl backdrop-blur bg-opacity-70">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-black to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                    <Card className="gap-10 p-4 sm:p-8 lg:p-12 bg-zinc-900 rounded-xl bg-opacity-90 border-purple-500 border-2">
                        <Text variant="big-heading" className="text-white text-center items-center mb-10">
                            Current Competition
                        </Text>
                        <div className="flex flex-col sm:flex-row">
                            <div className="flex items-center justify-start">
                                <img src="melbourne-banner.jpeg" alt="Your Image" className="w-full sm:w-auto" style={{ maxWidth: '500px' }} />
                            </div>
                            <div className="flex flex-col gap-5 ml-5">
                                <div className="flex flex-col gap-1">
                                    <Text variant="nav-heading" className="mt-2 text-white">
                                        Melbourne Hacker House
                                    </Text>
                                    <Text variant="nav-heading" className="mt-2 text-white/80">
                                        Date: February 20 to 24, 2023
                                    </Text>
                                </div>
                                <Text variant="paragraph" className="text-purple-200">
                                    Welcome hackers to the New York Hacker House Challenger competition! Earn prizes, rewards, and the ‘Social Club Champion’ title 🏆.
                                </Text>
                                <Link href="https://solana.com/events/melbournehh" target="_blank" rel="noopener noreferrer" passHref className="flex flex-col sm:flex-row sm:justify-end">
                                    <Button text="View Challenges" variant="transparent" className="my-2 place-self-end sm:place-self-auto text-purple-500 border-purple-500 text-sm py-2" />
                                </Link>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    </section>



);

export default UpcomingChallengersSection;