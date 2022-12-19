import Text from 'components/common/text';
import EventsPreviewComponent from 'components/events-page/events-preview-page';
import { useEvents } from 'hooks/use-events';
import { NextPage } from 'next';
import { useAuth } from 'providers/AuthProvider';

const EventsPage: NextPage = () => {
    const { user } = useAuth();
    const events = useEvents();

    return (
        <>
            <div className="flex w-full flex-col gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                <Text variant="big-heading">Your Events</Text>
            </div>

            {user && (
                <EventsPreviewComponent
                    events={events.filter(event => event.userId === user.id)}
                    user={user}
                    filterStartValue=""
                />
            )}
        </>
    );
};

export default EventsPage;
