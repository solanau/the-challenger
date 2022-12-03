import { Dialog, Transition } from '@headlessui/react';
import Button from 'components/common/button';
import Card from 'components/common/card';
import { useFormik } from 'formik';
import { Fragment } from 'react';
import { CreateEventPayload } from 'types/event';
import Text from '../../common/text';

interface CreateEventModalProps {
    isOpen: boolean;
    onClose(data?: CreateEventPayload): void;
}

const CreateEventModal = ({ isOpen, onClose }: CreateEventModalProps) => {
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        onSubmit: async value => {
            onClose(value);
        },
    });

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={() => onClose()}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-base p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3">
                                        <Text variant="dialog-heading">
                                            New Event
                                        </Text>
                                    </Dialog.Title>

                                    <Text
                                        variant="dialog-paragraph"
                                        className="mt-2 opacity-40"
                                    >
                                        Create a new event and add challenges
                                        for participants to compete.
                                    </Text>

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
                                                    onChange={
                                                        formik.handleChange
                                                    }
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
                                                    onChange={
                                                        formik.handleChange
                                                    }
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

                                            <Button
                                                className="w-40"
                                                type="button"
                                                variant="black"
                                                text="Cancel"
                                                onClick={() => onClose()}
                                            />
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default CreateEventModal;
