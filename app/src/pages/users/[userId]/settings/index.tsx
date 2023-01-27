import Button from 'components/common/button';
import Text from 'components/common/text';
import UserSettingsForm from 'components/user-settings-page/user-settings-form';
import { Formik } from 'formik';
import { setUser } from 'lib/api';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { UpdateUserFormData } from 'types/user';

const UserSettingsPage: NextPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { isLoggedIn, user } = useAuth();
    const router = useRouter();
    const eventId =
        (router.query.eventId instanceof Array
            ? router.query.eventId[0]
            : router.query.eventId) ?? null;

    const handleUpdateUser = async (updateUserFormData: UpdateUserFormData) => {
        setIsLoading(true);

        setUser(updateUserFormData)
            .then(() => {
                toast('Changes saved!', {
                    type: 'success',
                });
                router.push(eventId ? `/events/${eventId}` : '/');
            })
            .catch(error => {
                toast(error, {
                    type: 'error',
                });
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <>
            <section className="mt-36 px-4 pt-20 sm:px-8 md:mt-0 md:px-16 lg:px-32 xl:px-48">
                {!isLoggedIn && (
                    <div className="flex w-full grow flex-col items-center justify-center gap-3 p-5 text-center sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                        <Text variant="sub-heading">
                            Sign in to view the challenge.
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
                            }}
                            onSubmit={handleUpdateUser}
                            enableReinitialize={true}
                        >
                            <UserSettingsForm
                                isLoading={isLoading}
                            ></UserSettingsForm>
                        </Formik>
                    </>
                )}
            </section>
        </>
    );
};

export default UserSettingsPage;
