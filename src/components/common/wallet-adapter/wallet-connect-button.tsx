import { useWallet } from '@solana/wallet-adapter-react';
import type { MouseEvent } from 'react';
import React, { useCallback } from 'react';
import Button from '../button';
import { TbWallet } from 'react-icons/tb';

export const WalletConnectButton = () => {
    const { connect } = useWallet();

    const handleClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            if (!event.defaultPrevented) connect().catch(() => {});
        },
        [connect],
    );

    return (
        <Button
            icon={TbWallet}
            onClick={handleClick}
            variant="transparent"
            className="!w-full"
            text="Connect"
        ></Button>
    );
};
