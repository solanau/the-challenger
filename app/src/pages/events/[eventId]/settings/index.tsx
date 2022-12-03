/* eslint-disable react/no-unescaped-entities */
import Text from 'components/common/text';
import { NextPage } from 'next';

const EventSettingsPage: NextPage = () => (
    <>
        <div className="flex w-full flex-col gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
            <Text variant="big-heading">Event Settings</Text>

            <Text variant="paragraph">
                Adapt the event to your needs, customize it as much as you want.
                Once the event is published, no more changes can be issued.
            </Text>
        </div>
    </>
);

export default EventSettingsPage;
