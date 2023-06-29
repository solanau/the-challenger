import Button from 'components/common/button';
import Link from 'next/link';
import { TbSearch } from 'react-icons/tb';

type BackgroundImageProps = {
    source: string;
    altText: string;
    position: string;
    size: string;
    extraClasses?: string;
};

const BackgroundImage: React.FC<BackgroundImageProps> = ({
    source,
    altText,
    position,
    size,
    extraClasses = "",
}) => (
    <div
        className={`absolute sm:mt-10 bg-blend-overlay ${extraClasses}`}
        style={{
            backgroundImage: `url(${source})`,
            backgroundPosition: position,
            backgroundSize: size,
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "140%",
        }}
    />
);

const BackgroundGradient = () => (
    <div
        className="absolute order-2 sm:mt-10"
        style={{
            backgroundImage: "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
            backgroundSize: "80% 80%",
            backgroundPosition: "bottom",
            width: "100%",
            height: "140%",
        }}
    />
);

const InitSection = () => {
    return (
        <section className="pt-5 md:pt-10 sm:my-20 bg-gradient-to-br from-black to-gray-900 grid place-items-center overflow-hidden">
            <div className="w-full max-w-6xl px-4 py-12 mx-auto flex flex-col items-center gap-6 sm:gap-12 z-30">
                <div className="text-center sm:text-left">
                    <h1 className="text-6xl sm:text-7xl md:text-9xl font-extrabold tracking-tighter text-white font-rubik">
                        The Challenger
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl md:text-2xl font-normal text-white font-rubik">
                        <span className="block text-center text-white">Complete Challenges. Develop New Skills</span>
                        <span className="block text-center text-white">Earn Rewards. Share your achievements.</span>
                    </p>
                </div>

                <Link href={{ pathname: '/events' }} passHref>
                    <Button
                        icon={TbSearch}
                        text={'View all events'}
                        variant="transparent"
                        className="w-full sm:w-auto md:w-64 lg:w-80 max-w-xs hover:bg-gradient-to-br hover:from-white hover:to-white bg-gradient-to-br from-indigo-500 to-fuchsia-500 sm:text-2xl md:text-3xl lg:text-4xl"
                    />
                </Link>

            </div>
            <BackgroundImage
                source="/right-home-graphic.png"
                altText="Right home graphic"
                position="100%, 0 center"
                size="contain"
            />
            <BackgroundImage
                source="/left-home-graphic.png"
                altText="Left home graphic"
                position="100%, 0 left"
                size="contain"
                extraClasses="hidden sm:block"
            />
            <BackgroundGradient />
        </section>
    );
};

export default InitSection;





