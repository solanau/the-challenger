import ActionsSection from 'components/home-page/actions-section';
import HeroSection from 'components/home-page/hero-section';
import { GetServerSideProps, NextPage } from 'next';

type HomePageProps = {
    landing: {
        title: string
    }
};

// Home
const Home: NextPage<HomePageProps>  = ({landing}) => (
    <>
        <div>
            <HeroSection landing={landing} />
            {/* <StatsSection /> */}
        </div>
        <ActionsSection />
    </>
);

export default Home;

export const getServerSideProps: GetServerSideProps = async context => {

    console.log("landing vars -> ");
    console.log(process.env.LANDING_TITLE);
    return { props: { landing: {title: process.env.LANDING_TITLE, header: process.env.LANDING_HEADER, description: process.env.LANDING_DESCRIPTION} } };
};
