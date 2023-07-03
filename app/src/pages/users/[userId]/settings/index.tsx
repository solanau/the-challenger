import { useWallet } from '@solana/wallet-adapter-react';
import Button from 'components/common/button';
import Text from 'components/common/text';
import UserSettingsForm from 'components/user-settings-page/user-settings-form';
import { Formik, FormikProps, FormikValues } from 'formik';
import { setUser } from 'lib/api';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { useEffect, useRef, useState } from 'react';
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
            .then(() =>
                toast('Changes saved!', {
                    type: 'success',
                }),
            )
            .catch(error => {
                toast(error, {
                    type: 'error',
                });
            })
            .finally(() => setIsLoading(false));
    };

    const formik = useRef<FormikProps<FormikValues>>(null);
    const { publicKey, sendTransaction } = useWallet();

    useEffect(() => {
        if (publicKey && formik.current) {
            formik.current.setFieldValue('walletPublicKey', publicKey.toBase58());
        }
    }, [publicKey, formik.current]);

    return (
        <>
            <section className="mt-0 px-8 pt-20 sm:px-8 md:px-16 lg:px-32 xl:px-48 mb-40">
                <div className="flex w-full flex-col gap-6 px-10 sm:px-16 md:px-32 lg:px-64 xl:px-96 justify-beginning">
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
                                        <Button variant="purple" text="Sign in" />
                                    </a>
                                </Link>
                            </div>
                        </div>
                    )}

                    {isLoggedIn && (
                        <>
                            <h1>
                                <Text variant="heading">Edit Profile</Text>
                            </h1>

                            <Formik
                                initialValues={{
                                    fullName: user?.fullName ?? '',
                                    userName: user?.userName ?? '',
                                    walletPublicKey: user?.walletPublicKey ?? '',
                                    avatar: user?.avatar ?? null,
                                    skills: user?.skills ?? [],
                                }}
                                onSubmit={handleUpdateUser}
                                enableReinitialize={true}
                                innerRef={formik}
                            >
                                {({ errors, touched, isValidating }) => (
                                    <UserSettingsForm
                                        isLoading={isLoading}
                                        errors={errors}
                                        touched={touched}
                                    />
                                )}
                            </Formik>
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default UserSettingsPage;

