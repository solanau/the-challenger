/* eslint-disable indent */
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import Button from 'components/common/button';
import Chip from 'components/common/chip';
import NavElement from 'components/common/layout/header/nav-element';
import Markdown from 'components/common/markdown';
import Text from 'components/common/text';
import { useBountyReward } from 'hooks/use-bounty-reward';
import { getBounty } from 'lib/bounties';
import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { useMemo, useState } from 'react';
import { MdChevronLeft, MdLink, MdShare } from 'react-icons/md';
import { Bounty } from 'types/bounty';
import { cn } from 'utils';

type BountyDetailsPageProps = {
    bounty: Bounty;
};

const BountyDetailsPage: NextPage<BountyDetailsPageProps> = ({ bounty }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const { githubUrl, description, id, mint, name, state, createdAt } = bounty;

    const { reward, isLoading: isRewardLoading } = useBountyReward(id);
    const { data: session } = useSession();
    const { publicKey, wallet } = useWallet();

    const tabs = useMemo(
        () => [
            {
                content: <Markdown>{description}</Markdown>,
                id: 'description',
                label: 'Description',
            },
            // {
            //     content: (
            //         <FundTab {...bounty} reward={!isRewardLoading && reward} />
            //     ),
            //     id: 'fund',
            //     label: 'Fund',
            // },
        ],
        [description],
    );

    const router = useRouter();
    const currentTabId = (router.query.tab as string) || tabs[0].id;

    const currentTab = useMemo(
        () => tabs.find(tab => tab.id === currentTabId),
        [currentTabId, tabs],
    );

    const onClaimButtonClick = async () => {
        const response = await fetch(`/api/bounties/${id}/claim`, {
            body: JSON.stringify({
                userVault: await getAssociatedTokenAddress(
                    new PublicKey(mint),
                    publicKey,
                ),
            }),
            method: 'POST',
        });

        const data = await response.json();

        if (data.signature) {
            alert(
                `Transaction successful: https://explorer.solana.com/tx/${data.signature}?cluster=devnet`,
            );
            await router.push('/explorer');
        } else {
            alert(JSON.stringify(data));
        }
    };

    const onCloseButtonClick = async () => {
        try {
            const response = await fetch(`/api/bounties/${id}`, {
                headers: { 'Content-Type': 'application/json' },
                method: 'PATCH',
            });

            const data = await response.json();

            if (response.ok) {
                router.push(`/explorer`);
            } else {
                alert(JSON.stringify(data));
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    };

    return (
        <>
            <NextSeo
                title={name}
                description="Claim and complete the bounty to get reward. Fund for the project you love and use on a daily-basis."
            ></NextSeo>
            <div className="flex flex-col gap-8 p-5 !pb-0 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                <div className="flex flex-row flex-wrap items-center justify-between gap-5">
                    <Link href="/explorer" passHref>
                        <a>
                            <Button reversed text="Back" variant="label">
                                <MdChevronLeft className="aspect-square h-4" />
                            </Button>
                        </a>
                    </Link>

                    <div className="flex w-fit flex-row flex-wrap gap-3">
                        {session &&
                            bounty.owner === session.login &&
                            bounty.state === 'open' && (
                                <Button
                                    onClick={onCloseButtonClick}
                                    variant="danger"
                                    text="Close"
                                />
                            )}
                        {session && bounty.hunter === session.login && (
                            <div
                                className={`${
                                    (state !== 'closed' || !wallet) && 'tooltip'
                                } tooltip-left`}
                                data-tip={
                                    state !== 'closed'
                                        ? 'Complete this bounty to claim it'
                                        : !wallet &&
                                          'Connect a wallet to claim this bounty'
                                }
                            >
                                <Button
                                    disabled={state !== 'closed' || !wallet}
                                    onClick={onClaimButtonClick}
                                    text="Claim"
                                    variant="orange"
                                />
                            </div>
                        )}
                        <a href={githubUrl}>
                            <Button
                                text="View on GitHub"
                                icon={MdLink}
                                variant="transparent"
                                reversed={true}
                                className="hidden sm:flex"
                            />
                            <Button
                                text="GitHub"
                                icon={MdLink}
                                variant="transparent"
                                reversed={true}
                                className="flex sm:hidden"
                            />
                        </a>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                        <Chip
                            value="placed"
                            highlightValue={createdAt}
                            reversed={true}
                        />
                        <Chip
                            value={state}
                            className={
                                state === 'closed'
                                    ? 'text-danger'
                                    : 'text-green-500'
                            }
                        />
                    </div>
                    <Text variant="big-heading">{name}</Text>
                </div>

                <Text variant="nav-heading">Basics</Text>

                {/* <BountyCard
                    {...bounty}
                    maxTags={7}
                    name=""
                    reward={!isRewardLoading && reward}
                    showDetails
                /> */}

                <div className="sticky top-20 z-30 -mt-px flex h-16 flex-row gap-8 border-b-1.5 border-b-line bg-neutral bg-opacity-40 pt-4 backdrop-blur-xl">
                    {tabs.map((tab, index) => (
                        <NavElement
                            as={index === 0 && `/explorer/${id}`}
                            href={`/explorer/${id}?tab=${tab.id}`}
                            key={tab.id}
                            label={tab.label}
                            scroll={false} // TODO: Scroll to navbar position.
                        />
                    ))}

                    <div className="flex w-full flex-row justify-end">
                        <div
                            data-tip="Link copied!"
                            className={cn(
                                'tooltip-left tooltip-success',
                                showTooltip && 'tooltip',
                            )}
                        >
                            <Button
                                icon={MdShare}
                                variant="label"
                                className="!text-primary"
                                onClick={() => {
                                    const url = `${window.location.origin}/explorer/${id}/?tab=fund`;
                                    if (navigator?.share) {
                                        navigator
                                            .share({
                                                title: name,
                                                text: 'Help the development of this open-source project by funding this bounty.',
                                                url: url,
                                            })
                                            .then(() => {
                                                console.log('Link shared.');
                                            })
                                            .catch(console.error);
                                    } else {
                                        navigator.clipboard.writeText(url);
                                        setShowTooltip(true);
                                        setTimeout(
                                            () => setShowTooltip(false),
                                            2000,
                                        );
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>

                <section className="flex flex-col gap-5">
                    {currentTab.content}
                </section>
            </div>
        </>
    );
};

export default BountyDetailsPage;

export const getServerSideProps: GetServerSideProps = async context => {
    const id = parseInt(context.query.id as string);

    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions,
    );

    const accessToken = session?.accessToken as string;

    const bounty = await getBounty(id, accessToken);

    if (!bounty) {
        return {
            redirect: {
                destination: '/explorer',
                permanent: false,
            },
        };
    }

    return { props: { bounty } };
};
