import ChallengeSettingsForm from 'components/challenge-settings-page/challenge-settings-form';
import Text from 'components/common/text';
import { Formik } from 'formik';
import { useChallenge } from 'hooks/use-challenge';
import { updateChallenge } from 'lib/api';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'providers/AuthProvider';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { UpdateChallengePayload } from 'types/challenge';
import { fromChallengeSettingsFormData } from 'utils/challenge';

const ChallengeSettingsPage: NextPage = () => {
    const router = useRouter();
    const challengeId =
        router.query.challengeId instanceof Array
            ? router.query.challengeId[0]
            : router.query.challengeId;

    const [isLoading, setIsLoading] = useState(false);
    const { isLoggedIn, isAdmin, credential, user } = useAuth();
    const challenge = useChallenge(challengeId, user);

    const handleUpdateChallenge = (
        updateChallengePayload: UpdateChallengePayload,
    ) => {
        setIsLoading(true);

        updateChallenge(challengeId, updateChallengePayload)
            .then(() =>
                toast('Challenge updated!', {
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

    return (
        <>
            {isLoggedIn && user === null && (
                <div className="flex w-full grow flex-col items-center justify-center gap-3 p-5 text-center sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                    <Text variant="sub-heading">
                        Only users that have a profile can access this page. In
                        order to set yours, go ahead and{' '}
                        <Link href={`/users/${credential.id}/settings`}>
                            <a className="text-primary underline">
                                set up your profile
                            </a>
                        </Link>{' '}
                        to get started.
                    </Text>
                </div>
            )}

            {/* {isLoggedIn && user !== null && !user.isAdmin && (
                <div className="flex w-full grow flex-col items-center justify-center gap-3 p-5 text-center sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                    <Text variant="sub-heading">
                        You're not authorized to access this page.
                    </Text>
                </div>
            )} */}

            {challenge && challenge.reviewStatus && !isAdmin ?
                <>
                    <div className="flex w-full grow flex-col items-center justify-center gap-3 p-5 text-center sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                        <Text variant="sub-heading">
                            This challenge is already approved, if you want to modify it please contact us at support@challenger.solanau.org
                        </Text>
                    </div>
                </>
                :

                <>
                    <div className="flex w-full flex-col gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                        <Text variant="big-heading">Challenge Settings</Text>

                        <Text variant="paragraph">
                            Adapt the challenge to your needs, customize it as
                            much as you want. Once the challenge is published,
                            no more changes can be issued.
                        </Text>
                    </div>



                    {!isAdmin && challenge && challenge.userId != user.id ?

                        <div className="flex w-full grow flex-col items-center justify-center gap-3 p-5 text-center sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                            <Text variant="sub-heading">
                                Nothin
                            </Text>
                        </div>
                        :
                        null
                    }

                    <div className="flex w-full flex-col gap-5 bg-gradient-to-tr p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                        {challenge && (isAdmin || challenge.userId == user.id) && (
                            <Formik
                                initialValues={{
                                    title: challenge.title,
                                    description: challenge.description,
                                    fullDescription: challenge.fullDescription,
                                    points: challenge?.points ?? 0,
                                    category: challenge?.category ?? '',
                                    difficulty: challenge?.difficulty ?? '',
                                    authorName: challenge?.authorName ?? '',
                                    authorGithub: challenge?.authorGithub ?? '',
                                    authorTwitter:
                                        challenge?.authorTwitter ?? '',
                                    fieldsConfig: challenge?.fieldsConfig ?? [],
                                    reviewStatus: challenge?.reviewStatus ?? ''
                                }}
                                onSubmit={values =>
                                    handleUpdateChallenge(
                                        fromChallengeSettingsFormData(values),
                                    )
                                }
                            >
                                <ChallengeSettingsForm
                                    isLoading={isLoading}
                                ></ChallengeSettingsForm>
                            </Formik>
                        )}
                    </div>
                </>
            }
        </>
    );
};

export default ChallengeSettingsPage;
