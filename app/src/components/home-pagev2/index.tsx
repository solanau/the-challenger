import Button from 'components/common/button';
import Link from 'next/link';
import { TbSearch } from 'react-icons/tb';

const InitSection = () => {
    return (
        <section className="pt-20 md:pt-20 bg-black grid place-items-center overflow-hidden">
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
                    <a className="w-full sm:w-auto">
                        <Button icon={TbSearch} text="View all events" variant="orange" />
                    </a>
                </Link>
            </div>


        </section>
    );
}

export default InitSection;


