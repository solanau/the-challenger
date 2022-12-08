import Button from 'components/common/button';
import Spinner from 'components/common/spinner';
import { Field, Form } from 'formik';
import { NextPage } from 'next';

interface ResetPasswordFormProps {
    isLoading?: boolean;
}

const ResetPasswordForm: NextPage<ResetPasswordFormProps> = ({
    isLoading = false,
}) => (
    <Form>
        <div className="pt-4">
            <label
                htmlFor="credential-email"
                className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
            >
                Email&nbsp;
            </label>

            <Field
                id="credential-email"
                name="email"
                type="email"
                className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                placeholder="Enter email where the new password will be sent"
                maxLength={80}
                required
                disabled={isLoading}
                autoComplete="off"
            />
        </div>

        <div className="width-full flex flex-row justify-end gap-2 pt-4">
            <Button type="submit" variant="orange" disabled={isLoading}>
                {isLoading && <Spinner variant="large"></Spinner>}
                Send password reset email
            </Button>
        </div>
    </Form>
);

export default ResetPasswordForm;
