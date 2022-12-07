import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import Text from '../../common/text';

interface ModalProps<T> {
    title: string;
    subTitle: string;
    isOpen: boolean;
    children: ReactNode;
    onClose(data?: T): void;
}

const Modal = <T,>({
    title,
    subTitle,
    isOpen,
    children,
    onClose,
}: ModalProps<T>) => (
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => onClose()}>
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
                                <Text variant="dialog-heading">{title}</Text>
                            </Dialog.Title>

                            <Text
                                variant="dialog-paragraph"
                                className="mt-2 opacity-40"
                            >
                                {subTitle}
                            </Text>

                            {children}
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>
);

export default Modal;
