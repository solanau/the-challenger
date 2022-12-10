import {
    AuthProvider,
    createUserWithEmailAndPassword,
    linkWithPopup,
    linkWithRedirect,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
    UserCredential,
} from 'firebase/auth';
import { useUser } from 'hooks/use-user';
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { UserPayload } from 'types/user';
import {
    auth,
    facebookAuthProvider,
    githubAuthProvider,
    twitterAuthProvider,
} from '../utils/firebase';

interface Credential {
    id: string | null;
    email: string | null;
    githubUserName: string | null;
    twitterUserName: string | null;
    facebookUserName: string | null;
}

function toCredential(user: any): Credential {
    if (!user) {
        return {
            email: null,
            id: null,
            githubUserName: null,
            twitterUserName: null,
            facebookUserName: null,
        };
    }

    const githubUserInfo = user.reloadUserInfo.providerUserInfo.find(
        userInfo => userInfo.providerId === githubAuthProvider.providerId,
    );

    const twitterUserInfo = user.reloadUserInfo.providerUserInfo.find(
        userInfo => userInfo.providerId === twitterAuthProvider.providerId,
    );

    const facebookUserInfo = user.reloadUserInfo.providerUserInfo.find(
        userInfo => userInfo.providerId === facebookAuthProvider.providerId,
    );

    return {
        email: user.email,
        id: user.uid,
        githubUserName: githubUserInfo?.screenName ?? null,
        twitterUserName: twitterUserInfo?.screenName ?? null,
        facebookUserName: facebookUserInfo?.screenName ?? null,
    };
}

export interface AuthContextState {
    user: UserPayload;
    credential: Credential;
    isLoggedIn: boolean;
    signUp(email: string, password: string): Promise<UserCredential>;
    logIn(email: string, password: string): Promise<UserCredential>;
    logOut(): Promise<void>;
    link(
        provider: AuthProvider,
        method?: 'popup' | 'redirect',
    ): Promise<UserCredential>;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [firebaseUser, setFirebaseUser] = useState<User>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [credential, setCredential] = useState<Credential>(null);
    const user = useUser(credential?.id ?? null);
    const isLoggedIn = useMemo(() => !!credential, [credential]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCredential(toCredential(user));
            setFirebaseUser(user);
        });
        setLoading(false);

        return () => unsubscribe();
    }, []);

    const signUp = async (email: string, password: string) => {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
        );

        setCredential(toCredential(userCredential.user));
        setFirebaseUser(userCredential.user);

        return userCredential;
    };

    const logIn = async (email: string, password: string) => {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password,
        );

        setCredential(toCredential(userCredential.user));
        setFirebaseUser(userCredential.user);

        return userCredential;
    };

    const logOut = async () => {
        setFirebaseUser(null);
        setCredential(null);
        await signOut(auth);
    };

    const link = async (
        provider: AuthProvider,
        method: 'popup' | 'redirect' = 'popup',
    ) => {
        let userCredential: UserCredential;

        if (method === 'popup') {
            userCredential = await linkWithPopup(firebaseUser, provider);
        } else {
            userCredential = await linkWithRedirect(firebaseUser, provider);
        }

        setFirebaseUser(userCredential.user);
        setCredential(toCredential(userCredential.user));

        return userCredential;
    };

    return (
        <AuthContext.Provider
            value={{
                credential,
                user,
                isLoggedIn,
                signUp,
                logIn,
                logOut,
                link,
            }}
        >
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
