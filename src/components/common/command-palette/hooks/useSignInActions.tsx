import { Action, useRegisterActions } from 'kbar';
import { useMemo } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function useIntegrationsActions() {
    const { data: session } = useSession();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onProfileClick = async () => {
        if (session) {
            await signOut();
        } else {
            await signIn('github');
        }
    };

    //id: 'integrate-github',
    //         name: session ? "Sign out from GitHub..." : "Sign in with GitHub...",
    //         keywords: session ? "sign out logout sign-out" : "sign in login sign-in",
    //         shortcut: ["g"],
    //         section: "Integrations",
    //         perform: () => onProfileClick(),

    const actions = useMemo(() => {
        const totalActions: Action[] = [];

        if (session) {
            totalActions.push({
                id: 'integrate-github',
                name: 'Sign out from GitHub...',
                keywords: 'sign out logout sign-out',
                shortcut: ['g'],
                section: 'Integrations',
                perform: () => onProfileClick(),
            });
        } else {
            totalActions.push({
                id: 'integrate-github',
                name: 'Sign in with GitHub...',
                keywords: 'sign in login sign-in',
                shortcut: ['g'],
                section: 'Integrations',
                perform: () => onProfileClick(),
            });
        }
        return totalActions;
    }, [session, onProfileClick]);

    useRegisterActions(actions);
}
