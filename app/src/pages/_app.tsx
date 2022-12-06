// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Layout from 'components/common/layout';
import { AppProps } from 'next/app';
import { AuthContextProvider } from 'providers/AuthProvider';
import { ContextProvider } from 'providers/ContextProvider';
import '../styles/globals.css';

const App = ({ Component, pageProps: { ...pageProps } }: AppProps) => (
    <>
        {/* <NextSeo
            title={undefined}
            titleTemplate="%s | Solana Bounty"
            defaultTitle="Solana Bounty"
            description="A tool for project maintainers to streamline the process of finding open source contributors. And conversely for open source contributors to find projects to contribute and get reward"

        /> */}
        <ContextProvider>
            <AuthContextProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AuthContextProvider>
        </ContextProvider>
    </>
);

export default App;
