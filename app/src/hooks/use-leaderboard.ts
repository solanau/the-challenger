import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { LeaderBoardPayload } from 'types/leaderboard';
import { firestore } from 'utils/firebase';

export const useLeaderBoard = (
    eventId: string,
    leaderboardId: string,
): LeaderBoardPayload | null => {
    const [leaderboard, setLeaderBoard] = useState<LeaderBoardPayload | null>(
        null,
    );

    useEffect(() => {
        if (eventId === null || leaderboardId === null) {
            setLeaderBoard(null);
            return;
        }

        const unsubscribe = onSnapshot(
            doc(firestore, `events/${eventId}/leaderboards/${leaderboardId}`),
            snapshot => {
                const data = snapshot.data();

                if (!data) {
                    setLeaderBoard(null);
                } else {
                    setLeaderBoard(data as LeaderBoardPayload);
                }
            },
        );

        return () => unsubscribe();
    }, [eventId, leaderboardId]);

    return leaderboard;
};
