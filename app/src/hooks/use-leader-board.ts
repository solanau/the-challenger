import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { LeaderBoardPayload } from 'types/leader-board';
import { firestore } from 'utils/firebase';

export const useLeaderBoard = (
    eventId: string,
    leaderBoardId: string,
): LeaderBoardPayload | null => {
    const [leaderBoard, setLeaderBoard] = useState<LeaderBoardPayload | null>(
        null,
    );

    useEffect(() => {
        if (leaderBoardId === null) {
            setLeaderBoard(null);
            return;
        }

        const unsubscribe = onSnapshot(
            doc(firestore, `events/${eventId}/leader-boards/${leaderBoardId}`),
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
    }, [eventId, leaderBoardId]);

    return leaderBoard;
};
