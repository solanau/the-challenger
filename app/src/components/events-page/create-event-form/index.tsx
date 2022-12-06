import Button from 'components/common/button';
import Card from 'components/common/card';
import { Field, Form } from 'formik';

const CreateEventForm = () => (
    <Form>
        <div className="pt-4">
            <label
                htmlFor="event-title"
                className="required block w-full border-none bg-transparent py-2 outline-none"
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
                    required
                />
            </Card>
        </div>

        <div className="pt-4">
            <label
                htmlFor="event-description"
                className="required block w-full border-none bg-transparent py-2 outline-none"
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
                    required
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
    </Form>
);

export default CreateEventForm;