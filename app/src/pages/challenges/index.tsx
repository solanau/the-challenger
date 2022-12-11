import CreateChallengeForm from 'components/challenges-page/create-challenge-form';
import Button from 'components/common/button';
import Card from 'components/common/card';
import Modal from 'components/common/modal';
import Text from 'components/common/text';
import { FirebaseError } from 'firebase/app';
import { Formik } from 'formik';
import { useChallenges } from 'hooks/use-challenges';
import { createChallenge } from 'lib/api';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { TbPlus } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { CreateChallengePayload } from 'types/challenge';

const ChallengesPage: NextPage = () => {
    const [isCreateChallengeModalOpen, setIsCreateChallengeModalOpen] =
        useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const challenges = useChallenges({ version: 1 });
    const router = useRouter();

    const handleCreateChallenge = (
        createChallengePayload: CreateChallengePayload,
    ) => {
        setIsLoading(true);

        createChallenge(createChallengePayload)
            .then(data => {
                toast('Challenge created!', {
                    type: 'success',
                });
                router.push(`/challenges/${data.id}/settings`);
            })
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
            .finally(() => {
                setIsLoading(false);
                setIsCreateChallengeModalOpen(false);
            });
    };

    return (
        <>
            <div className="flex w-full flex-col gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                <Text variant="big-heading">Challenges</Text>

                <Text variant="paragraph">
                    Explore challenges available for you to use in your next
                    event.
                </Text>

                <div>
                    <Button
                        icon={TbPlus}
                        text={'Create a challenge'}
                        variant="transparent"
                        className="bg-zinc-700"
                        onClick={() =>
                            setIsCreateChallengeModalOpen(
                                !isCreateChallengeModalOpen,
                            )
                        }
                    ></Button>

                    <Modal
                        title="New Challenge"
                        subTitle="Create a new challenge that can be added to events."
                        isOpen={isCreateChallengeModalOpen}
                        onClose={() =>
                            !isLoading && setIsCreateChallengeModalOpen(false)
                        }
                    >
                        <Formik
                            initialValues={{
                                title: '',
                                description: '',
                            }}
                            onSubmit={handleCreateChallenge}
                        >
                            <CreateChallengeForm
                                isLoading={isLoading}
                            ></CreateChallengeForm>
                        </Formik>
                    </Modal>
                </div>
            </div>

            <div className="flex w-full flex-row flex-wrap gap-5 bg-gradient-to-tr p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                {challenges.map(challenge => (
                    <Card
                        key={challenge.id}
                        className="flex min-w-fit flex-1 flex-col justify-between gap-10 p-12"
                    >
                        <div className="flex flex-col gap-5">
                            <Text className="min-w-fit" variant="big-heading">
                                {challenge.title}
                            </Text>
                            <Text variant="paragraph">
                                {challenge.description}
                            </Text>

                            <div className="flex flex-row justify-end gap-2">
                                <Link
                                    href={`challenges/${challenge.id}/settings`}
                                >
                                    <a>
                                        <Button variant="black">
                                            Settings
                                        </Button>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default ChallengesPage;
