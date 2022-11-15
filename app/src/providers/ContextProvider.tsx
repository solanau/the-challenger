import {
    ConnectionProvider,
    WalletProvider,
} from '@solana/wallet-adapter-react';
import {
    GlowWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { FC, ReactNode, useMemo } from 'react';
import { WalletModalProvider } from '../components/common/wallet-adapter';
import { AutoConnectProvider, useAutoConnect } from './AutoConnectProvider';
require('@solana/wallet-adapter-react-ui/styles.css');

export const WalletContextProvider: FC = ({ children }) => {
    useAutoConnect();

    // const network = WalletAdapterNetwork.Devnet;

    // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const endpoint = 'http://localhost:8899';

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new GlowWalletAdapter(),
            new SlopeWalletAdapter(),
            // new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
        ],
        // [network],
        [],
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => (
    <AutoConnectProvider>
        <WalletContextProvider>{children}</WalletContextProvider>
    </AutoConnectProvider>
);
