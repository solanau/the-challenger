import { useWallet } from '@solana/wallet-adapter-react';
import Button from 'components/common/button';
import Spinner from 'components/common/spinner';
import { WalletMultiButton } from 'components/common/wallet-adapter';
import { Field, Form } from 'formik';
import { NextPage } from 'next';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { BsFillCheckSquareFill } from 'react-icons/bs';
import { sign } from 'tweetnacl';
import { v4 as uuid } from 'uuid';

interface UserSettingsFormProps {
    isLoading?: boolean;
    signatureVerified: boolean;
    setSignatureVerified: Dispatch<SetStateAction<boolean>>;
}

const UserSettingsForm: NextPage<UserSettingsFormProps> = ({
    isLoading = false,
    signatureVerified,
    setSignatureVerified,
}) => {
    const { publicKey, signMessage } = useWallet();

    const [signingIsSupported, setSigningIsSupported] = useState<boolean>(true);

    const handleMessageSigning = useCallback(async () => {
        try {
            if (!publicKey) throw new Error('Wallet not connected!');
            if (!signMessage) {
                setSigningIsSupported(false);
                throw new Error('Wallet does not support message signing!');
            }
            const message = new TextEncoder().encode(uuid());
            const signature = await signMessage(message);
            if (!sign.detached.verify(message, signature, publicKey.toBytes()))
                throw new Error('Invalid signature!');
            setSignatureVerified(true);
        } catch (error) {
            alert(`Signing failed: ${error?.message}`);
        }
    }, [publicKey, signMessage, setSigningIsSupported, setSignatureVerified]);

    return (
        <Form>
            <div className="pt-4">
                <label
                    htmlFor="user-full-name"
                    className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                >
                    Full Name{' '}
                </label>

                <Field
                    id="user-full-name"
                    name="fullName"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                    placeholder="Enter your full name"
                    maxLength={80}
                    required
                    disabled={isLoading}
                    autoComplete="off"
                />
            </div>

            <div className="pt-4">
                <label
                    htmlFor="user-user-name"
                    className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                >
                    Username{' '}
                </label>

                <Field
                    id="user-user-name"
                    name="userName"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                    placeholder="Enter your username"
                    maxLength={80}
                    required
                    disabled={isLoading}
                    autoComplete="off"
                />
            </div>

            <div className="pt-4">
                <label
                    htmlFor="user-wallet-public-key"
                    className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                >
                    {signingIsSupported
                        ? 'Connect Wallet'
                        : 'Wallet Public Key'}{' '}
                </label>

                {signingIsSupported ? (
                    <div>
                        {signatureVerified ? (
                            <div className="mt-2 flex h-full flex-row gap-3 pl-2 md:gap-5">
                                <BsFillCheckSquareFill
                                    className="my-auto ml-4"
                                    fill="#4caf50"
                                />
                                <p className="my-auto text-green-500">
                                    Wallet authenticated!
                                </p>
                            </div>
                        ) : (
                            <div className="flex h-full flex-row items-center gap-3 md:gap-5">
                                <Button
                                    text={'Sign Message'}
                                    icon={BsFillCheckSquareFill}
                                    variant="transparent"
                                    className="!w-full bg-green-500 text-black"
                                    onClick={handleMessageSigning}
                                    disabled={isLoading}
                                />
                                <div className="h-15 mx-6 w-px bg-line" />
                                <WalletMultiButton />
                            </div>
                        )}
                    </div>
                ) : (
                    <Field
                        id="user-wallet-public-key"
                        name="walletPublicKey"
                        className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                        placeholder="Enter your wallet public key"
                        maxLength={80}
                        required
                        disabled={isLoading}
                        autoComplete="off"
                    />
                )}
            </div>

            <div className="width-full flex flex-row justify-end gap-2 pt-4">
                <Button type="submit" variant="orange" disabled={isLoading}>
                    {isLoading && <Spinner variant="large"></Spinner>}
                    Submit
                </Button>
            </div>
        </Form>
    );
};

export default UserSettingsForm;
