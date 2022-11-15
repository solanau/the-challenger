import BountyCard from 'components/explorer-leaderboard-page/bounty-card';
import { UsersLeaderboardEntry } from 'types/challenge';
import Text from '../text';

type BountyLeaderboardListProps = { bounties: UsersLeaderboardEntry[] };

const BountyLeaderboardList = ({
    bounties: initialBounties,
}: BountyLeaderboardListProps) => (
    <div className="flex flex-col gap-4">
        <div className="top-36 z-30 hidden flex-row justify-between gap-5 bg-neutral bg-opacity-40 px-6 py-3 text-base-content backdrop-blur-xl 2lg:flex">
            <div className="flex w-full justify-start text-amber-400">
                <Text variant="heading">Rank</Text>
            </div>
            <div className="flex w-full justify-start text-amber-400">
                <Text variant="heading">Player</Text>
            </div>
            <div className="mr-2 flex w-full justify-end text-amber-400">
                <Text variant="heading">Total</Text>
            </div>
        </div>
        <div className="flex w-full flex-col gap-6">
            {initialBounties.length ? (
                initialBounties.map((bounty, index) => (
                    <BountyCard key={index} rank={index + 1} bounty={bounty} />
                ))
            ) : (
                <div className="flex h-20 items-center justify-center">
                    <p className="text-secondary">No results found.</p>
                </div>
            )}
        </div>
    </div>
);

export default BountyLeaderboardList;
