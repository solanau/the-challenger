import Button from 'components/common/button';
import Card from 'components/common/card';
import { Field, Form } from 'formik';
import { NextPage } from 'next';

interface UserSettingsFormProps {
    disabled?: boolean;
}

const UserSettingsForm: NextPage<UserSettingsFormProps> = ({
    disabled = false,
}) => (
    <Form>
        <div className="pt-4">
            <label
                htmlFor="user-full-name"
                className="required block w-full border-none bg-transparent py-2 outline-none"
            >
                Full Name
            </label>

            <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                <Field
                    id="user-full-name"
                    name="fullName"
                    type="text"
                    className="w-full bg-transparent outline-none"
                    placeholder="Enter your full name"
                    required
                />
            </Card>
        </div>

        <div className="pt-4">
            <label
                htmlFor="user-user-name"
                className="required block w-full border-none bg-transparent py-2 outline-none"
            >
                Username
            </label>

            <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                <Field
                    id="user-user-name"
                    name="userName"
                    type="text"
                    className="w-full bg-transparent outline-none"
                    placeholder="Enter a username"
                    required
                />
            </Card>
        </div>

        <div className="pt-4">
            <label
                htmlFor="user-wallet-public-key"
                className="required block w-full border-none bg-transparent py-2 outline-none"
            >
                Wallet Public Key
            </label>

            <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                <Field
                    id="user-wallet-public-key"
                    name="walletPublicKey"
                    type="text"
                    className="w-full bg-transparent outline-none"
                    placeholder="Enter your wallet public key"
                    required
                />
            </Card>
        </div>

        <div className="width-full flex flex-row justify-end gap-2 pt-4">
            <Button
                className="w-40"
                type="submit"
                variant="orange"
                disabled={disabled}
                text="Submit"
            />
        </div>
    </Form>
);

export default UserSettingsForm;
