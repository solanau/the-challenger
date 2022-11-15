import {
    ActionId,
    ActionImpl,
    KBarAnimator,
    KBarPortal,
    KBarPositioner,
    KBarProvider,
    KBarResults,
    KBarSearch,
    useMatches,
} from 'kbar';

import { MdOutlineSearch } from 'react-icons/md';
import React from 'react';
import Text from '../text';
import { cn } from 'utils';
import useIntegrationsActions from './hooks/useSignInActions';
import useProfileAction from './hooks/useYourProfileActions';

// eslint-disable-next-line react/display-name
const ResultItem = React.forwardRef(
    (
        {
            action,
            active,
        }: {
            action: ActionImpl;
            active: boolean;
            currentRootActionId: ActionId;
        },
        ref: React.Ref<HTMLDivElement>,
    ) => (
        <div
            ref={ref}
            className={cn(
                'flex h-16 cursor-pointer flex-row items-center justify-between pr-5 transition-colors duration-300 ease-out',
                active && 'bg-primary-focus bg-opacity-5',
            )}
        >
            <div className="flex h-full flex-row items-center gap-5">
                <div
                    className={cn(
                        'h-1/2 w-1 bg-transparent transition-all duration-300 ease-out',
                        active && '!h-full !bg-primary',
                    )}
                />

                <div className="flex flex-col">
                    <Text variant="paragraph">{action.name}</Text>
                    <Text
                        variant="label"
                        className="!normal-case text-secondary"
                    >
                        {action.subtitle}
                    </Text>
                </div>
            </div>
            {action.shortcut?.length && (
                <div aria-hidden className="flex flex-row items-center gap-1.5">
                    {action.shortcut.map(sc => (
                        <kbd key={sc} className="kbd kbd-sm bg-black/50">
                            {sc}
                        </kbd>
                    ))}
                </div>
            )}
        </div>
    ),
);

function RenderResults() {
    const { results, rootActionId } = useMatches();

    return (
        <KBarResults
            items={results}
            onRender={({ item, active }) =>
                typeof item === 'string' ? (
                    <div className="w-full p-2 pl-6 pb-3">
                        <Text variant="label" className="text-primary">
                            {' '}
                            {item}{' '}
                        </Text>
                    </div>
                ) : (
                    <ResultItem
                        action={item}
                        active={active}
                        currentRootActionId={rootActionId}
                    />
                )
            }
        />
    );
}

function CommandBar() {
    useProfileAction();
    useIntegrationsActions();

    return (
        <KBarPortal>
            <KBarPositioner className="z-[200] bg-base bg-opacity-50 backdrop-blur-md">
                <KBarAnimator className="w-[600px] overflow-hidden rounded-3xl border border-white bg-base bg-opacity-90 backdrop-blur-lg firefox:bg-opacity-90">
                    {' '}
                    <div className="flex flex-row justify-between gap-3 p-5">
                        <KBarSearch
                            defaultPlaceholder="Search bounties, profiles, pages, and more..."
                            className="block w-full bg-transparent placeholder:overflow-visible placeholder:text-base-content placeholder:opacity-50 focus:outline-none"
                        />
                        <MdOutlineSearch size={22} className="w-fit" />
                    </div>
                    <div className="h-px w-full bg-line" />
                    <RenderResults />
                </KBarAnimator>
            </KBarPositioner>
        </KBarPortal>
    );
}

const CommandPalette = props => {
    const initialActions = [
        /* {
            id: 'home',
            name: 'Home',
            subtitle: 'Subtitles can help add more context.',
            keywords: 'home homepage landing',
            shortcut: ['h'],
            section: 'Navigation',
            perform: () => (window.location.pathname = '/'),
        },
        {
            id: 'explorer',
            name: 'Explorer',
            keywords: 'explorer bounties',
            shortcut: ['e'],
            section: 'Navigation',
            perform: () => (window.location.pathname = '/explorer'),
        }, */
        // {
        //     id: 'leaderboard',
        //     name: 'Leader Board',
        //     keywords: 'leader board',
        //     shortcut: ['e'],
        //     section: 'Navigation',
        //     perform: () => (window.location.pathname = '/leaderboard'),
        // },
        /* {
            id: 'create-bounty',
            name: 'Create bounty',
            keywords: 'bounty create new plus add',
            shortcut: ['c', 'b'],
            section: 'Actions',
            perform: () => (window.location.pathname = 'explorer/new'),
        }, */
    ];

    return (
        <KBarProvider actions={initialActions}>
            <CommandBar />

            {props.children}
        </KBarProvider>
    );
};

export default CommandPalette;
