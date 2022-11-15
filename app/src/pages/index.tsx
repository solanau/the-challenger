import ActionsSection from 'components/home-page/actions-section';
import HeroSection from 'components/home-page/hero-section';
import { NextPage } from 'next';

// Home
const Home: NextPage = () => (
    <>
        <div>
            <HeroSection />
            {/* <StatsSection /> */}
        </div>
        <ActionsSection />
    </>
);

export default Home;
