import Button from 'components/common/button';
import Card from 'components/common/card';
import { useFormik } from 'formik';
import { EditChallengePayload } from 'types/challenge';

interface ChallengeFormData {
    title: string;
    description: string;
}

interface EditChallengeFormProps {
    data?: ChallengeFormData;
    onSubmit(data?: EditChallengePayload): void;
}

const EditChallengeForm = ({ data, onSubmit }: EditChallengeFormProps) => {
    const formik = useFormik({
        initialValues: data ?? {
            title: '',
            description: '',
        },
        onSubmit: value => {
            onSubmit(value);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="pt-4">
                <label
                    htmlFor="event-title"
                    className="block w-full border-none bg-transparent py-2 outline-none"
                >
                    Title
                </label>

                <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                    <input
                        id="event-title"
                        name="title"
                        maxLength={32}
                        className="w-full bg-transparent outline-none"
                        onChange={formik.handleChange}
                        placeholder="Enter a title for the event"
                    />
                </Card>
            </div>

            <div className="pt-4">
                <label
                    htmlFor="event-description"
                    className="block w-full border-none bg-transparent py-2 outline-none"
                >
                    Description
                </label>

                <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                    <textarea
                        id="event-description"
                        name="description"
                        className="w-full bg-transparent outline-none"
                        maxLength={500}
                        rows={4}
                        onChange={formik.handleChange}
                        placeholder="Enter a description for the event"
                    />
                </Card>
            </div>

            <div className="width-full flex flex-row justify-end gap-2 pt-4">
                <Button
                    className="w-40"
                    type="submit"
                    variant="orange"
                    text="Submit"
                />
            </div>
        </form>
    );
};

export default EditChallengeForm;
