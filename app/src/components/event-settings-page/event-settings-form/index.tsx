import Button from 'components/common/button';
import Card from 'components/common/card';
import Text from 'components/common/text';
import { Field, Form } from 'formik';

interface Challenge {
    id: string;
    title: string;
    description: string;
    points: number;
}

interface EventSettingsFormProps {
    challenges: Challenge[];
}

const EventSettingsForm = ({ challenges }: EventSettingsFormProps) => (
    <Form>
        <div className="pt-4">
            <label
                htmlFor="event-title"
                className="block w-full border-none bg-transparent py-2 outline-none"
            >
                Title
            </label>

            <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                <Field
                    id="event-title"
                    name="title"
                    maxLength={32}
                    className="w-full bg-transparent outline-none"
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
                <Field
                    as="textarea"
                    id="event-description"
                    name="description"
                    className="w-full bg-transparent outline-none"
                    maxLength={500}
                    rows={4}
                    placeholder="Enter a description for the event"
                />
            </Card>
        </div>

        <div className="pt-4">
            <label
                htmlFor="event-reviewers"
                className="block w-full border-none bg-transparent py-2 outline-none"
            >
                Reviewers
            </label>

            <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                <Field
                    id="event-reviewers"
                    name="reviewers"
                    className="w-full bg-transparent outline-none"
                    placeholder="Enter reviewers for the event"
                />
            </Card>
        </div>

        <div className="pt-4">
            <label
                htmlFor="event-managers"
                className="block w-full border-none bg-transparent py-2 outline-none"
            >
                Managers
            </label>

            <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                <Field
                    id="event-managers"
                    name="managers"
                    className="w-full bg-transparent outline-none"
                    placeholder="Enter managers for the event"
                />
            </Card>
        </div>

        <div className="pt-4">
            <label
                htmlFor="event-start-date"
                className="block w-full border-none bg-transparent py-2 outline-none"
            >
                Start Date
            </label>

            <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                <Field
                    id="event-start-date"
                    name="startDate"
                    type="datetime-local"
                    className="w-full bg-transparent outline-none"
                    placeholder="Enter a start date for the event"
                />
            </Card>
        </div>

        <div className="pt-4">
            <label
                htmlFor="event-end-date"
                className="block w-full border-none bg-transparent py-2 outline-none"
            >
                End Date
            </label>

            <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                <Field
                    id="event-end-date"
                    name="endDate"
                    type="datetime-local"
                    className="w-full bg-transparent outline-none"
                    placeholder="Enter a end date for the event"
                />
            </Card>
        </div>

        <div role="group" aria-labelledby="checkbox-group" className="pt-4">
            <Text variant="sub-heading" className="mb-4">
                Challenges
            </Text>

            <div className="flex flex-col gap-5">
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
            <Button
                className="w-40"
                type="submit"
                variant="orange"
                text="Save changes"
            />
        </div>
    </Form>
);

export default EventSettingsForm;
