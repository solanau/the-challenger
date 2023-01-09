import { LeaderboardPayload, UserPayload } from 'types';

const leaderboardToCsv = (
    eventName: string,
    leaderboard: LeaderboardPayload,
    allUsers: UserPayload[],
) => {
    const headers = [
        { label: 'UserID', key: 'userId' },
        { label: 'Username', key: 'userName' },
        { label: 'Full Name', key: 'fullName' },
        { label: 'Email', key: 'email' },
        { label: 'PublicKey', key: 'userPublicKey' },
        { label: 'Points', key: 'points' },
        { label: '% of Total Points', key: 'percentTotal' },
    ];
    const data = leaderboard.participants.map(p => {
        const userData = allUsers.find(user => user.id === p.userId);
        console.log('User Data:');
        console.log(userData);
        return {
            userId: p.userId,
            userName: userData.userName,
            fullName: userData.fullName,
            email: userData.email,
            userPublicKey: userData.walletPublicKey,
            points: p.points,
            percentTotal: Math.floor(
                (p.points / leaderboard.totalPoints) * 100,
            ),
        };
    });
    return {
        data,
        headers,
        filename: `${eventName.replaceAll(' ', '_')}_leaderboard.csv`,
    };
};

export { leaderboardToCsv };
