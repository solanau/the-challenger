import BountyLeaderboardList from 'components/common/bounty-leaderboard-list';
import Text from 'components/common/text';
import { getUsersLeaderboardFromIssue } from 'lib/bounties';
import { GetServerSideProps, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { BountyChallenge } from 'types/bounty';
import { UsersLeaderboardEntry } from 'types/challenge';

type LeaderboardPageProps = {
    bounties: BountyChallenge[];
    leaderBoard: UsersLeaderboardEntry[];
};

const LeaderboardPage: NextPage<LeaderboardPageProps> = ({ leaderBoard }) => {
    const openBounties = useMemo(() => leaderBoard, [leaderBoard]);
    const tabs = useMemo(
        () => [
            {
                content: (
                    <BountyLeaderboardList
                        bounties={openBounties}
                        key="open-bounties"
                    />
                ),
                id: 'open',
                label: 'Open',
                amount: openBounties.length,
            },
        ],
        [openBounties],
    );

    const router = useRouter();
    const currentTabId = (router.query.tab as string) || tabs[0].id;

    const currentTab = useMemo(
        () => tabs.find(tab => tab.id === currentTabId),
        [currentTabId, tabs],
    );

    const { data: session } = useSession();

    return (
        <>
            <NextSeo
                title="Leaderboard"
                description="Explore and contribute to bounties that interest you and get paid for your work"
            ></NextSeo>
            <div className="flex flex-col gap-12 pt-14">
                {/* <FeaturedSection bounties={openBounties.slice(0, 5)} /> */}
                <div className="flex flex-col gap-0">
                    <Text variant="sub-heading" className="text-center">
                        {' '}
                        Hackathon{' '}
                    </Text>
                    <div className="flex w-full flex-col gap-2 px-5 sm:px-8 md:px-16 lg:px-32 xl:px-48">
                        <Text
                            variant="big-heading"
                            className="bg-gradient-to-tl from-[#ef3c11] via-[#fdb735] to-[#ffeb3a] bg-clip-text text-center text-8xl text-transparent"
                        >
                            Leaderboard{' '}
                        </Text>

                        <div className="mt-6">{currentTab.content}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeaderboardPage;

export const getServerSideProps: GetServerSideProps = async context => {
    const leaderBoard = await getUsersLeaderboardFromIssue();
    console.log("Y AHORA? SIsi aja", process.env.LANDING_TITLE);
    return { props: { leaderBoard } };
};
