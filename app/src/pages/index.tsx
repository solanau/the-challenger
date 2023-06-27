import AdditionalSection from 'components/home-pagev2/additional-section';
import CreateChallengeSection from 'components/home-pagev2/create-challenge';
import InitSection from 'components/home-pagev2/init-section';
import IntroInformation from 'components/home-pagev2/intro-information';
import UpcomingChallengersSection from 'components/home-pagev2/upcoming-challengers';
import { NextPage } from 'next';
// Home
const Home: NextPage = () => (

    <>
        <InitSection />
        <UpcomingChallengersSection />
        <IntroInformation />
        <AdditionalSection />
        <CreateChallengeSection />

    </>
);

export default Home;
