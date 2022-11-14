/* eslint-disable @next/next/no-img-element */
import Accordion from './accordion';
import Card from 'components/common/card';
import Text from 'components/common/text';

const FaqSection = () => (
    <section
        className="px-4 sm:px-8 md:gap-32 md:px-16 lg:px-32 xl:px-48"
    >
        <div className="flex flex-col gap-8">
            <Text variant="label"> FAQ </Text>
            <Text variant="big-heading">Find out more about Bounties</Text>
            <div className="flex items-center">
                <div className="invisible absolute opacity-30 bg-blend-overlay md:visible md:relative md:ml-auto md:w-1/2">
                    <img src="/landing-img-2.png" alt="" />
                </div>
                <div className="w-full md:relative md:-ml-36 md:h-3/4 md:w-2/3">
                    <Card className="p-4">
                        <Accordion />
                    </Card>
                </div>
            </div>
        </div>
    </section>
);

export default FaqSection;
