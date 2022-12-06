import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { TbBrandFacebook, TbBrandGithub, TbBrandTwitter } from 'react-icons/tb';
import { AuthProviderType } from 'types/api';
import Button from '../button';
import Text from '../text';

interface EnterSocialDialogProps {
    methods: string[];
    isOpen: boolean;
    onClose(authProvider?: AuthProviderType): void;
}

export default function EnterSocialDialog({
    methods,
    isOpen,
    onClose,
}: EnterSocialDialogProps) {
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
                                            Social verification
                                        </Text>
                                    </Dialog.Title>

                                    <Text
                                        variant="dialog-paragraph"
                                        className="mt-2 opacity-40"
                                    >
                                        There is another user with the same
                                        email, in order to continue, please
                                        authenticate with one of the following
                                        providers to validate is you. {methods}
                                    </Text>
                                    {methods.includes('facebook.com') && (
                                        <Button
                                            icon={TbBrandFacebook}
                                            text={'Sign In with Facebook'}
                                            variant="orange"
                                            className="mt-4 !w-full"
                                            onClick={() =>
                                                onClose(
                                                    AuthProviderType.facebookProvider,
                                                )
                                            }
                                        >
                                            <TbBrandFacebook size={35} />
                                        </Button>
                                    )}
                                    {methods.includes('twitter.com') && (
                                        <Button
                                            icon={TbBrandTwitter}
                                            text={'Sign In with Twitter'}
                                            variant="orange"
                                            className="mt-4 !w-full"
                                            onClick={() =>
                                                onClose(
                                                    AuthProviderType.twitterProvider,
                                                )
                                            }
                                        >
                                            <TbBrandTwitter size={35} />
                                        </Button>
                                    )}
                                    {methods.includes('github.com') && (
                                        <Button
                                            icon={TbBrandGithub}
                                            text={'Sign In with Github'}
                                            variant="orange"
                                            className="mt-4 !w-full"
                                            onClick={() =>
                                                onClose(
                                                    AuthProviderType.githubProvider,
                                                )
                                            }
                                        >
                                            <TbBrandGithub size={35} />
                                        </Button>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
