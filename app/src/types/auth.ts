export interface LoginFormData {
    email: string;
    password: string;
}

export interface SignUpFormData {
    email: string;
    password: string;
}

export interface Auth {
    id: string;
    email: string;
}

export enum AuthProviderType {
    githubProvider = 'github',
    facebookProvider = 'facebook',
    twitterProvider = 'twitter',
    emailProvider = 'email',
}
