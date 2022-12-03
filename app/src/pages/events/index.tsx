/* eslint-disable react/no-unescaped-entities */
import Button from 'components/common/button';
import Text from 'components/common/text';
import { NextPage } from 'next';
import { TbPlus } from 'react-icons/tb';

const EventsPage: NextPage = () => (
    <>
        <div className="flex w-full flex-col flex-wrap gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
            <Text variant="big-heading">Events</Text>
            <Text variant="paragraph">
                Explore events near by and start competing with other students
                for the grand prize.
            </Text>

            <div>
                <Button
                    icon={TbPlus}
                    text={'Create an event'}
                    variant="transparent"
                    className="bg-zinc-700"
                ></Button>
            </div>
        </div>
    </>
);

export default EventsPage;
