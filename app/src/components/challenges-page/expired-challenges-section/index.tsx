import Button from 'components/common/button';
import Card from 'components/common/card';
import Text from 'components/common/text';
import Link from 'next/link';
import { MdPlayArrow } from 'react-icons/md';
import { ExpiredChallenge } from 'types/challenge';
import { getIcon } from '../challenge-icon';

type ChallengeListProps = { challenges: ExpiredChallenge[] };

const ExpiredChallengesSection = ({ challenges }: ChallengeListProps) => (
    <section className="flex w-full flex-row flex-wrap gap-5">
        {challenges.map(challenge => (
            <Card
                key={challenge.id}
                className="flex min-w-fit flex-1 flex-col justify-between gap-10 p-12 brightness-75"
                baseChallenge={challenge}
            >
                <div className="flex flex-col gap-5">
                    {getIcon(challenge.iconKey, challenge.iconSize)}

                    <div className="flex flex-col gap-1">
                        <Text variant="label" className="text-secondary">
                            {' '}
                            {challenge.type} challenge
                        </Text>
                        <Text className="min-w-fit" variant="big-heading">
                            Challenge {challenge.key}
                        </Text>
                        <Text variant="sub-heading">
                            Reward: {challenge.reward}
                        </Text>
                    </div>

                    <Text variant="paragraph">
                        {challenge.shortDescription}
                    </Text>

                    <Text
                        variant="paragraph"
                        className="font text-xl text-primary"
                    >
                        {' '}
                        Difficulty: {challenge.difficulty}{' '}
                    </Text>

                    <Text variant="paragraph">
                        Expired <b>{challenge.expiredAgo}</b>
                    </Text>

                    <div className="flex items-end justify-between">
                        <div className="flex flex-row gap-4">
                            <Text variant="paragraph" className="text-white">
                                {' '}
                                Author:{' '}
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
                                    {getIcon(1, 24)}
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
                                    {getIcon(2, 24)}
                                </a>
                            </Link>
                        </div>

                        <Link href={`challenges/${challenge.uid}`} passHref>
                            <a>
                                <Button
                                    className="h-20 w-20 rounded-full border-2"
                                    variant="transparent"
                                >
                                    <MdPlayArrow size={40} />
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
