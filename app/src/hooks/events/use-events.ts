import { fetchAllEvents } from 'lib/api/event';
import { useEffect, useState } from 'react';
import { EventData } from 'types/api/event';

export const useEvents = (): EventData[] => {
    const [events, setEvents] = useState<EventData[]>([]);

    const loadAllEvents = async () => {
        const events: EventData[] = await fetchAllEvents();
        setEvents(events);
    };

    useEffect(() => {
        loadAllEvents();
    }, []);

    return events;
};
