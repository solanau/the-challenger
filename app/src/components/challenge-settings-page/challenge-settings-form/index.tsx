import Button from 'components/common/button';
import Card from 'components/common/card';
import Spinner from 'components/common/spinner';
import Text from 'components/common/text';
import { Field, FieldArray, Form, useFormikContext } from 'formik';
import { AiOutlineClose } from 'react-icons/ai';
import { IoIosAdd } from 'react-icons/io';
import { FieldConfig } from 'types/form';

interface ChallengeSettingsFormProps {
    isLoading?: boolean;
}

const ChallengeSettingsForm = ({
    isLoading = false,
}: ChallengeSettingsFormProps) => {
    const { values } = useFormikContext<{ fieldsConfig: FieldConfig[] }>();

    return (
        <Form>
            <div className="pt-4">
                <label
                    htmlFor="challenge-title"
                    className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                >
                    Title{' '}
                </label>

                <Field
                    id="challenge-title"
                    name="title"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
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
                    Description{' '}
                </label>

                <Field
                    as="textarea"
                    id="challenge-description"
                    name="description"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                    placeholder="Enter a description for the challenge"
                    required
                    disabled={isLoading}
                    autoComplete="off"
                    maxLength={500}
                    rows={4}
                />
            </div>

            <div className="pt-4">
                <label
                    htmlFor="challenge-points"
                    className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                >
                    Points{' '}
                </label>

                <Field
                    id="challenge-points"
                    name="points"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                    placeholder="Enter a points for the challenge"
                    type="number"
                    required
                    disabled={isLoading}
                    autoComplete="off"
                />
            </div>

            <div className="pt-4">
                <label
                    htmlFor="challenge-category"
                    className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                >
                    Category{' '}
                </label>

                <Field
                    id="challenge-category"
                    name="category"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                    required
                    disabled={isLoading}
                    as="select"
                >
                    <option value="" className="bg-zinc-700">
                        Select a category
                    </option>
                    <option value="Social" className="bg-zinc-700">
                        Social
                    </option>
                    <option value="Video" className="bg-zinc-700">
                        Video
                    </option>
                    <option value="Concept" className="bg-zinc-700">
                        Concept
                    </option>
                    <option value="Wallet" className="bg-zinc-700">
                        Wallet
                    </option>
                    <option value="SDK" className="bg-zinc-700">
                        SDK
                    </option>
                    <option value="Deploy" className="bg-zinc-700">
                        Deploy
                    </option>
                    <option value="Staking" className="bg-zinc-700">
                        Staking
                    </option>
                    <option value="Game" className="bg-zinc-700">
                        Game
                    </option>
                    <option value="Client" className="bg-zinc-700">
                        Client
                    </option>
                    <option value="NFT" className="bg-zinc-700">
                        NFT
                    </option>
                </Field>
            </div>

            <div className="pt-4">
                <label
                    htmlFor="challenge-difficulty"
                    className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                >
                    Difficulty{' '}
                </label>

                <Field
                    id="challenge-difficulty"
                    name="difficulty"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                    required
                    disabled={isLoading}
                    as="select"
                >
                    <option value="" className="bg-zinc-700">
                        Select a difficulty
                    </option>
                    <option value="Easy" className="bg-zinc-700">
                        Easy
                    </option>
                    <option value="Medium" className="bg-zinc-700">
                        Medium
                    </option>
                    <option value="Hard" className="bg-zinc-700">
                        Hard
                    </option>
                </Field>
            </div>

            <div className="pt-4">
                <label
                    htmlFor="challenge-author-name"
                    className="block w-full border-none bg-transparent py-2 outline-none"
                >
                    Author Name{' '}
                </label>

                <Field
                    id="challenge-author-name"
                    name="authorName"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                    placeholder="Enter an author name for the challenge"
                    maxLength={80}
                    disabled={isLoading}
                    autoComplete="off"
                />
            </div>

            <div className="pt-4">
                <label
                    htmlFor="challenge-author-github"
                    className="block w-full border-none bg-transparent py-2 outline-none"
                >
                    Author Github{' '}
                </label>

                <Field
                    id="challenge-author-github"
                    name="authorGithub"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                    placeholder="Enter an author GitHub for the challenge"
                    maxLength={80}
                    disabled={isLoading}
                    autoComplete="off"
                />
            </div>

            <div className="pt-4">
                <label
                    htmlFor="challenge-author-twitter"
                    className="block w-full border-none bg-transparent py-2 outline-none"
                >
                    Author Twitter{' '}
                </label>

                <Field
                    id="challenge-author-twitter"
                    name="authorTwitter"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                    placeholder="Enter an author Twitter for the challenge"
                    maxLength={80}
                    disabled={isLoading}
                    autoComplete="off"
                />
            </div>

            <FieldArray
                name="fieldsConfig"
                render={arrayHelpers => (
                    <div>
                        <div className="flex items-center gap-4">
                            <Text variant="sub-heading" className="my-4">
                                Fields Configuration
                            </Text>

                            <Button
                                variant="orange"
                                type="button"
                                onClick={() =>
                                    arrayHelpers.push({
                                        field: '',
                                        type: '',
                                        label: '',
                                        placeholder: '',
                                        maxLength: 40,
                                        rows: 5,
                                    })
                                }
                            >
                                <IoIosAdd />
                            </Button>
                        </div>

                        <div className="flex max-h-96 flex-col gap-5 overflow-y-auto">
                            {values.fieldsConfig.map((fieldConfig, index) => (
                                <Card key={index} className="mb-8 p-4">
                                    <div className="mb-4 flex items-center justify-between gap-4">
                                        <Text variant="sub-heading">
                                            Field #{index + 1}
                                        </Text>
                                        <Button
                                            variant="danger"
                                            type="button"
                                            onClick={() =>
                                                arrayHelpers.remove(index)
                                            }
                                        >
                                            <AiOutlineClose />
                                        </Button>
                                    </div>

                                    <div className="pt-4">
                                        <label
                                            htmlFor={`challenge-field-configs.${index}.name`}
                                            className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                                        >
                                            Name{' '}
                                        </label>

                                        <Field
                                            id={`challenge-field-configs.${index}.name`}
                                            name={`fieldsConfig.${index}.name`}
                                            className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                                            placeholder="Enter the field name"
                                            maxLength={80}
                                            required
                                            disabled={isLoading}
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="pt-4">
                                        <label
                                            htmlFor={`challenge-field-configs.${index}.label`}
                                            className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                                        >
                                            Label{' '}
                                        </label>

                                        <Field
                                            id={`challenge-field-configs.${index}.label`}
                                            name={`fieldsConfig.${index}.label`}
                                            className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                                            placeholder="Enter the field label"
                                            maxLength={80}
                                            required
                                            disabled={isLoading}
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="pt-4">
                                        <label
                                            htmlFor={`challenge-field-configs.${index}.placeholder`}
                                            className="block w-full border-none bg-transparent py-2 outline-none"
                                        >
                                            Placeholder
                                        </label>

                                        <Field
                                            id={`challenge-field-configs.${index}.placeholder`}
                                            name={`fieldsConfig.${index}.placeholder`}
                                            className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                                            placeholder="Enter the field placeholder"
                                            maxLength={80}
                                            disabled={isLoading}
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="pt-4">
                                        <label
                                            htmlFor={`challenge-field-configs.${index}.type`}
                                            className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                                        >
                                            Type{' '}
                                        </label>

                                        <Field
                                            id={`challenge-field-configs.${index}.type`}
                                            name={`fieldsConfig.${index}.type`}
                                            className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                                            required
                                            disabled={isLoading}
                                            as="select"
                                        >
                                            <option
                                                value=""
                                                className="bg-zinc-700"
                                            >
                                                Select type
                                            </option>
                                            <option
                                                value="text"
                                                className="bg-zinc-700"
                                            >
                                                Text
                                            </option>
                                            <option
                                                value="textArea"
                                                className="bg-zinc-700"
                                            >
                                                Text Area
                                            </option>
                                            <option
                                                value="number"
                                                className="bg-zinc-700"
                                            >
                                                Number
                                            </option>
                                            <option
                                                value="email"
                                                className="bg-zinc-700"
                                            >
                                                Email
                                            </option>
                                        </Field>
                                    </div>

                                    {(fieldConfig.type === 'text' ||
                                        fieldConfig.type === 'textArea') && (
                                        <div className="pt-4">
                                            <label
                                                htmlFor={`challenge-field-configs.${index}.maxLength`}
                                                className="block w-full border-none bg-transparent py-2 outline-none"
                                            >
                                                Max Length
                                            </label>

                                            <Field
                                                id={`challenge-field-configs.${index}.maxLength`}
                                                name={`fieldsConfig.${index}.maxLength`}
                                                className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                                                placeholder="Enter the field max length"
                                                type="number"
                                                required
                                                disabled={isLoading}
                                                autoComplete="off"
                                            />
                                        </div>
                                    )}

                                    {fieldConfig.type === 'textArea' && (
                                        <div className="pt-4">
                                            <label
                                                htmlFor={`challenge-field-configs.${index}.rows`}
                                                className="block w-full border-none bg-transparent py-2 outline-none"
                                            >
                                                Rows
                                            </label>

                                            <Field
                                                id={`challenge-field-configs.${index}.rows`}
                                                name={`fieldsConfig.${index}.rows`}
                                                className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                                                placeholder="Enter the field rows"
                                                type="number"
                                                required
                                                disabled={isLoading}
                                                autoComplete="off"
                                            />
                                        </div>
                                    )}
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            />

            <div className="width-full flex flex-row justify-end gap-2 pt-4">
                <Button type="submit" variant="orange" disabled={isLoading}>
                    {isLoading && <Spinner variant="large"></Spinner>}
                    Save changes
                </Button>
                <Button
                    className="bg-green-400"
                    type="submit"
                    variant="orange"
                    disabled={isLoading}
                >
                    {isLoading && <Spinner variant="large"></Spinner>}
                    Publish
                </Button>
            </div>
        </Form>
    );
};

export default ChallengeSettingsForm;
