import Button from 'components/common/button';
import Card from 'components/common/card';
import { useFormik } from 'formik';
import { createEvent } from 'lib/api/event';
import { SetStateAction } from 'react';
import { CreateEventPayload } from 'types/event';

interface CreateEventFormProps {
    setIsCreateEventModalOpen(value: SetStateAction<boolean>): void;
}

const CreateEventForm = (props: CreateEventFormProps) => {
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            location: '',
            date: '',
        },
        onSubmit: data => {
            handleCreateEvent(data);
        },
    });

    const handleCreateEvent = (createEventPayload: CreateEventPayload) => {
        props.setIsCreateEventModalOpen(false);
        createEvent(createEventPayload)
            .then(() => alert('Event created!'))
            .catch(error => alert(error));
    };

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

            <div className="pt-4">
                <label
                    htmlFor="event-location"
                    className="block w-full border-none bg-transparent py-2 outline-none"
                >
                    Location
                </label>

                <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                    <input
                        id="event-location"
                        name="location"
                        maxLength={32}
                        className="w-full bg-transparent outline-none"
                        onChange={formik.handleChange}
                        placeholder="Enter the event's location (ie. City, Country)"
                    />
                </Card>
            </div>

            <div className="pt-4">
                <label
                    htmlFor="event-date"
                    className="block w-full border-none bg-transparent py-2 outline-none"
                >
                    Date
                </label>

                <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                    <input
                        id="event-date"
                        name="date"
                        maxLength={32}
                        className="w-full bg-transparent outline-none"
                        onChange={formik.handleChange}
                        placeholder="Enter the event's start date: MM-DD-YYYY"
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

export default CreateEventForm;
