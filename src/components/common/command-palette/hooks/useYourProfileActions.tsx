import { Action, useRegisterActions } from 'kbar';
import { useMemo } from 'react';
import { useSession } from 'next-auth/react';

export default function useProfileAction() {
    const { data: session } = useSession();

    const actions = useMemo(() => {
        const totalActions: Action[] = [];

        if (session) {
            totalActions.push({
                id: 'profile',
                name: 'Your profile',
                keywords: 'profile me account',
                shortcut: ['p'],
                section: 'Navigation',
                perform: () => (window.location.pathname = `/${session.login}`),
            });
        }

        return totalActions;
    }, [session]);

    useRegisterActions(actions);
}
