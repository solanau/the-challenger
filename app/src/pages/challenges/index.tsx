/* eslint-disable react/no-unescaped-entities */
import Button from 'components/common/button';
import Text from 'components/common/text';
import { NextPage } from 'next';
import { TbPlus } from 'react-icons/tb';

const ChallengesPage: NextPage = () => (
    <>
        <div className="flex w-full flex-col gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
            <Text variant="big-heading">Challenges</Text>

            <Text variant="paragraph">
                Explore challenges available for you to use in your next event.
            </Text>

            <Button
                icon={TbPlus}
                text={'Create a challenge'}
                variant="transparent"
                className="bg-zinc-700"
            ></Button>
        </div>
    </>
);

export default ChallengesPage;
