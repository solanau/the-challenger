import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    UserCredential,
} from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../utils/firebase';

interface UserType {
    email: string | null;
    uid: string | null;
}

export interface AuthContextState {
    user: UserType;
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
    const [user, setUser] = useState<UserType>({ email: null, uid: null });
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setUser({
                    email: user.email,
                    uid: user.uid,
                });
                setLoggedIn(true);
            } else {
                setUser({ email: null, uid: null });
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
        setUser({ email: null, uid: null });
        await signOut(auth);
    };

    return (
        <AuthContext.Provider
            value={{ user, isLoggedIn, signUp, logIn, logOut }}
        >
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
