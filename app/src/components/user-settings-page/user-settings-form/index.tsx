import Button from 'components/common/button';
import Spinner from 'components/common/spinner';
import { Field, Form, FormikErrors, FormikTouched, FormikValues } from 'formik';
import { NextPage } from 'next';
import { validateEmptyField } from 'utils/validations';

interface UserSettingsFormProps {
    isLoading?: boolean;
    errors: FormikErrors<FormikValues>;
    touched: FormikTouched<FormikValues>;
}

const UserSettingsForm: NextPage<UserSettingsFormProps> = ({
    isLoading = false,
    errors,
    touched
}) => {
    return (
        <div className="sm:pt-0 pt-4"> {/* Adjust this padding as needed */}
            <Form>
                <div className="sm:pt-4">
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
                        validate={validateEmptyField}
                        disabled={isLoading}
                        autoComplete="off"
                    />
                    {errors.fullName && touched.fullName && <div className='mt-2'>{errors.fullName}</div>}
                </div>

                <div className="sm:pt-4">
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
                        validate={validateEmptyField}
                        disabled={isLoading}
                        autoComplete="off"
                    />
                    {errors.userName && touched.userName && <div className='mt-2'>{errors.userName}</div>}
                </div>

                <div className="sm:pt-4">
                    <label
                        htmlFor="user-wallet-public-key"
                        className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                    >
                        Wallet Public Key{' '}
                    </label>

                    <Field
                        id="user-wallet-public-key"
                        name="walletPublicKey"
                        className="mb-8 w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                        placeholder="Enter your wallet public key"
                        maxLength={80}
                        required
                        validate={validateEmptyField}
                        // readOnly={true}
                        disabled={isLoading}
                        autoComplete="off"
                    />
                    {errors.walletPublicKey && touched.walletPublicKey && <div className='mt-2'>{errors.walletPublicKey}</div>}
                    {/* <WalletModalButton></WalletModalButton> */}
                </div>

                <div className="width-full flex flex-row justify-center sm:justify-end gap-2 sm:pt-4">
                    <Button type="submit" variant="orange" disabled={isLoading}>
                        {isLoading && <Spinner variant="large"></Spinner>}
                        Submit
                    </Button>
                </div>

            </Form>
        </div>
    )
};

export default UserSettingsForm;
