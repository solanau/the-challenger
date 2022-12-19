import Button from 'components/common/button';
import Card from 'components/common/card';
import Text from 'components/common/text';
import Link from 'next/link';
import { ChangeEvent, FC, useMemo, useState } from 'react';
import { ChallengePayload, UserPayload } from 'types';

interface ChallengesPreviewComponentProps {
    challenges: ChallengePayload[];
    user: UserPayload;
    filterStartValue?: string;
}

const ChallengesPreviewComponent: FC<ChallengesPreviewComponentProps> = (
    props: ChallengesPreviewComponentProps,
) => {
    const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>(
        props.filterStartValue ?? 'active',
    );
    const filteredChallenges = useMemo(() => {
        if (!selectedStatusFilter) {
            return props.challenges;
        }
        return props.challenges.filter(
            challenge => challenge.status === selectedStatusFilter,
        );
    }, [selectedStatusFilter, props.challenges]);

    const handleStatusFilterChange = (
        event: ChangeEvent<HTMLSelectElement>,
    ) => {
        setSelectedStatusFilter(event.target.value);
    };

    return (
        <div className="flex w-full flex-row flex-wrap gap-5 bg-gradient-to-tr p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
            <div>
                <select
                    name="filter-list"
                    id="filter-list"
                    onChange={handleStatusFilterChange}
                    className="rounded-md border-2 border-white bg-white px-4 py-2 text-black"
                    defaultValue={props.filterStartValue ?? 'active'}
                >
                    <option value="">All</option>
                    <option value="active">Active</option>
                    <option value="draft">Drafts</option>
                </select>
            </div>
            {filteredChallenges.map(challenge => (
                <Card
                    key={challenge.id}
                    className="flex min-w-fit flex-1 flex-col justify-between gap-10 p-12"
                >
                    <div className="flex w-full flex-col gap-5">
                        <Text
                            className="break-word min-w-fit"
                            variant="big-heading"
                        >
                            {challenge.title}
                        </Text>
                        <Text variant="paragraph" className="break-word">
                            {challenge.description}
                        </Text>

                        <div className="flex flex-row">
                            <div className="flex flex-row justify-start">
                                <Text
                                    className={`my-auto ${
                                        challenge.status === 'draft'
                                            ? 'text-pink-500'
                                            : 'text-green-500'
                                    }`}
                                    variant="label"
                                >
                                    {challenge.status}
                                </Text>
                            </div>

                            <div className="flex w-full flex-row justify-end gap-2">
                                <Link href={`/challenges/${challenge.id}`}>
                                    <a>
                                        <Button variant="orange">
                                            View Preview
                                        </Button>
                                    </a>
                                </Link>

                                {props.user &&
                                    props.user.id === challenge.userId && (
                                        <Link
                                            href={`/challenges/${challenge.id}/settings`}
                                        >
                                            <a>
                                                <Button variant="black">
                                                    Settings
                                                </Button>
                                            </a>
                                        </Link>
                                    )}
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default ChallengesPreviewComponent;
