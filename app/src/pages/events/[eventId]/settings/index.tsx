/* eslint-disable react/no-unescaped-entities */
import Card from 'components/common/card';
import Text from 'components/common/text';
import { useChallenges } from 'hooks/use-challenges';
import { NextPage } from 'next';

const EventSettingsPage: NextPage = () => {
    const challenges = useChallenges();

    return (
        <>
            <div className="flex w-full flex-col gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                <Text variant="big-heading">Event Settings</Text>

                <Text variant="paragraph">
                    Adapt the event to your needs, customize it as much as you
                    want. Once the event is published, no more changes can be
                    issued.
                </Text>
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
                        </div>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default EventSettingsPage;
