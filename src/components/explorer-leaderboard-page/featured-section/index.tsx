import { Bounty } from 'types/bounty';
import BountyCard from '../bounty-card';
import Text from 'components/common/text';

type FeaturedSectionProps = {
    bounties: Bounty[];
};

const FeaturedSection = ({ bounties }: FeaturedSectionProps) => (
    <section
        className="flex w-full flex-col gap-7 bg-gradient-to-tr from-primary/75 to-secondary/75 p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20"
    >
        <Text variant="label">Featured</Text>
        <Text variant="big-heading">Recent Bounties</Text>
        <div className="flex w-full flex-row justify-start gap-5 overflow-x-auto scroll-smooth">
            {bounties.map(bounty => (
                <BountyCard key={bounty.id} responsive={false} {...bounty} />
            ))}
        </div>
    </section>
);

export default FeaturedSection;
