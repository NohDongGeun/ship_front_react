import NextAuth, { CookiesOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextApiRequest, NextApiResponse } from 'next';
import { signin } from '../../../api/auth';

const cookies: Partial<CookiesOptions> = {
    sessionToken: {
        name: 'next-auth.sesstion-token',
        options: {
            httpOnly: false,
            sameSite: 'lax',
            path: '/',
            secure: false,
        },
    },
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    return await NextAuth(req, res, {
        providers: [
            CredentialsProvider({
                name: 'Credentials',
                id: 'Credentials',
                credentials: {
                    identyKey: {
                        label: 'Email',
                        type: 'email',
                        placeholder: 'Email',
                    },
                    password: { label: 'Password', type: 'password' },
                    accessToken: { label: 'accessToken' },
                    xerk: { label: 'xerk' },
                },
                async authorize(credentials, req) {
                    if (!credentials) {
                        return Promise.reject();
                    }

                    if (credentials?.accessToken && credentials?.xerk) {
                        return credentials;
                    }

                    if (!credentials?.identyKey || !credentials?.password) {
                        return Promise.reject(new Error('Missing credentials'));
                    }

                    const res = await signin({
                        identyKey: credentials?.identyKey,
                        password: credentials?.password,
                    });

                    if (
                        res.success &&
                        res.response &&
                        res.response.accessToken &&
                        res.response.xerk
                    ) {
                        return res.response;
                    }

                    return Promise.reject(new Error(res?.errors));
                },
            }),
        ],
        session: {
            strategy: 'jwt',
        },
        pages: {
            signIn: '/signin',
        },
        cookies,
        callbacks: {
            async jwt({ token, user }) {
                if (user) {
                    token.accessToken = user.accessToken;
                    token.xerk = user.xerk;
                }
                return token;
            },
            async session({ session, token, user }) {
                if (session) {
                    session.user.accessToken = token.accessToken;
                    session.user.xerk = token.xerk;
                }

                return session;
            },
        },
    });
}
