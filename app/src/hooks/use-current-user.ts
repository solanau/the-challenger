import { useAuth } from 'providers/AuthProvider';
import { useUser } from './use-user';

export const useCurrentUser = () => {
    const {
        user: { uid },
    } = useAuth();

    return useUser(uid);
};
