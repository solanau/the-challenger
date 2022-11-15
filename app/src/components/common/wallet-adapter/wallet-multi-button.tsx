import { useWallet } from '@solana/wallet-adapter-react';
import React, { useMemo } from 'react';
import Button from '../button';
import { WalletConnectButton } from './wallet-connect-button';
import { WalletModalButton } from './wallet-modal-button';
import { TbWalletOff } from 'react-icons/tb';

export const WalletMultiButton = () => {
    const { publicKey, wallet, disconnect } = useWallet();

    const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);

    if (!wallet) return <WalletModalButton></WalletModalButton>;
    if (!base58) return <WalletConnectButton></WalletConnectButton>;

    return (
        <Button
            text={'Disconnect'}
            icon={TbWalletOff}
            variant="transparent"
            className="!w-full"
            onClick={disconnect}
        />
    );
};
