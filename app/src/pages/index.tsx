import AdditionalSection from 'components/home-pagev2/additional-section';
import InitSection from 'components/home-pagev2/init-section';
import UpcomingChallengersSection from 'components/home-pagev2/upcoming-challengers';
import { NextPage } from 'next';
// Home
const Home: NextPage = () => (

    <>
        <InitSection />
        <UpcomingChallengersSection />
        <AdditionalSection />

    </>
);

export default Home;
