/* eslint-disable @next/next/no-img-element */
import Card from 'components/common/card';
import { MdOutlineTipsAndUpdates } from 'react-icons/md';
import NavElement from 'components/common/layout/header/nav-element';
import Text from 'components/common/text';
import { useMemo } from 'react';
import { useRouter } from 'next/router';

const AboutSection = () => {
    const tabs = useMemo(
        () => [
            {
                content:
                    'The Bounty Program streamlines the process of finding motivated and driven developers to contribute to your project.\n\nOpen-source contributors are offerred a monetary incentive for their work, allowing them to contribute to your project without having to become a full-time developer.',
                id: 'maintainer',
                label: 'Maintainer',
            },
            {
                content:
                    'Completing bounties nets you levels, showcasing your commitment to open-source development and your past performance on the project.\n\nBounties are created by the maintainers of a project, and are assigned to contributors who are interested in working on the project.',
                id: 'hunter',
                label: 'Hunter',
            },
            {
                content:
                    'Funding bounties with crypto ensures that the projects you love have the resources to continue to grow and attract the most driven developers.\n\nTransactions are performed on the powerful and reliable Solana network, and payments can easily be performed using Solana Pay.',
                id: 'funder',
                label: 'Funder',
            },
        ],
        [],
    );

    const router = useRouter();
    const currentTabId = (router.query.tab as string) || tabs[0].id;

    const currentTab = useMemo(
        () => tabs.find(tab => tab.id === currentTabId),
        [currentTabId, tabs],
    );

    return (
        <section className="mt-36 flex justify-center px-4 sm:px-8 md:mt-0 md:px-16 lg:px-32 xl:px-48">
            <div className="absolute order-2 -mt-36 ml-7 w-3/4 opacity-75 bg-blend-overlay md:relative md:-ml-52 md:mt-0 md:w-1/2">
                <img src="/landing-img-1.png" alt="" />
            </div>

            <div className="order-1 my-auto flex h-auto flex-col">
                <Card className="flex max-w-2xl flex-col gap-7 px-10 py-11 transition-all duration-300">
                    <div className="flex flex-col gap-5">
                        <MdOutlineTipsAndUpdates size={35} />
                        <Text variant="big-heading">What are Bounties?</Text>
                    </div>
                    <div className="flex max-w-full flex-col items-center gap-2">
                        <Text
                            variant="label"
                            className="!normal-case text-secondary"
                        >
                            {' '}
                            I am a...{' '}
                        </Text>
                        <div className="flex h-12 w-full flex-row justify-center gap-8 border-b-1.5 border-b-line">
                            {tabs.map((tab, index) => (
                                <NavElement
                                    as={index === 0 && `/`}
                                    href={`/?tab=${tab.id}`}
                                    key={tab.id}
                                    label={tab.label}
                                    scroll={false}
                                />
                            ))}
                        </div>
                    </div>
                    <Text variant="paragraph" className="whitespace-pre-wrap">
                        {currentTab.content}
                    </Text>
                </Card>
            </div>
        </section>
    );
};

export default AboutSection;
