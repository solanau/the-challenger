import StatItem from 'components/home-page/stats-section/stat-item';

const statItems = [
    {
        bountyName: 'Open bounties',
        bountyNumber: '12',
        borderBottom: 'true',
        borderRight: 'true',
        removeBorderRightMedium: 'false',
    },
    {
        bountyName: 'Total bounties',
        bountyNumber: '35',
        borderBottom: 'true',
        borderRight: 'true',
        removeBorderRightMedium: 'false',
    },
    {
        bountyName: 'Hunters',
        bountyNumber: '4',
        borderBottom: 'true',
        borderRight: 'true',
        removeBorderRightMedium: 'true',
    },
    {
        bountyName: 'Total funds (Tickets)',
        bountyNumber: '1000',
        borderBottom: 'true',
        borderRight: 'true',
        removeBorderRightMedium: 'false',
    },
];

const StatsSection = () => (
    <section className="grid min-h-[70px] text-black sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-4">
        {statItems.map(
            ({
                bountyName,
                bountyNumber,
                borderBottom,
                borderRight,
                removeBorderRightMedium,
            }) => (
                <StatItem
                    key={bountyName}
                    bountyName={bountyName}
                    bountyNumber={bountyNumber}
                    borderBottom={borderBottom}
                    borderRight={borderRight}
                    removeBorderRightMedium={removeBorderRightMedium}
                />
            ),
        )}
    </section>
);

export default StatsSection;
