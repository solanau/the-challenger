import {
    createUserWithEmailAndPassword,
    GithubAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    UserCredential,
} from 'firebase/auth';
import { useUser } from 'hooks/use-user';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserPayload } from 'types/user';
import { auth } from '../utils/firebase';

interface Credential {
    email: string | null;
    uid: string | null;
    githubUserName: string | null;
}

export interface AuthContextState {
    user: UserPayload;
    credential: Credential;
    isLoggedIn: boolean;
    signUp(email: string, password: string): Promise<UserCredential>;
    logIn(email: string, password: string): Promise<UserCredential>;
    logOut(): Promise<void>;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [credential, setCredential] = useState<Credential>({
        email: null,
        uid: null,
        githubUserName: null,
    });
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const user = useUser(credential?.uid ?? null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, credential => {
            if (credential) {
                const githubUserInfo = (
                    credential as any
                ).reloadUserInfo.providerUserInfo.find(
                    credentialInfo =>
                        credentialInfo.providerId ===
                        GithubAuthProvider.PROVIDER_ID,
                );

                setCredential({
                    email: credential.email,
                    uid: credential.uid,
                    githubUserName: githubUserInfo?.screenName ?? null,
                });
                setLoggedIn(true);
            } else {
                setCredential({
                    email: null,
                    uid: null,
                    githubUserName: null,
                });
                setLoggedIn(false);
            }
        });
        setLoading(false);

        return () => unsubscribe();
    }, []);

    const signUp = (email: string, password: string) =>
        createUserWithEmailAndPassword(auth, email, password);

    const logIn = (email: string, password: string) =>
        signInWithEmailAndPassword(auth, email, password);

    const logOut = async () => {
        setCredential({ email: null, uid: null, githubUserName: null });
        await signOut(auth);
    };

    return (
        <AuthContext.Provider
            value={{ credential, user, isLoggedIn, signUp, logIn, logOut }}
        >
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
