import Button from 'components/common/button';
import Card from 'components/common/card';
import Text from 'components/common/text';
import Link from 'next/link';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { MdPlayArrow } from 'react-icons/md';
import { ActiveChallenge } from 'types/challenge';
import { getIconByCategory } from '../challenge-icon';

type ChallengeListProps = {
    eventId: string;
    challenges: ActiveChallenge[];
};

const ActiveChallengesSection = ({
    eventId,
    challenges,
}: ChallengeListProps) => (
    <section className="flex w-full flex-row flex-wrap items-center justify-center gap-5">
        {challenges.map(challenge => (
            <Card
                key={challenge.id}
                className="h-128 w-80 flex-col justify-between gap-10 p-4 sm:w-96 sm:max-w-xl sm:p-12 lg:w-1/2 xl:w-1/3"
            >
                <div className="flex flex-col gap-5">
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
                    <Text
                        variant="paragraph"
                        className="break-word h-14 max-w-xl overflow-hidden truncate text-ellipsis"
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
                        Expires <b>{challenge.expiresIn}</b>
                    </Text>

                    <progress value={challenge.progress} max="100">
                        {challenge.progress}%
                    </progress>

                    <div className="flex flex-wrap items-end justify-between">
                        <div className="mb-5 flex flex-row gap-4 md:mb-0">
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

                        <Link
                            href={`/events/${eventId}/challenges/${challenge.id}`}
                            passHref
                        >
                            <a>
                                {challenge.submissionStatus == 'completed' && (
                                    <Button
                                        className="h-24 w-24 rounded-md border-0 md:w-auto"
                                        variant="transparent"
                                    >
                                        <p className="text-center text-green-400">
                                            Submission Accepted!
                                        </p>
                                    </Button>
                                )}
                                {challenge.submissionStatus == 'pending' && (
                                    <Button
                                        className="h-24 w-24 rounded-md border-0 md:w-auto"
                                        variant="transparent"
                                    >
                                        <p className="text-center text-pink-400">
                                            Submission Pending
                                        </p>
                                    </Button>
                                )}
                                {challenge.submissionStatus != 'completed' &&
                                    challenge.submissionStatus != 'pending' && (
                                        <div className="flex-col">
                                            {challenge.submissionStatus ==
                                                ('invalid' || 'incorrect') && (
                                                <p className="mx-auto mb-2 text-center text-yellow-400">
                                                    Try Again!
                                                </p>
                                            )}
                                            <Button
                                                className="h-24 w-24 rounded-full border-2"
                                                variant="transparent"
                                            >
                                                <MdPlayArrow size={40} />
                                            </Button>
                                        </div>
                                    )}
                            </a>
                        </Link>
                    </div>
                </div>
            </Card>
        ))}
    </section>
);

export default ActiveChallengesSection;
