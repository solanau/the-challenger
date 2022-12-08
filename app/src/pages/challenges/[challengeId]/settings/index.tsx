import ChallengeSettingsForm from 'components/challenge-settings-page/challenge-settings-form';
import Text from 'components/common/text';
import { FirebaseError } from 'firebase/app';
import { Formik } from 'formik';
import { useChallenge } from 'hooks/use-challenge';
import { updateChallenge } from 'lib/api';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { UpdateChallengePayload } from 'types/challenge';
import { fromChallengeSettingsFormData } from 'utils/challenge';

type ChallengeSettingsPageProps = {
    challengeId: string;
};

const ChallengeSettingsPage: NextPage<ChallengeSettingsPageProps> = ({
    challengeId,
}: ChallengeSettingsPageProps) => {
    const challenge = useChallenge(challengeId);
    const [isLoading, setIsLoading] = useState(false);

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
                if (typeof error === 'string') {
                    toast(error, {
                        type: 'error',
                    });
                } else if (error instanceof FirebaseError) {
                    toast(error.code, {
                        type: 'error',
                    });
                } else {
                    toast(JSON.stringify(error), {
                        type: 'error',
                    });
                }
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <>
            <div className="flex w-full flex-col gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                <Text variant="big-heading">Challenge Settings</Text>

                <Text variant="paragraph">
                    Adapt the challenge to your needs, customize it as much as
                    you want. Once the challenge is published, no more changes
                    can be issued.
                </Text>
            </div>

            <div className="flex w-full flex-col gap-5 bg-gradient-to-tr p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                {challenge && (
                    <Formik
                        initialValues={{
                            title: challenge.title,
                            description: challenge.description,
                            points: challenge?.points ?? 0,
                            category: challenge?.category ?? '',
                            difficulty: challenge?.difficulty ?? '',
                            authorName: challenge?.authorName ?? '',
                            authorGithub: challenge?.authorGithub ?? '',
                            authorTwitter: challenge?.authorTwitter ?? '',
                            fieldsConfig: challenge?.fieldsConfig ?? [],
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
    );
};

export default ChallengeSettingsPage;

export const getServerSideProps: GetServerSideProps = async context => {
    let challengeId = context.params.challengeId;
    if (challengeId instanceof Array) {
        challengeId = challengeId[0];
    }

    return {
        props: {
            challengeId,
        },
    };
};
