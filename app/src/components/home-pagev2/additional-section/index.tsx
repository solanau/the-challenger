import Card from 'components/common/card';
import Text from 'components/common/text';

const AdditionalSection = () => {
    const activeUsers = [
        { rank: 1, player: 'Player 1', points: 100 },
        { rank: 2, player: 'Player 2', points: 90 },
        // Add more active users as needed
    ];

    const upcomingEvents = [
        { name: 'Event 1', date: '2023-07-01' },
        { name: 'Event 2', date: '2023-07-15' },
        // Add more upcoming events as needed
    ];

    return (
        <section className="pt-10 pb-20 md:pt-20 md:pb-40 bg-black grid grid-cols-2 gap-8 ">

            <div className="col-span-1">
                <Card className="p-4 bg-black rounded-xl bg-opacity-10 border-white border">
                    <Text variant="big-heading" className="text-white text-center mb-6">
                        Top 10 Active Users
                    </Text>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left">Rank</th>
                                <th className="text-left">Player</th>
                                <th className="text-left">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeUsers.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.rank}</td>
                                    <td>{user.player}</td>
                                    <td>{user.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
            <div className="col-span-1">
                <Card className="p-4 bg-black rounded-xl bg-opacity-10 border-white border">
                    <Text variant="big-heading" className="text-white text-center mb-6">
                        Upcoming Events
                    </Text>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left">Name</th>
                                <th className="text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {upcomingEvents.map((event, index) => (
                                <tr key={index}>
                                    <td>{event.name}</td>
                                    <td>{event.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </section>
    );
};

export default AdditionalSection;
