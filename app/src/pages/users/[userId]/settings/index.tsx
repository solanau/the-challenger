import { useWallet } from '@solana/wallet-adapter-react';
import Button from 'components/common/button';
import Text from 'components/common/text';
import UserSettingsForm from 'components/user-settings-page/user-settings-form';
import { Formik } from 'formik';
import { setUser, updateUser } from 'lib/api';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { useCallback, useState } from 'react';
import { TbBrandGithub } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { SetUserPayload, UpdateUserFormData } from 'types/user';

const UserSettingsPage: NextPage = () => {
    const { publicKey } = useWallet();
    const [isLoading, setIsLoading] = useState(false);
    const { isLoggedIn, user } = useAuth();
    const [signatureVerified, setSignatureVerified] = useState(false);
    const router = useRouter();
    const eventId =
        router.query.eventId instanceof Array
            ? router.query.eventId[0]
            : router.query.eventId;

    const handleUpdateUser = useCallback(
        async (updateUserFormData: UpdateUserFormData) => {
            if (!signatureVerified) {
                toast('You must provide a public key');
                return;
            }
            if (signatureVerified && publicKey) {
                updateUserFormData.walletPublicKey = publicKey.toBase58();
            }
            setIsLoading(true);

            const updateUserData: SetUserPayload = {
                fullName: updateUserFormData.fullName,
                userName: updateUserFormData.userName,
                walletPublicKey: updateUserFormData.walletPublicKey,
            };

            if (
                updateUserFormData.canCreateRequested === 'Yes' &&
                user &&
                user.canCreateStatus != 'approved' &&
                user.canCreateStatus != 'denied'
            )
                updateUserData.canCreateStatus = 'pending';

            let update = (data: SetUserPayload) => setUser(data);
            if (user) update = (data: SetUserPayload) => updateUser(data);
            update(updateUserData)
                .then(() => {
                    toast('Changes saved!', {
                        type: 'success',
                    });
                    router.replace('/');
                })
                .catch(error => {
                    toast(error, {
                        type: 'error',
                    });
                })
                .finally(() => setIsLoading(false));
        },

        [publicKey, signatureVerified, user],
    );

    return (
        <>
            <section className="mt-36 px-4 pt-20 sm:px-8 md:mt-0 md:px-16 lg:px-32 xl:px-48">
                {!isLoggedIn && (
                    <div className="flex w-full grow flex-col items-center justify-center gap-3 p-5 text-center sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                        <TbBrandGithub size={35} />
                        <Text variant="sub-heading">
                            Sign in to modify your profile.
                        </Text>

                        <div className="flex flex-row gap-2">
                            <Link
                                href={eventId ? `/events/${eventId}` : '/'}
                                passHref
                            >
                                <a>
                                    <Button
                                        variant="transparent"
                                        text="Go back"
                                    />
                                </a>
                            </Link>
                            <Link
                                href={{
                                    pathname: '/login',
                                    query: eventId
                                        ? {
                                              eventId,
                                          }
                                        : {},
                                }}
                                passHref
                            >
                                <a>
                                    <Button variant="orange" text="Sign in" />
                                </a>
                            </Link>
                        </div>
                    </div>
                )}

                {isLoggedIn && (
                    <>
                        <h1>
                            <Text variant="heading">Profile Settings</Text>
                        </h1>

                        <Formik
                            initialValues={{
                                fullName: user?.fullName ?? '',
                                userName: user?.userName ?? '',
                                walletPublicKey: user?.walletPublicKey ?? '',
                                canCreateRequested: 'No',
                            }}
                            onSubmit={handleUpdateUser}
                            enableReinitialize={true}
                        >
                            <UserSettingsForm
                                isLoading={isLoading}
                                signatureVerified={signatureVerified}
                                setSignatureVerified={setSignatureVerified}
                            ></UserSettingsForm>
                        </Formik>
                    </>
                )}
            </section>
        </>
    );
};

export default UserSettingsPage;
