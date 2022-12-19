import Button from 'components/common/button';
import Card from 'components/common/card';
import Text from 'components/common/text';
import Link from 'next/link';
import { ChangeEvent, FC, useMemo, useState } from 'react';
import { EventPayload, UserPayload } from 'types';

interface EventsPreviewComponentProps {
    events: EventPayload[];
    user: UserPayload;
    filterStartValue?: string;
}

const EventsPreviewComponent: FC<EventsPreviewComponentProps> = (
    props: EventsPreviewComponentProps,
) => {
    const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>(
        props.filterStartValue ?? 'active',
    );
    const filteredEvents = useMemo(() => {
        if (!selectedStatusFilter) {
            return props.events;
        }
        return props.events.filter(
            event => event.status === selectedStatusFilter,
        );
    }, [selectedStatusFilter, props.events]);

    const handleStatusFilterChange = (
        event: ChangeEvent<HTMLSelectElement>,
    ) => {
        setSelectedStatusFilter(event.target.value);
    };

    return (
        <div className="flex w-full flex-row flex-wrap gap-5 bg-gradient-to-tr p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
            <div>
                <select
                    name="filter-list"
                    id="filter-list"
                    onChange={handleStatusFilterChange}
                    className="rounded-md border-2 border-white bg-white px-4 py-2 text-black"
                    defaultValue={props.filterStartValue ?? 'active'}
                >
                    <option value="">All</option>
                    <option value="active">Active</option>
                    <option value="draft">Drafts</option>
                </select>
            </div>
            {filteredEvents.map(event => (
                <Card
                    key={event.id}
                    className="flex min-w-fit flex-1 flex-col justify-between gap-10 p-12"
                >
                    <div className="flex flex-col gap-5">
                        <Text
                            className="min-w-fit break-all"
                            variant="big-heading"
                        >
                            {event.title}
                        </Text>
                        <Text variant="paragraph">{event.description}</Text>

                        <div className="flex flex-row">
                            <div className="flex flex-row justify-start">
                                <Text
                                    className={`my-auto ${
                                        event.status === 'draft'
                                            ? 'text-pink-500'
                                            : 'text-green-500'
                                    }`}
                                    variant="label"
                                >
                                    {event.status}
                                </Text>
                            </div>

                            <div className="flex w-full flex-row flex-wrap justify-end gap-2">
                                <Link href={`events/${event.id}`}>
                                    <a className="w-full md:w-auto">
                                        <Button
                                            variant="orange"
                                            className="w-full md:w-auto"
                                        >
                                            View Preview
                                        </Button>
                                    </a>
                                </Link>

                                <Link href={`events/${event.id}/submissions`}>
                                    <a className="w-full md:w-auto">
                                        <Button
                                            variant="orange"
                                            className="w-full md:w-auto"
                                        >
                                            View Submissions
                                        </Button>
                                    </a>
                                </Link>

                                <Link href={`events/${event.id}/settings`}>
                                    <a className="w-full md:w-auto">
                                        <Button
                                            variant="black"
                                            className="w-full md:w-auto"
                                        >
                                            Settings
                                        </Button>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default EventsPreviewComponent;
