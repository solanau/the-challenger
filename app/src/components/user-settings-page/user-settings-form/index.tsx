import Button from 'components/common/button';
import Spinner from 'components/common/spinner';
import { Field, Form } from 'formik';
import { NextPage } from 'next';

interface UserSettingsFormProps {
    isLoading?: boolean;
}

const UserSettingsForm: NextPage<UserSettingsFormProps> = ({
    isLoading = false,
}) => (
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
                Wallet Public Key{' '}
            </label>

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
        </div>

        <div className="width-full flex flex-row justify-end gap-2 pt-4">
            <Button type="submit" variant="orange" disabled={isLoading}>
                {isLoading && <Spinner variant="large"></Spinner>}
                Submit
            </Button>
        </div>
    </Form>
);

export default UserSettingsForm;
