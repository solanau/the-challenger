import { LeaderboardPayload } from 'types/leaderboard';
import Text from '../../common/text';
import LeaderboardListItem from '../leaderboard-list-item';

interface LeaderboardListProps {
    leaderboard: LeaderboardPayload;
    isEventManager: boolean;
}

const LeaderboardList = ({
    leaderboard,
    isEventManager,
}: LeaderboardListProps) => (
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
            {isEventManager && (
                <div className="mr-2 flex w-full justify-end text-amber-400">
                    <Text variant="heading">Payout</Text>
                </div>
            )}
        </div>
        <div className="flex w-full flex-col gap-6">
            {leaderboard?.participants.length ? (
                leaderboard.participants.map((participant, index) => (
                    <LeaderboardListItem
                        key={index}
                        position={index + 1}
                        participant={participant}
                        isEventManager={isEventManager}
                    />
                ))
            ) : (
                <div className="flex h-20 items-center justify-center">
                    <p className="text-secondary">No results found.</p>
                </div>
            )}
        </div>
    </div>
);

export default LeaderboardList;
