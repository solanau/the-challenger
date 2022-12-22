import Card from 'components/common/card';
import Text from 'components/common/text';
import Link from 'next/link';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { PendingChallenge } from 'types/challenge';
import { getIconByCategory } from '../challenge-icon';

type ChallengeListProps = { challenges: PendingChallenge[] };

const PendingChallengesSection = ({ challenges }: ChallengeListProps) => (
    <section className="flex w-full flex-row flex-wrap gap-5">
        {challenges.map(challenge => (
            <Card
                key={challenge.id}
                className="flex min-w-fit flex-1 flex-col justify-between gap-10 p-12"
            >
                <div className="flex flex-col gap-5 ">
                    {getIconByCategory(challenge.category, 35)}

                    <div className="flex flex-col gap-1">
                        <Text variant="label" className="text-secondary">
                            {challenge.category} challenge
                        </Text>
                        <Text className="min-w-fit" variant="big-heading">
                            Challenge {challenge.position}
                        </Text>
                        <Text variant="sub-heading">
                            Reward: {challenge.points} (BONUS: +
                            {challenge.bonus})
                        </Text>
                    </div>

                    <Text variant="paragraph" className="break-word">
                        {challenge.description}
                    </Text>

                    <Text
                        variant="paragraph"
                        className="font text-xl text-primary"
                    >
                        Difficulty: {challenge.difficulty}
                    </Text>

                    <Text variant="paragraph">
                        Starts <b>{challenge.startsIn}</b>
                    </Text>

                    <div className="flex flex-row items-end gap-4">
                        <Text variant="paragraph" className="text-white">
                            Author:
                        </Text>
                        <Link
                            href={`https://twitter.com/${challenge.authorTwitter}`}
                            passHref
                        >
                            <a
                                className="flex flex-row justify-end"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaTwitter size={24} />
                            </a>
                        </Link>

                        <Link
                            href={`https://github.com/${challenge.authorGithub}`}
                            passHref
                        >
                            <a
                                className="flex flex-row justify-end"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaGithub size={24} />
                            </a>
                        </Link>
                    </div>
                </div>
            </Card>
        ))}
    </section>
);

export default PendingChallengesSection;
