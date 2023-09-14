import NextAuth from 'next-auth';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        // accessToken: string;
        // refreshToken: string;
        user: {
            accessToken: string;
            xerk: string;
        } & DefaultSession['user'];
    }

    interface User {
        accessToken: string;
        xerk: string;
    }
}
