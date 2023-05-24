import Card from 'components/common/card';
import Text from 'components/common/text';
import Link from 'next/link';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { PendingChallenge } from 'types/challenge';
import { getIconByCategory } from '../challenge-icon';

type ChallengeListProps = { challenges: PendingChallenge[] };

const PendingChallengesSection = ({ challenges }: ChallengeListProps) => (
    <section className="flex flex-row flex-wrap gap-5 justify-center items-center">
        {challenges.map(challenge => (
            <Card
                key={challenge.id}
                className={`h-128 sm:max-w-xl flex-col justify-between gap-10 p-4 sm:p-12 ${challenges.length === 1 ? 'min-w-96' : ''
                    }`}
            >
                <div className="flex flex-col gap-5">

                    {getIconByCategory(challenge.category, 35)}
                    <div className="flex flex-col">
                        <Text variant="label" className="text-secondary">
                            {challenge.category} Challenge
                        </Text>
                        <Text className="min-w-fit" variant="big-heading">
                            Challenge {challenge.position}
                        </Text>
                        <Text variant="sub-heading">
                            Reward: {challenge.points} (BONUS: +{challenge.bonus})
                        </Text>
                    </div>
                    <Text
                        variant="paragraph"
                        className="break-word max-w-xl h-14 overflow-hidden truncate text-ellipsis"
                    >
                        {challenge.description}
                    </Text>

                    <Text variant="paragraph" className="font text-xl text-primary">
                        Difficulty: {challenge.difficulty}
                    </Text>

                    <Text variant="paragraph">
                        Starts <b>{challenge.startsIn}</b>
                    </Text>

                    <div className="flex items-end gap-4 text-white">
                        <Text variant="paragraph">Author:</Text>
                        <Link href={`https://twitter.com/${challenge.authorTwitter}`} passHref>
                            <a
                                className="flex flex-row justify-end"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaTwitter size={24} />
                            </a>
                        </Link>
                        <Link href={`https://github.com/${challenge.authorGithub}`} passHref>
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
