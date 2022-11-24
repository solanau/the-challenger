import Button from 'components/common/button';
import { updateLeaderBoard } from 'lib/api';
import { NextSeo } from 'next-seo';

const LeaderboardPage = () => {
    const handleUpdateLeaderBoard = () => {
        updateLeaderBoard({
            eventId: process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_EVENT_ID,
        });
    };

    return (
        <>
            <NextSeo
                title="Leaderboard"
                description="Explore and contribute to bounties that interest you and get paid for your work"
            ></NextSeo>
            LEADER BOARD
            <Button variant="orange" onClick={handleUpdateLeaderBoard}>
                Update Leader Board
            </Button>
        </>
    );
};

export default LeaderboardPage;
