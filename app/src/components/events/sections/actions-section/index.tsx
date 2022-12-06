import Button from 'components/common/button';
import Card from 'components/common/card';
import Text from 'components/common/text';
import Link from 'next/link';
import { MdOutlineExplore } from 'react-icons/md';
import { BiRocket } from 'react-icons/bi';

const ActionsSection = () => (
    <section
        className="flex w-full flex-row flex-wrap gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20"
    >
        <Card className="flex flex-1 flex-col justify-between gap-10 p-12">
            <div className="flex max-w-xl flex-col gap-5">
                <MdOutlineExplore size={35} />
                <div className="flex flex-col gap-1">
                    <Text variant="label" className="text-secondary"> Developers and contibutors </Text> 
                    <Text variant="big-heading">Explore Bounties</Text>
                </div>
                <Text variant="paragraph">
                    Grow your open-source portfolio by completing bounties that interest you, expand your network, and get paid for your work.
                </Text>
            </div>
        </Card>
        <Card className="flex flex-1 flex-col justify-between gap-10 p-12">
            <div className="flex max-w-xl flex-col gap-5">
                <BiRocket size={35} />
                <div className="flex flex-col gap-1">
                    <Text variant="label" className="text-secondary"> Crypto and open-source fanatics </Text> 
                    <Text variant="big-heading">Find an open Challenge</Text>
                </div>
                <Text variant="paragraph">
                    Support the open-source community by providing funding for the software you love.
                </Text>
            </div>
            <Link href="/challenges" passHref>
                <a className="flex flex-row justify-end">
                    <Button text="Get Started" variant="transparent" />
                </a>
            </Link>
        </Card>
    </section>
);

export default ActionsSection;
