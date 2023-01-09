import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { LeaderboardPayload } from 'types/leaderboard';
import { firestore } from 'utils/firebase';

export const useLeaderboard = (
    eventId: string,
    leaderboardId: string,
): LeaderboardPayload | null => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardPayload | null>(
        null,
    );

    useEffect(() => {
        if (eventId === null || leaderboardId === null) {
            setLeaderboard(null);
            return;
        }

        const unsubscribe = onSnapshot(
            doc(firestore, `events/${eventId}/leaderboards/${leaderboardId}`),
            snapshot => {
                const data = snapshot.data();

                if (!data) {
                    setLeaderboard(null);
                } else {
                    setLeaderboard(data as LeaderboardPayload);
                }
            },
        );

        return () => unsubscribe();
    }, [eventId, leaderboardId]);

    return leaderboard;
};
