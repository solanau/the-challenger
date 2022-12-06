/* eslint-disable react/no-unescaped-entities */
import Text from 'components/common/text';
// import { useLeaderboards } from 'hooks/use-leaderboards';
import { NextPage } from 'next';

const LeaderboardsPage: NextPage = () => (
    // const leaderboards = useLeaderboards();

    <>
        <div className="flex w-full flex-col gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
            <Text variant="big-heading">Leaderboards</Text>

            <Text variant="paragraph">
                Explore previous leaderboards on the Challenger platform
            </Text>
        </div>
    </>
);
export default LeaderboardsPage;
