import Button from 'components/common/button';
import Card from 'components/common/card';
import Text from 'components/common/text';
import { Field, FieldArray, Form } from 'formik';
import { NextPage } from 'next';
import { SubmissionAnswerPayload } from 'types/submission';

interface SubmissionReviewFormProps {
    disabled?: boolean;
    answers: SubmissionAnswerPayload[];
}

const SubmissionReviewForm: NextPage<SubmissionReviewFormProps> = ({
    disabled = false,
    answers,
}) => (
    <Form>
        <FieldArray
            name="answers"
            render={() => (
                <div>
                    <div className="flex items-center gap-4">
                        <Text variant="sub-heading" className="my-4">
                            Answers
                        </Text>
                    </div>

                    {answers.map((answer, index) => (
                        <Card key={index} className="p-4">
                            <div className="flex items-start gap-4">
                                <div className="grow">
                                    <Text variant="sub-heading">
                                        #{index} {answer.question}:
                                    </Text>
                                    <Text
                                        className="pl-4"
                                        variant="sub-paragraph"
                                    >
                                        {answer.reply}
                                    </Text>
                                </div>

                                <label className="flex items-center gap-2">
                                    Approved
                                    <Field
                                        type="checkbox"
                                        name={`answers.${index}.isApproved`}
                                    />
                                </label>
                            </div>

                            <div className="pt-4">
                                <label
                                    htmlFor={`answers.${index}.comments`}
                                    className="block w-full border-none bg-transparent py-2 outline-none"
                                >
                                    Comments
                                </label>

                                <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                                    <Field
                                        as="textarea"
                                        maxLength={500}
                                        rows={4}
                                        id={`answers.${index}.comments`}
                                        name={`answers.${index}.comments`}
                                        className="w-full bg-transparent outline-none"
                                        placeholder="Enter comments"
                                    />
                                </Card>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        />

        <div className="pt-4">
            <label
                htmlFor="review-comments"
                className="block w-full border-none bg-transparent py-2 outline-none"
            >
                Comments
            </label>

            <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                <Field
                    as="textarea"
                    maxLength={500}
                    rows={4}
                    id="review-comments"
                    name="comments"
                    className="w-full bg-transparent outline-none"
                    placeholder="Enter comments"
                />
            </Card>
        </div>

        <div className="pt-4">
            <label
                htmlFor="review-status"
                className="block w-full border-none bg-transparent py-2 outline-none"
            >
                Status
            </label>

            <Card className="focus-within:border-primary">
                <Field
                    name="status"
                    id="review-status"
                    as="select"
                    className="w-full border-none bg-transparent p-5"
                    required
                >
                    <option
                        value={''}
                        className="bg-black bg-opacity-60"
                        disabled
                    >
                        Select status
                    </option>
                    <option
                        value={'pending'}
                        className="bg-black bg-opacity-60"
                    >
                        Pending
                    </option>
                    <option value="invalid" className="bg-black bg-opacity-60">
                        Invalid
                    </option>
                    <option
                        value="incorrect"
                        className="bg-black bg-opacity-60"
                    >
                        Incorrect
                    </option>
                    <option
                        value="completed"
                        className="bg-black bg-opacity-60"
                    >
                        Completed
                    </option>
                </Field>
            </Card>
        </div>

        <div className="width-full flex flex-row justify-end gap-2 pt-4">
            <Button
                className="w-40"
                type="submit"
                variant="orange"
                disabled={disabled}
                text="Send Review"
            />
        </div>
    </Form>
);

export default SubmissionReviewForm;
