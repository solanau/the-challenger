import Card from 'components/common/card';
import Text from 'components/common/text';
const AdditionalSection = () => {
    const upcomingEvents = [
        { name: 'New York Hacker House', date: '2023-08-31' },
        { name: 'Tel Aviv Hacker House', date: '2023-08-31' },
        { name: 'PlayGG', date: '2023-08-31' },
        { name: 'Berlin Hacker House', date: '2023-08-31' },
        { name: 'Bengaluru Hacker House', date: '2023-08-31' },
        { name: 'Mumbai Hacker House', date: '2023-08-31' },
        { name: 'Breakpoint Hacker House', date: '2023-08-31' },
        { name: 'Korean Blockchain Week', date: '2023-09-05' },
        { name: 'Hong Kong Hacker House', date: '2023-08-31' },
        // Add more upcoming events as needed
    ];

    const firstDataset = [
        { rank: 1, player: 'mucks', points: 9215 },
        { rank: 2, player: 'jonnyboi', points: 8378 },
        { rank: 3, player: 'naynim', points: 7250 },
        { rank: 4, player: 'sunsquarez', points: 6027 },
        { rank: 5, player: 'karlvlam', points: 5427 },
        { rank: 6, player: 'airic', points: 5348 },
        { rank: 7, player: 'Lanepin', points: 4751 },
        { rank: 8, player: 'JhiNResH', points: 4465 },
        { rank: 9, player: 'ANDYYY', points: 4069 },
        { rank: 10, player: 'Sunny', points: 4016 },
        { rank: 11, player: 'cuk_0x', points: 3816 },
        { rank: 12, player: 'ubergaijin', points: 3778 },
        { rank: 13, player: 'solj', points: 3730 },
        { rank: 14, player: 'yusap', points: 3206 },
        { rank: 15, player: 'RayLin', points: 3125 },
        { rank: 16, player: '智翔', points: 1640 },
        { rank: 17, player: 'Roy', points: 1545 },
        { rank: 18, player: 'benhk2005', points: 1488 },
        { rank: 19, player: 'SharKevin', points: 679 },
        { rank: 20, player: 'rlanday', points: 572 },
        { rank: 21, player: 'sillymaster', points: 166 },
        { rank: 22, player: 'cleon', points: 118 },
        { rank: 23, player: 'PC', points: 114 },
        { rank: 24, player: 'manuruneco', points: 55 },
        { rank: 25, player: 'jojo', points: 54 },
    ];

    const secondDataset = [
        { rank: 1, player: 'logan', points: 6045 },
        { rank: 2, player: 'ASCorreia', points: 4160 },
        { rank: 3, player: 'Stroll', points: 3039 },
        { rank: 4, player: 'tonycrypto44', points: 2535 },
        { rank: 5, player: 'Who?', points: 2506 },
        { rank: 6, player: 'MaldoD', points: 2459 },
        { rank: 7, player: 'zax_xyz', points: 1123 },
        { rank: 8, player: 'adlonymous', points: 511 },
        { rank: 9, player: 'Denx', points: 420 },
        { rank: 10, player: 'Player1Taco', points: 414 },
        // rest of the dataset
    ];

    // Merge both datasets into one
    const mergedDataset = [...firstDataset, ...secondDataset];

    // Sort in descending order by points
    const sortedDataset = mergedDataset.sort((a, b) => b.points - a.points);

    // Slice the first 25
    const top10 = sortedDataset.slice(0, 10).map((user, index) => ({ ...user, rank: index + 1 }));

    return (
        <section className="pt-10 pb-20 md:pt-20 md:pb-40 bg-black grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="hidden sm:block absolute order-2 sm:mt-10 bg-blend-overlay"
                style={{
                    backgroundImage: `url(/upcoming-left-picture.png)`,
                    backgroundPosition: "left",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    width: "140%",
                    height: "150%",
                    top: 1750,
                    left: 0,
                    maxHeight: 2000,
                    maxWidth: 2000,
                }}
            ></div>

            <div className="col-span-1">
                <Text variant="big-heading" className="text-white text-center mb-6">
                    Top 10 All-Time
                </Text>
                <Card className="p-8 bg-zinc-900 rounded-xl bg-opacity-70 border-zinc-800 border mx-20">
                    <table className="w-full text-white mx-auto table-fixed">
                        <thead>
                            <tr>
                                <th className="pb-2 border-b border-zinc-600 px-4 py-2">Rank</th>
                                <th className="pb-2 border-b border-zinc-600 px-4 py-2">Player</th>
                                <th className="pb-2 border-b border-zinc-600 px-4 py-2">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {top10.map((user) => (
                                <tr key={user.rank} className="border-b border-opacity-20 border-zinc-600">
                                    <td className="py-2 px-4 text-center">{user.rank}</td>
                                    <td className="py-2 px-4 text-center">{user.player}</td>
                                    <td className="py-2 px-4 text-center">{user.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>

            </div>
            <div className="col-span-1">
                <Text variant="big-heading" className="text-white text-center mb-6">
                    Upcoming Events
                </Text>
                <Card className="p-4 bg-zinc-900 rounded-xl bg-opacity-70 border-zinc-800 border mx-20">

                    <table className="w-full text-white ">
                        <thead>
                            <tr>
                                <th className="pb-2 border-b border-zinc-600">Name</th>
                                <th className="pb-2 border-b border-zinc-600">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {upcomingEvents.map((event) => (
                                <tr key={event.name}>
                                    <td className="py-2 border-b border-opacity-50 border-zinc-600 text-center">{event.name}</td>
                                    <td className="py-2 border-b border-opacity-50 border-zinc-600 text-center">{event.date}</td>
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