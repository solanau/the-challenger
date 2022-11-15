import Chip from 'components/common/chip';
import Image from 'components/common/image';
/* eslint-disable @next/next/no-img-element */
import { MdInfoOutline } from 'react-icons/md';
import Text from 'components/common/text';
import { User } from 'types/user';

type HeroProps = User & { isCurrentUser: boolean };

const Hero = ({
    avatarUrl,
    fullName,
    isCurrentUser,
    level,
    username,
}: HeroProps) => (
    <div className="flex flex-col">
        <div className="h-60 w-full bg-gradient-to-tr from-primary/75 to-secondary/75" />
        <div className="flex flex-row flex-wrap items-center justify-between gap-x-7 gap-y-4 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48">
            <div className="grow-1 flex basis-7/12 flex-col gap-4 md:flex-row md:items-center md:gap-10">
                <Image
                    alt="avatar"
                    className="md:-mt-18 -mt-16 flex aspect-square h-32 w-max rounded-full md:h-36"
                    src={avatarUrl}
                    style={{ borderRadius: '50%' }}
                />
                <div className="flex flex-row flex-wrap items-center gap-5">
                    <div className="flex flex-col gap-1">
                        <Text variant="heading" className="whitespace-nowrap">
                            {fullName}
                        </Text>
                        <div className="flex flex-row items-center gap-2">
                            <Text
                                variant="paragraph"
                                className="whitespace-nowrap text-primary"
                            >
                                <a href={`https://github.com/${username}`}>
                                    {username}
                                </a>
                            </Text>
                            {!isCurrentUser && (
                                <Chip
                                    value="Level"
                                    highlightValue={level.toString()}
                                    reversed={true}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {isCurrentUser && (
                <div className="flex h-min w-full grow-[2] basis-80 flex-col gap-2">
                    <div className="flex flex-row items-center gap-1">
                        <Text
                            variant="label"
                            className="flex flex-row items-center gap-1 !normal-case text-secondary"
                        >
                            Level{' '}
                            <span className="font-medium text-primary">
                                {' '}
                                {level}
                            </span>
                        </Text>

                        <div
                            className="tooltip tooltip-right"
                            data-tip="Complete bounties to earn levels"
                        >
                            <MdInfoOutline
                                size={15}
                                className="aspect-square"
                            />
                        </div>
                    </div>
                    <progress
                        className="progress progress-error bg-base/75"
                        value={level}
                        max={100}
                    />
                </div>
            )}
        </div>
    </div>
);

export default Hero;
