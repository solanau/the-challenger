/* eslint-disable react/no-unescaped-entities */
import EditChallengeForm from 'components/challenges-page/edit-challenge-form';
import Button from 'components/common/button';
import Card from 'components/common/card';
import Modal from 'components/common/modal';
import Text from 'components/common/text';
import { useChallenges } from 'hooks/use-challenges';
import { createChallenge } from 'lib/api';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { TbPlus } from 'react-icons/tb';
import { EditChallengePayload } from 'types/challenge';
import { v4 as uuid } from 'uuid';

const ChallengesPage: NextPage = () => {
    const [isCreateChallengeModalOpen, setIsCreateChallengeModalOpen] =
        useState(false);
    const challenges = useChallenges();

    const handleCreateChallenge = (
        editChallengePayload?: EditChallengePayload,
    ) => {
        setIsCreateChallengeModalOpen(false);

        if (editChallengePayload) {
            createChallenge({ id: uuid(), ...editChallengePayload })
                .then(() => alert('Challenge created!'))
                .catch(error => alert(error));
        }
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
                        onClose={() => setIsCreateChallengeModalOpen(false)}
                    >
                        <EditChallengeForm
                            onSubmit={handleCreateChallenge}
                        ></EditChallengeForm>
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
                                <Link href={`challenges/${challenge.id}`}>
                                    <a>
                                        <Button variant="orange">
                                            View Preview
                                        </Button>
                                    </a>
                                </Link>

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
