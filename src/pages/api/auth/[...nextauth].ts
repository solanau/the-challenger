import NextAuth, { NextAuthOptions } from 'next-auth';

import GithubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
    session: {
        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 2 * 24 * 60 * 60, // 24 hours
    },
    jwt: {
        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        jwt: ({ account, profile, token }) => {
            if (profile) {
                token.login = profile.login;
            }

            if (account) {
                token.accessToken = account.access_token;
            }

            return token;
        },
        session: ({ session, token }) => {
            session.accessToken = token.accessToken;
            session.login = token.login;
            session.maxAge = ""

            return session;
        },
    },
    providers: [
        GithubProvider({
            authorization: {
                params: { scope: 'public_repo' },

            },
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    secret: process.env.SECRET,
};

export default NextAuth(authOptions);
