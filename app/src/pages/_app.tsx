// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import CommandPalette from 'components/common/command-palette';
import Layout from 'components/common/layout';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { AuthContextProvider } from 'providers/AuthProvider';
import { ContextProvider } from 'providers/ContextProvider';
import '../styles/globals.css';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
    <>
        {/* <NextSeo
            title={undefined}
            titleTemplate="%s | Solana Bounty"
            defaultTitle="Solana Bounty"
            description="A tool for project maintainers to streamline the process of finding open source contributors. And conversely for open source contributors to find projects to contribute and get reward"

        /> */}
        <ContextProvider>
            <SessionProvider session={session}>
                <AuthContextProvider>
                    <CommandPalette>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </CommandPalette>
                </AuthContextProvider>
            </SessionProvider>
        </ContextProvider>
    </>
);

export default App;
