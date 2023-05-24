import Button from 'components/common/button';
import Card from 'components/common/card';
import Text from 'components/common/text';
import Link from 'next/link';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { MdPlayArrow } from 'react-icons/md';
import { ExpiredChallenge } from 'types/challenge';
import { getIconByCategory } from '../challenge-icon';

type ChallengeListProps = { eventId: string; challenges: ExpiredChallenge[] };

const ExpiredChallengesSection = ({
    eventId,
    challenges,
}: ChallengeListProps) => (
    <section className="flex flex-row flex-wrap gap-5 justify-center items-center">
        {challenges.map(challenge => (
            <Card
                key={challenge.id}
                className={`h-128 sm:max-w-xl flex-col justify-between gap-10 p-4 sm:p-12 ${challenges.length === 1 ? 'min-w-96' : ''
                    }`}
            >
                <div className="flex flex-col gap-5">
                    {getIconByCategory(challenge.category, 35)}

                    <div className="flex flex-col gap-1">
                        <Text variant="label" className="text-secondary">
                            {challenge.category}
                        </Text>
                        <Text variant="big-heading">
                            Challenge {challenge.position}
                        </Text>
                        <Text variant="sub-heading">
                            Reward: {challenge.points}
                        </Text>
                    </div>

                    <Text
                        variant="paragraph"
                        className="break-word max-w-xl h-14 overflow-hidden truncate text-ellipsis"
                    >
                        {challenge.description}
                    </Text>

                    <Text
                        variant="paragraph"
                        className="font text-xl text-primary"
                    >
                        Difficulty: {challenge.difficulty}
                    </Text>

                    <Text variant="paragraph">
                        Expires <b>{challenge.expiredAgo}</b>
                    </Text>

                    <div className="flex items-end justify-between">
                        <div className="flex gap-4">
                            <Text variant="paragraph" className="text-white">
                                Author:
                            </Text>
                            {challenge.authorTwitter && (
                                <Link
                                    href={`https://twitter.com/${challenge.authorTwitter}`}
                                    passHref
                                >
                                    <a
                                        className="flex justify-end"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaTwitter size={24} />
                                    </a>
                                </Link>
                            )}
                            {challenge.authorGithub && (
                                <Link
                                    href={`https://github.com/${challenge.authorGithub}`}
                                    passHref
                                >
                                    <a
                                        className="flex justify-end"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaGithub size={24} />
                                    </a>
                                </Link>
                            )}
                        </div>

                        <Link
                            href={`/events/${eventId}/challenges/${challenge.id}`}
                            passHref
                        >
                            <a>
                                <Button
                                    className={`h-24 w-24 rounded-full border-2 ${challenge.isSubmitted ? 'border-transparent' : ''
                                        }`}
                                    variant="transparent"
                                >
                                    {challenge.isSubmitted ? (
                                        <p className="text-center text-green-400">
                                            Submission Entered!
                                        </p>
                                    ) : (
                                        <MdPlayArrow size={40} />
                                    )}
                                </Button>
                            </a>
                        </Link>
                    </div>
                </div>
            </Card>
        ))}
    </section>

);

export default ExpiredChallengesSection;
