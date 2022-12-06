import Button from 'components/common/button';
import Card from 'components/common/card';
import { Field, Form } from 'formik';
import { NextPage } from 'next';

interface SignUpFormProps {
    disabled?: boolean;
}

const SignUpForm: NextPage<SignUpFormProps> = ({ disabled = false }) => (
    <Form>
        <div className="pt-4">
            <label
                htmlFor="credential-email"
                className="required block w-full border-none bg-transparent py-2 outline-none"
            >
                Email
            </label>

            <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                <Field
                    id="credential-email"
                    name="email"
                    type="email"
                    className="w-full bg-transparent outline-none"
                    placeholder="Enter an email for the credential"
                    required
                />
            </Card>
        </div>

        <div className="pt-4">
            <label
                htmlFor="credential-password"
                className="required  block w-full border-none bg-transparent py-2 outline-none"
            >
                Password
            </label>

            <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                <Field
                    id="credential-password"
                    name="password"
                    type="password"
                    className="w-full bg-transparent outline-none"
                    placeholder="Enter an password for the credential"
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

export default SignUpForm;
