import { useCallback } from 'react';

import type { MouseEvent } from 'react';
import { TbWallet } from 'react-icons/tb';
import Button from '../button';
import { useWalletModal } from './use-wallet-modal';

export const WalletModalButton = () => {
    const { visible, setVisible } = useWalletModal();

    const handleClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            if (!event.defaultPrevented) setVisible(!visible);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [visible],
    );

    return (
        <Button
            icon={TbWallet}
            onClick={handleClick}
            variant="transparent"
            className="!w-full"
            text="Set Wallet"
        ></Button>
    );
};
