import Button from 'components/common/button';
import Link from 'next/link';
import { TbSearch } from 'react-icons/tb';

const InitSection = () => {
    return (
        <section className="pt-20 md:pt-10 sm:my-20 bg-gradient-to-br from-black to-gray-900 grid place-items-center overflow-hidden ">
            <div className="w-full max-w-6xl px-4 py-12 mx-auto flex flex-col items-center gap-6 sm:gap-12 z-30">
                <div className="text-center sm:text-left">
                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter text-white font-rubik">
                        The Challenger
                    </h1>
                    <p className="mt-4 text-base sm:text-lg md:text-xl font-normal text-white font-rubik">
                        <span className="block text-center text-white">Complete Challenges. Develop New Skills</span>
                        <span className="block text-center text-white">Earn Rewards. Share your achievements.</span>
                    </p>
                </div>
                <Link href={{ pathname: '/events' }} passHref>
                    <Button
                        icon={TbSearch}
                        text={'View all events'}
                        variant="transparent"
                        className="w-screen sm:w-64 hover:bg-gradient-to-br hover:from-white hover:to-white bg-gradient-to-br from-indigo-500 to-fuchsia-500"
                    ></Button>
                </Link>
            </div>
            <div className="absolute order-2 sm:mt-10 bg-blend-overlay"
                style={{
                    backgroundImage: `url(/right-home-graphic.png)`,
                    backgroundPosition: "100%, 0 center",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    width: "100%",
                    height: "100%"
                }}
            ></div>
            <div className="hidden sm:block absolute order-2 sm:mt-10 bg-blend-overlay"
                style={{
                    backgroundImage: `url(/left-home-graphic.png)`,
                    backgroundPosition: "100%, 0 left",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    width: "100%",
                    height: "100%",
                }}
            ></div>
            <div
                className="absolute order-2 sm:mt-10"
                style={{
                    backgroundImage: "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
                    backgroundSize: "80% 80%",
                    backgroundPosition: "bottom",
                    width: "100%",
                    height: "100%"
                }}
            ></div>

        </section>
    );
}

export default InitSection;

