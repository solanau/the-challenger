import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Button from '../button';
import Text from '../text';

interface EnterPasswordDialogProps {
    email: string;
    isOpen: boolean;
    onClose(password?: string): void;
}

export default function EnterPasswordDialog({
    email,
    isOpen,
    onClose,
}: EnterPasswordDialogProps) {
    const [password, setPassword] = useState('');

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
                                            Log-in
                                        </Text>
                                    </Dialog.Title>

                                    <Text
                                        variant="dialog-paragraph"
                                        className="mt-2 opacity-40"
                                    >
                                        There is another user with the same
                                        email, in order to continue, please
                                        enter your password.
                                    </Text>

                                    <form>
                                        <label className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']">
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            readOnly
                                            className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                                            value={email}
                                            disabled={true}
                                        />

                                        <label className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                                            onChange={ev =>
                                                setPassword(ev.target.value)
                                            }
                                        />

                                        <div className="mt-4">
                                            <Button
                                                variant="orange"
                                                onClick={() =>
                                                    onClose(password)
                                                }
                                            >
                                                Log me in!
                                            </Button>
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
}
