import Button from 'components/common/button';
import Spinner from 'components/common/spinner';
import { Field, Form } from 'formik';

interface CreateChallengeFormProps {
    isLoading?: boolean;
}

const CreateChallengeForm = ({
    isLoading = false,
}: CreateChallengeFormProps) => (
    <Form>
        <div className="pt-4">
            <label
                htmlFor="challenge-title"
                className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
            >
                Title&nbsp;
            </label>

            <Field
                id="challenge-title"
                name="title"
                className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-10 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                placeholder="Enter a title for the challenge"
                maxLength={80}
                required
                disabled={isLoading}
                autoComplete="off"
            />
        </div>

        <div className="pt-4">
            <label
                htmlFor="challenge-description"
                className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
            >
                Description&nbsp;
            </label>

            <Field
                as="textarea"
                id="challenge-description"
                name="description"
                className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-10 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                placeholder="Enter a description for the challenge"
                required
                disabled={isLoading}
                autoComplete="off"
                maxLength={500}
                rows={4}
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

export default CreateChallengeForm;
