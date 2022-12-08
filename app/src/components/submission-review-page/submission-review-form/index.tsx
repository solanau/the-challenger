import Button from 'components/common/button';
import Card from 'components/common/card';
import Spinner from 'components/common/spinner';
import Text from 'components/common/text';
import { Field, FieldArray, Form } from 'formik';
import { NextPage } from 'next';
import { SubmissionAnswerPayload } from 'types/submission';

interface SubmissionReviewFormProps {
    isLoading?: boolean;
    answers: SubmissionAnswerPayload[];
}

const SubmissionReviewForm: NextPage<SubmissionReviewFormProps> = ({
    isLoading = false,
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
                        <Card key={index} className="mb-8 p-4">
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
                                        disabled={isLoading}
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

                                <Field
                                    as="textarea"
                                    id={`answers.${index}.comments`}
                                    name={`answers.${index}.comments`}
                                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                                    placeholder="Enter a description for the event"
                                    disabled={isLoading}
                                    autoComplete="off"
                                    maxLength={500}
                                    rows={4}
                                />
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

            <Field
                as="textarea"
                id="review-comments"
                name="comments"
                className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                placeholder="Enter a description for the event"
                disabled={isLoading}
                autoComplete="off"
                maxLength={500}
                rows={4}
            />
        </div>

        <div className="pt-4">
            <label
                htmlFor="review-status"
                className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
            >
                Status&nbsp;
            </label>

            <Field
                id="review-status"
                name="status"
                className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                required
                disabled={isLoading}
                as="select"
            >
                <option value="" className="bg-zinc-700">
                    Select status
                </option>
                <option value="pending" className="bg-zinc-700">
                    Pending
                </option>
                <option value="incorrect" className="bg-zinc-700">
                    Incorrect
                </option>
                <option value="invalid" className="bg-zinc-700">
                    Invalid
                </option>
                <option value="completed" className="bg-zinc-700">
                    Completed
                </option>
            </Field>
        </div>

        <div className="width-full flex flex-row justify-end gap-2 pt-4">
            <Button type="submit" variant="orange" disabled={isLoading}>
                {isLoading && <Spinner variant="large"></Spinner>}
                Send Review
            </Button>
        </div>
    </Form>
);

export default SubmissionReviewForm;
