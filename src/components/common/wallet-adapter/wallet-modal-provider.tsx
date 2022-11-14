import type { FC, ReactNode } from 'react';
import React, { useState } from 'react';
import { WalletModalContext } from './use-wallet-modal';
import type { WalletModalProps } from './wallet-modal';
import { WalletModal } from './wallet-modal';

export interface WalletModalProviderProps extends WalletModalProps {
    children: ReactNode;
}

export const WalletModalProvider: FC<WalletModalProviderProps> = ({
    children,
    ...props
}) => {
    const [visible, setVisible] = useState(false);

    return (
        <WalletModalContext.Provider
            value={{
                visible,
                setVisible,
            }}
        >
            {children}
            {visible && <WalletModal {...props} />}
        </WalletModalContext.Provider>
    );
};
