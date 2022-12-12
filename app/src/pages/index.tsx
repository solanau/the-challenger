import ActionsSection from 'components/home-page/actions-section';
import HeroSection from 'components/home-page/hero-section';
import { NextPage } from 'next';

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

// Home

const Home: NextPage<any> = ({ event }) => {
    return (
        <>
            <div>
                <HeroSection event={event} />
                {/* <StatsSection /> */}
            </div>
            <ActionsSection />
        </>
    );
};

// get static props and query data from supabase
export const getStaticProps = async () => {
    const supabase = createBrowserSupabaseClient();
    const { data: event, error } = await supabase
        .from('events')
        .select('id, name, description, start_date, end_date')
        .eq('id', 'f5f5da27-c8d2-411a-9182-9fef9f0e45f0')
        .single();

    if (error) {
        console.log(error);
    }

    return {
        props: {
            event,
        },
    };
};

export default Home;
