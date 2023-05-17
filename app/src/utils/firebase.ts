import { FirebaseError, initializeApp } from 'firebase/app';
import {
    connectAuthEmulator,
    EmailAuthProvider,
    FacebookAuthProvider,
    getAuth,
    GithubAuthProvider,
    OAuthProvider,
    TwitterAuthProvider,
} from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { AuthProviderType } from 'types/api';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);

if (process.env.NEXT_PUBLIC_USE_EMULATORS === 'true') {
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFirestoreEmulator(firestore, 'localhost', 8080);
    connectFunctionsEmulator(functions, 'localhost', 4001);
}

const githubAuthProvider = new GithubAuthProvider();
const twitterAuthProvider = new TwitterAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();
const emailAuthProvider = new EmailAuthProvider();

function getSocialProvider(
    authProviderType: AuthProviderType,
): TwitterAuthProvider | FacebookAuthProvider | GithubAuthProvider {
    switch (authProviderType) {
        case AuthProviderType.githubProvider:
            return githubAuthProvider;
        case AuthProviderType.facebookProvider:
            return facebookAuthProvider;
        case AuthProviderType.twitterProvider:
            return twitterAuthProvider;
    }
}

function handleSocialError(error: FirebaseError, socialType: AuthProviderType) {
    switch (socialType) {
        case 'twitter':
            return TwitterAuthProvider.credentialFromError(error);
        case 'facebook':
            return FacebookAuthProvider.credentialFromError(error);
        case 'github':
            return GithubAuthProvider.credentialFromError(error);
        default:
            return OAuthProvider.credentialFromError(error);
    }
}

export {
    firestore,
    auth,
    functions,
    twitterAuthProvider,
    githubAuthProvider,
    facebookAuthProvider,
    emailAuthProvider,
    getSocialProvider,
    handleSocialError,
};
