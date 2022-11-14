import Button from 'components/common/button';
import Card from 'components/common/card';
import NavElement from 'components/common/layout/header/nav-element';
import Markdown from 'components/common/markdown';
import Text from 'components/common/text';
import { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useMemo, useRef, useState } from 'react';
import { BsMarkdown } from 'react-icons/bs';
import { MdPersonOutline } from 'react-icons/md';
import { TbBrandGithub } from 'react-icons/tb';
import { cn } from 'utils';

const NewPage: NextPage = () => {
    const [validBountyName, setValidBountyName] = useState(true);
    const [validHunter, setValidHunter] = useState(true);
    const titleRef = useRef(null);
    const hunterRef = useRef(null);
    const { data: session } = useSession();

    const [title, setTitle] = useState('');
    const [hunter, setHunter] = useState('');
    const [description, setDescription] = useState('');

    const tabs = useMemo(
        () => [
            {
                content: (
                    <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                        <textarea
                            className="min-h-[15rem] w-full border-none bg-transparent outline-none"
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Enter description..."
                            value={description}
                        />
                    </Card>
                ),
                id: 'write',
                label: 'Write',
            },
            {
                content: <Markdown>{description}</Markdown>,
                id: 'preview',
                label: 'Preview',
            },
        ],
        [description],
    );

    const router = useRouter();
    const currentTabId = (router.query.tab as string) || 'write';

    const currentTab = useMemo(
        () => tabs.find(tab => tab.id === currentTabId),
        [currentTabId, tabs],
    );

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (title === '' && hunter === '') {
            setValidHunter(false);
            setValidBountyName(false);
            titleRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
            return;
        } else if (title === '') {
            titleRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
            setValidBountyName(false);
            return;
        }
        const challengerName = session?.user?.name;
        console.log(`session user: `, challengerName);

        const responseUser = await fetch(`/api/${challengerName}`);

        const user = await responseUser.json();

        if (!user) {
            setValidHunter(false);
            hunterRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
            return;
        }

        try {
            const response = await fetch('/api/bounties', {
                body: JSON.stringify({
                    assignee: challengerName,
                    body: description,
                    title: title,
                }),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
            });

            const data = await response.json();

            if (response.ok) {
                alert('Bounty created successfully');
                router.push('/explorer');
            } else {
                alert(JSON.stringify(data));
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    };

    if (!session) {
        return (
            <div className="flex w-full grow flex-col items-center justify-center gap-3 p-5 text-center sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                <TbBrandGithub size={35} />
                <Text variant="sub-heading">
                    Sign in with GitHub to create a bounty.
                </Text>

                <div className="flex flex-row gap-2">
                    <Link href="/" passHref>
                        <a>
                            <Button variant="transparent" text="Go back" />
                        </a>
                    </Link>
                    <Button
                        variant="orange"
                        text="Sign in"
                        onClick={async () => signIn('github')}
                    />
                </div>
            </div>
        );
    }

    return (
        <>
            <NextSeo
                title="Create new Bounty"
                description="Create a new bounty."
            ></NextSeo>
            <form className="flex flex-col" onSubmit={onSubmit}>
                <section className="flex w-full flex-col gap-7 bg-gradient-to-tr from-primary/75 to-secondary/75 p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                    <Text variant="label">New bounty</Text>
                    <div
                        className={cn(
                            'tooltip-bottom tooltip-error',
                            !validBountyName && 'tooltip tooltip-open',
                        )}
                        data-tip="Enter a bounty name"
                    >
                        <div className="flex h-12 flex-col justify-between md:h-20">
                            <input
                                ref={titleRef}
                                className="peer border-none bg-transparent text-4xl font-medium placeholder-black/20 outline-none md:text-6xl"
                                onChange={e => {
                                    setTitle(e.target.value);
                                    if (
                                        e.target.value !== '' &&
                                        !validBountyName
                                    )
                                        setValidBountyName(true);
                                }}
                                placeholder="Bounty name..."
                                value={title}
                            />
                            <div className="h-px w-full bg-line transition-all duration-300 peer-focus:h-1 peer-focus:bg-white" />
                        </div>
                    </div>
                </section>
                <section
                    title="bounty-details"
                    className="flex w-full flex-col gap-7 p-5 !pb-0 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20"
                >
                    <Text variant="label">Details</Text>
                    <div ref={hunterRef} className="flex flex-col gap-3">
                        <Text variant="heading">Hunter</Text>
                        <Text
                            variant="label"
                            className="!normal-case text-secondary"
                        >
                            {' '}
                            Enter a valid username for the GitHub user you wish
                            to assign this bounty to...{' '}
                        </Text>
                        <div
                            className={cn(
                                'tooltip-error w-full sm:w-fit',
                                !validHunter && 'tooltip tooltip-open',
                            )}
                            data-tip="Enter a valid GitHub username"
                        >
                            <div className="background-transparent group flex h-11 w-full max-w-full flex-row items-center gap-3 rounded-full border border-white px-5 py-3 sm:w-96">
                                <MdPersonOutline size={20} />
                                <input
                                    className="w-28 max-w-full bg-transparent text-sm tracking-wide text-secondary outline-none valid:text-primary"
                                    onChange={e => {
                                        setHunter(e.target.value);
                                        if (
                                            e.target.value !== '' &&
                                            !validHunter
                                        )
                                            setValidHunter(true);
                                    }}
                                    placeholder="Enter user..."
                                    type="text"
                                    value={hunter}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <Text variant="heading">Description</Text>

                        <div className="sticky top-20 z-30 -mt-px flex h-16 flex-row gap-4 border-b-1.5 border-b-line bg-neutral bg-opacity-40 pt-4 backdrop-blur-xl">
                            <div className="flex h-full flex-row gap-8">
                                {tabs.map((tab, index) => (
                                    <NavElement
                                        as={index === 0 && '/explorer/new'}
                                        href={`/explorer/new?tab=${tab.id}`}
                                        key={tab.id}
                                        label={tab.label}
                                        scroll={false} // TODO: Scroll to navbar position.
                                    />
                                ))}
                            </div>

                            <div
                                className="tooltip mt-1"
                                data-tip="The textbox below supports Markdown"
                            >
                                <BsMarkdown size={20} />
                            </div>
                        </div>

                        {currentTab.content}

                        <div className="width-full flex flex-row justify-end gap-2">
                            <Button
                                variant="danger"
                                text="Cancel"
                                onClick={() => router.back()}
                            />
                            <Button
                                type="submit"
                                variant="orange"
                                text="Create"
                            />
                        </div>
                    </div>
                </section>
            </form>
        </>
    );
};

export default NewPage;
