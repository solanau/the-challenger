import * as Web3 from '@solana/web3.js';

import { ChangeEvent, useCallback, useState } from 'react';
import { MdInfoOutline, MdOutlinePayments } from 'react-icons/md';
import {
    createTransferInstruction,
    getAssociatedTokenAddress,
} from '@solana/spl-token';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

import { Bounty } from 'types/bounty';
import Button from 'components/common/button';
import Card from 'components/common/card';
import Image from 'components/common/image';
import { TbWallet } from 'react-icons/tb';
import Text from 'components/common/text';
import { cn } from 'utils';
import { getWalletImage } from 'utils/wallet';
import { useBalance } from 'hooks/use-balance';
import { useSWRConfig } from 'swr';

const FundTab = ({ address, id, mint, reward }: Bounty) => {
    const { balance } = useBalance(mint);
    const { connection } = useConnection();
    const [amount, setAmount] = useState<number>();
    const { mutate } = useSWRConfig();
    const { publicKey, sendTransaction, wallet } = useWallet();

    const walletName = wallet?.adapter.name;
    const walletImage = getWalletImage(walletName?.toLowerCase());
    const githubRepository =
        'heavy-duty/solana-colombia-hacker-house-bounty-program';

    const onAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newAmount = Number(e.target.value);
        if (newAmount <= 0) setAmount(null);
        setAmount(newAmount);
    };

    const onSend = useCallback(async () => {
        if (!publicKey) {
            alert('Wallet not connected');
            return;
        }

        const associatedToken = await getAssociatedTokenAddress(
            new Web3.PublicKey(mint),
            publicKey,
        );

        let signature: Web3.TransactionSignature = '';

        try {
            const transaction = new Web3.Transaction().add(
                createTransferInstruction(
                    associatedToken,
                    new Web3.PublicKey(address),
                    publicKey,
                    amount * 1_000_000,
                ),
            );

            signature = await sendTransaction(transaction, connection);

            await connection.confirmTransaction(signature, 'confirmed');

            // Mutate SWR cache to view updated balance and reward
            await mutate('balance');
            await mutate(`/api/bounties/${id}/reward`);

            const message = `Transaction successful: https://explorer.solana.com/tx/${signature}?cluster=devnet`;

            alert(message);
        } catch (error) {
            alert('Transaction failed');
        }
    }, [
        publicKey,
        mint,
        address,
        amount,
        sendTransaction,
        connection,
        mutate,
        id,
    ]);

    return (
        <section className="flex flex-col gap-7">
            <div className="flex flex-col gap-2">
                <Text variant="big-heading">Make a payment</Text>
                <Text variant="paragraph" className="text-base !text-secondary">
                    Choose between...
                </Text>
            </div>
            <div className="flex h-max flex-col gap-10 md:flex-row">
                <div className="flex w-full flex-col gap-5">
                    <div className="flex flex-row items-center gap-3">
                        <Text variant="heading">Solana Pay</Text>
                        <a
                            href="https://solanapay.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MdInfoOutline
                                size={15}
                                className="aspect-square"
                            />
                        </a>
                    </div>
                    <Card className="flex w-full items-center justify-center !bg-transparent p-5 md:h-full">
                        <div className="overflow-hidden rounded-3xl">
                            <Image
                                alt="Solana Pay QR"
                                className="aspect-square h-80 w-80"
                                src={`https://raw.githubusercontent.com/${githubRepository}/main/.drill/${id}.jpg`}
                            />
                        </div>
                    </Card>
                </div>

                <div className="flex h-full w-full flex-col gap-5">
                    <Text variant="heading">Send manually</Text>
                    <div className="flex flex-col gap-3">
                        <Card className="flex w-full flex-col gap-3 border-none !bg-gradient-to-tr from-primary/75 to-secondary/75 p-5">
                            <Text variant="label">Current funding</Text>
                            <div className="flex w-full flex-row items-center justify-center gap-3">
                                <Text variant="big-heading">
                                    {(+reward).toFixed(2)}
                                </Text>{' '}
                                <Text
                                    variant="sub-heading"
                                    className="font-light"
                                >
                                    Tickets
                                </Text>
                            </div>
                            <div className="flex w-full flex-row justify-end">
                                <Image
                                    src="/logo-icon.svg"
                                    alt="solana icon"
                                    width={20}
                                    height={17.89}
                                    className="saturate-0"
                                />
                            </div>
                        </Card>

                        <Card
                            className={cn(
                                'flex w-full flex-col items-end gap-3 p-5',
                                !publicKey && 'opacity-50',
                            )}
                        >
                            <Text variant="label">
                                Your {walletName} wallet
                            </Text>
                            <div className="flex w-full flex-col items-center justify-center gap-5">
                                {publicKey ? (
                                    <>
                                        <div className="flex flex-row items-center gap-3">
                                            <Text variant="big-heading">
                                                {balance?.toFixed(2)}
                                            </Text>{' '}
                                            <Text
                                                variant="sub-heading"
                                                className="font-light"
                                            >
                                                Tickets
                                            </Text>
                                        </div>

                                        <div className="flex flex-row flex-wrap gap-2">
                                            <div className="background-transparent group flex h-11 w-full min-w-fit flex-[1_1_fit-content] flex-row items-center justify-between gap-3 rounded-full border border-white px-5 py-3">
                                                <div className="flex flex-row items-center gap-3">
                                                    <MdOutlinePayments
                                                        size={20}
                                                    />
                                                    <input
                                                        className="w-28 bg-transparent text-sm tracking-wide text-secondary outline-none valid:text-primary"
                                                        onChange={
                                                            onAmountChange
                                                        }
                                                        placeholder="Enter amount..."
                                                        type="text"
                                                    />
                                                </div>
                                                <Text variant="label">
                                                    Tickets
                                                </Text>
                                            </div>
                                            <Button
                                                className="flex-[2_2_fit-content]"
                                                onClick={onSend}
                                                text="Send"
                                                variant="orange"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <div
                                            className="tooltip"
                                            data-tip="Connect a wallet via the integration menu to see your balance"
                                        >
                                            <MdInfoOutline
                                                size={15}
                                                className="aspect-square"
                                            />
                                        </div>
                                        <Text variant="paragraph">
                                            Not connected
                                        </Text>
                                    </div>
                                )}
                            </div>
                            <div className="flex w-full flex-row justify-start">
                                {publicKey ? (
                                    <Image
                                        src={walletImage}
                                        alt="wallet icon"
                                        height={20}
                                    />
                                ) : (
                                    <TbWallet size={20} />
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FundTab;
