import ChallengeCard from 'components/explorer-page/challenge-card';
import { ChallengePayload } from 'types/api';

const cleanseBountyName = (name: string, key: number) => `#${key}: `
    .concat(name)
    .replace(RegExp('Challenge Submission \\('), '')
    .replace(RegExp('\\)'), '');

type ChallengeListProps = { challenges: ChallengePayload[] };

const ChallengeList = ({ challenges: challenges }: ChallengeListProps) => (
    <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-6 mt-4">
            {challenges.length > 0 ? (
                challenges.map(challenge => (
                    <ChallengeCard key={challenge.key} challengeName={cleanseBountyName(challenge.title, challenge.key)} {...challenge} />
                ))
            ) : (
                <div className="flex h-20 items-center justify-center">
                    <p className="text-secondary">No results found.</p>
                </div>
            )}
        </div>
    </div>
);

export default ChallengeList;
