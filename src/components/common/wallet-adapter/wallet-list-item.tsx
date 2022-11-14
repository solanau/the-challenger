import type { FC, MouseEventHandler } from 'react';

import { Button } from './Button';
import React from 'react';
import type { Wallet } from '@solana/wallet-adapter-react';
import { WalletIcon } from './wallet-icon';
import { WalletReadyState } from '@solana/wallet-adapter-base';

export interface WalletListItemProps {
    handleClick: MouseEventHandler<HTMLButtonElement>;
    tabIndex?: number;
    wallet: Wallet;
}

export const WalletListItem: FC<WalletListItemProps> = ({
    handleClick,
    tabIndex,
    wallet,
}) => (
    <li>
        <Button
            onClick={handleClick}
            startIcon={<WalletIcon wallet={wallet} />}
            tabIndex={tabIndex}
        >
            {wallet.adapter.name}
            {wallet.readyState === WalletReadyState.Installed && (
                <span>Detected</span>
            )}
        </Button>
    </li>
);
