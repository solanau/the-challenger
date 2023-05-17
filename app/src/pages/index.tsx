import Button from 'components/common/button';
import Text from 'components/common/text';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { TbSearch } from 'react-icons/tb';

// Home
const Home: NextPage = () => (
    <>
        <Head>
            <title>The Challenger </title>
        </Head>
        <div className="flex">
            <div className="relative z-30 mt-28 flex h-full w-full flex-col items-center justify-evenly gap-16 px-4 pt-20 text-left sm:mt-20 sm:items-start sm:px-8 md:px-16 lg:mt-0 lg:px-32 xl:px-64">
                <Text className="font-bold" variant="super-hero">
                    The challenger
                </Text>

                <div className="max-w-[650px]">
                    <Text variant="paragraph">
                        Welcome hackers to the bounty challenge competition
                    </Text>

                    <Text variant="paragraph">Explore all our challenges</Text>
                </div>

                <Link
                    href={{
                        pathname: '/events',
                    }}
                    passHref
                >
                    <a className="flex-1 sm:flex-none">
                        <Button
                            icon={TbSearch}
                            text={'View all events'}
                            variant="orange"
                            className="!w-full"
                        ></Button>
                    </a>
                </Link>
            </div>
        </div>
    </>
);

export default Home;
