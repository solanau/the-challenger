import Button from 'components/common/button';
import Card from 'components/common/card';
import Spinner from 'components/common/spinner';
import Text from 'components/common/text';
import { Field, Form, useField } from 'formik';

interface Challenge {
    id: string;
    title: string;
    description: string;
    points: number;
}

interface EventSettingsFormProps {
    isLoading?: boolean;
    eventStatus: string;
    challenges: Challenge[];
}

const EventSettingsForm = ({
    isLoading = false,
    eventStatus,
    challenges,
}: EventSettingsFormProps) => {
    const helper = useField('status')[2];
    const setStatusValue = helper.setValue;
    return (
        <Form>
            <div className="pt-4">
                <Text
                    className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                    variant="dialog-heading"
                >
                    Your Event's Status:{' '}
                    <span
                        className={`${
                            eventStatus &&
                            eventStatus.toLowerCase() === 'active'
                                ? 'text-green-500'
                                : 'text-pink-500'
                        }`}
                    >
                        {eventStatus.toUpperCase()}
                    </span>{' '}
                </Text>
            </div>

            <div className="pt-4">
                <label
                    htmlFor="event-title"
                    className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                >
                    Title{' '}
                </label>

                <Field
                    id="event-title"
                    name="title"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                    placeholder="Enter a title for the event"
                    maxLength={80}
                    required
                    disabled={isLoading}
                    autoComplete="off"
                />
            </div>

            <div className="pt-4">
                <label
                    htmlFor="event-description"
                    className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                >
                    Description{' '}
                </label>

                <Field
                    as="textarea"
                    id="event-description"
                    name="description"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                    placeholder="Enter a description for the event"
                    required
                    disabled={isLoading}
                    autoComplete="off"
                    maxLength={500}
                    rows={4}
                />
            </div>

            <div className="pt-4">
                <label
                    htmlFor="event-reviewers"
                    className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                >
                    Reviewers{' '}
                </label>

                <Field
                    id="event-reviewers"
                    name="reviewers"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                    placeholder="Enter a reviewers for the event"
                    maxLength={80}
                    required
                    disabled={isLoading}
                    autoComplete="off"
                />
            </div>

            <div className="pt-4">
                <label
                    htmlFor="event-managers"
                    className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                >
                    Managers{' '}
                </label>

                <Field
                    id="event-managers"
                    name="managers"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                    placeholder="Enter a managers for the event"
                    maxLength={80}
                    required
                    disabled={isLoading}
                    autoComplete="off"
                />
            </div>

            <div className="pt-4">
                <label
                    htmlFor="event-start-date"
                    className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                >
                    Start Date{' '}
                </label>

                <Field
                    id="event-start-date"
                    name="startDate"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                    placeholder="Enter a start date for the event"
                    type="datetime-local"
                    required
                    disabled={isLoading}
                />
            </div>

            <div className="pt-4">
                <label
                    htmlFor="event-end-date"
                    className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                >
                    End Date{' '}
                </label>

                <Field
                    id="event-end-date"
                    name="endDate"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                    placeholder="Enter a end date for the event"
                    type="datetime-local"
                    required
                    disabled={isLoading}
                />
            </div>

            <div role="group" aria-labelledby="checkbox-group" className="pt-4">
                <Text variant="sub-heading" className="mb-4">
                    Challenges
                </Text>

                <div className="flex max-h-96 flex-col gap-5 overflow-y-auto">
                    {challenges.map(challenge => (
                        <label key={challenge.id}>
                            <Card className="flex gap-8 p-8">
                                <Field
                                    type="checkbox"
                                    name="challenges"
                                    value={challenge.id}
                                />

                                <div className="flex grow items-center justify-between">
                                    <div>
                                        <Text variant="sub-heading">
                                            Title: {challenge.title}
                                        </Text>
                                        <Text variant="paragraph">
                                            Description: {challenge.description}
                                        </Text>
                                    </div>

                                    <Text variant="sub-heading">
                                        Points: {challenge.points}
                                    </Text>
                                </div>
                            </Card>
                        </label>
                    ))}
                </div>
            </div>

            <div className="width-full flex flex-row justify-end gap-2 pt-4">
                <Button type="submit" variant="orange" disabled={isLoading}>
                    {isLoading && <Spinner variant="large"></Spinner>}
                    Save Changes
                </Button>
                <Button
                    className="bg-green-500"
                    type="submit"
                    onClick={() => {
                        setStatusValue('active');
                    }}
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

export default EventSettingsForm;
