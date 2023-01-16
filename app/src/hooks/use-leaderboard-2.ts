import { useEffect, useState } from 'react';
import { UserPayload } from 'types';
import { LeaderboardPayload } from 'types/leaderboard';
import { useAllUsers } from './use-all-users';
import { useSubmissions } from './use-submissions';

export const useLeaderboard = (eventId: string): LeaderboardPayload | null => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardPayload | null>(
        null,
    );

    const allUsers = useAllUsers();
    const submissions = useSubmissions(eventId);

    useEffect(() => {
        if (
            eventId === null ||
            allUsers.length === 0 ||
            submissions.length === 0
        ) {
            setLeaderboard(null);
            return;
        }
        const rawParticipants = Array.from(
            submissions
                .filter(l => l.status === 'completed')
                .map(l => ({
                    user: allUsers.find(user => user.id === l.userId),
                    points: l.totalPoints,
                }))
                .reduce(
                    (map, obj) =>
                        map.has(obj.user)
                            ? map.set(obj.user, map.get(obj.user) + obj.points)
                            : map.set(obj.user, obj.points),
                    new Map<UserPayload, number>(),
                )
                .entries(),
        ).map(record => ({
            userId: record[0].id,
            userName: record[0].userName,
            fullName: record[0].fullName,
            email: record[0].email,
            userPublicKey: record[0].walletPublicKey ?? '',
            points: record[1],
        }));
        const leaderboardTotalPoints = rawParticipants.reduce(
            (sum, participant) => (sum += participant.points),
            0,
        );
        const leaderboardParticipants = rawParticipants
            .map(participant => ({
                percentTotal: Math.floor(
                    (participant.points / leaderboardTotalPoints) * 100,
                ),
                ...participant,
            }))
            .sort((a, b) => (a.points > b.points ? -1 : 1));
        setLeaderboard({
            participants: leaderboardParticipants,
            totalPoints: leaderboardTotalPoints,
        });
    }, [allUsers, eventId, submissions]);

    return leaderboard;
};
