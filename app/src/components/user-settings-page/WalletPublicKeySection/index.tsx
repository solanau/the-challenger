import { Field, FormikErrors, FormikTouched } from 'formik';
import React from 'react';

interface WalletPublicKeySectionProps {
    isLoading: boolean;
    errors: FormikErrors<any>;
    touched: FormikTouched<any>;
}

const WalletPublicKeySection: React.FC<WalletPublicKeySectionProps> = ({ isLoading, errors, touched }) => {
    return (
        <div className="pt-8">
            <label htmlFor="user-wallet-public-key" className="block text-2xl font-medium mb-2 after:content-['*'] font-rubik sm:ml-10">
                Wallet Public Key
            </label>
            <Field
                id="user-wallet-public-key"
                name="walletPublicKey"
                className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500 sm:ml-10"
                placeholder="Enter your wallet public key"
                maxLength={80}
                required
                disabled={isLoading}
                autoComplete="off"
            />
            {errors.walletPublicKey && touched.walletPublicKey && <div className="mt-2">{errors.walletPublicKey}</div>}
        </div>
    );
};

export default WalletPublicKeySection;
