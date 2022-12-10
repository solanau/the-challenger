import {
    AuthProvider,
    createUserWithEmailAndPassword,
    linkWithPopup,
    linkWithRedirect,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    unlink as unlinkProvider,
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
        return null;
    }

    const githubProviderData = user.providerData.find(
        ({ providerId }) => providerId === githubAuthProvider.providerId,
    );
    const githubUserInfo =
        githubProviderData &&
        user.reloadUserInfo.providerUserInfo.find(
            userInfo => userInfo.providerId === githubAuthProvider.providerId,
        );

    const twitterProviderData = user.providerData.find(
        ({ providerId }) => providerId === twitterAuthProvider.providerId,
    );
    const twitterUserInfo =
        twitterProviderData &&
        user.reloadUserInfo.providerUserInfo.find(
            userInfo => userInfo.providerId === twitterAuthProvider.providerId,
        );

    const facebookProviderData = user.providerData.find(
        ({ providerId }) => providerId === facebookAuthProvider.providerId,
    );
    const facebookUserInfo =
        facebookProviderData &&
        user.reloadUserInfo.providerUserInfo.find(
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
    signUp(email: string, password: string): Promise<void>;
    logIn(email: string, password: string): Promise<void>;
    logOut(): Promise<void>;
    link(provider: AuthProvider, method?: 'popup' | 'redirect'): Promise<void>;
    unlink(providerId: string): Promise<void>;
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
    };

    const logIn = async (email: string, password: string) => {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password,
        );

        setCredential(toCredential(userCredential.user));
        setFirebaseUser(userCredential.user);
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
    };

    const unlink = async (providerId: string) => {
        const user = await unlinkProvider(firebaseUser, providerId);

        setFirebaseUser(user);
        setCredential(toCredential(user));
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
                unlink,
            }}
        >
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
