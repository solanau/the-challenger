import {
    createBrowserSupabaseClient,
    Session,
} from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import Layout from 'components/common/layout';
import { AppProps } from 'next/app';
import { ContextProvider } from 'providers/ContextProvider';
import { useState } from 'react';
import { Database } from 'supabase/schema';
import '../styles/globals.css';
const App = ({
    Component,
    pageProps: { ...pageProps },
}: AppProps<{
    initialSession: Session;
}>) => {
    const [supabase] = useState(() => createBrowserSupabaseClient<Database>());
    return (
        <>
            {/* <NextSeo
            title={undefined}
            titleTemplate="%s | Solana Bounty"
            defaultTitle="Solana Bounty"
            description="A tool for project maintainers to streamline the process of finding open source contributors. And conversely for open source contributors to find projects to contribute and get reward"

        /> */}
            <ContextProvider>
                <SessionContextProvider
                    supabaseClient={supabase}
                    initialSession={pageProps.initialSession}
                >
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </SessionContextProvider>
            </ContextProvider>
        </>
    );
};

export default App;
