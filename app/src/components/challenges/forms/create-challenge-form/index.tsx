import Button from 'components/common/button';
import Card from 'components/common/card';
import { useFormik } from 'formik';
import { createChallenge } from 'lib/api/challenge';
import { SetStateAction } from 'react';
import { CreateChallengePayload } from 'types/api/challenge';

interface CreateChallengeFormProps {
    setIsCreateChallengeModalOpen(value: SetStateAction<boolean>): void;
}

const CreateChallengeForm = (props: CreateChallengeFormProps) => {
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            tags: '',
        },
        onSubmit: data => {
            handleCreateChallenge(data);
        },
    });
    const handleCreateChallenge = (
        createChallengePayload: CreateChallengePayload,
    ) => {
        props.setIsCreateChallengeModalOpen(false);
        createChallenge(createChallengePayload)
            .then(() => alert('Challenge created!'))
            .catch(error => alert(error));
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="pt-4">
                <label
                    htmlFor="challenge-title"
                    className="block w-full border-none bg-transparent py-2 outline-none"
                >
                    Title
                </label>

                <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                    <input
                        id="challenge-title"
                        name="title"
                        maxLength={32}
                        className="w-full bg-transparent outline-none"
                        onChange={formik.handleChange}
                        placeholder="Enter a title for the challenge"
                    />
                </Card>
            </div>

            <div className="pt-4">
                <label
                    htmlFor="challenge-description"
                    className="block w-full border-none bg-transparent py-2 outline-none"
                >
                    Description
                </label>

                <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                    <textarea
                        id="challenge-description"
                        name="description"
                        className="w-full bg-transparent outline-none"
                        maxLength={500}
                        rows={4}
                        onChange={formik.handleChange}
                        placeholder="Enter a description for the challenge"
                    />
                </Card>
            </div>

            <div className="pt-4">
                <label
                    htmlFor="challenge-tags"
                    className="block w-full border-none bg-transparent py-2 outline-none"
                >
                    Tags
                </label>

                <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                    <textarea
                        id="challenge-tags"
                        name="tags"
                        className="w-full bg-transparent outline-none"
                        maxLength={500}
                        rows={4}
                        onChange={formik.handleChange}
                        placeholder="Enter some comma-separated tags for this challenge"
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

export default CreateChallengeForm;
