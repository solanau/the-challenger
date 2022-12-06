import { fetchEvent } from 'lib/api/event';
import { useEffect, useState } from 'react';
import { EventData } from 'types/api/event';

export const useEvent = (eventId: string | null): EventData | null => {
    const [event, setEvent] = useState<EventData>(null);

    const loadEvent = async (eventId: string) => {
        const event = await fetchEvent(eventId);
        setEvent(event);
    };

    useEffect(() => {
        if (eventId === null) {
            setEvent(null);
            return;
        }
        loadEvent(eventId);
    }, [eventId]);

    return event;
};
