import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export default NextAuth({
    callbacks: {
        async signIn({ user }) {
            if (user.id === process.env.FLATBREAD_ADMIN_ID) {
                return true;
            } else {
                return false;
            }
        },
    },
    providers: [
        GithubProvider({
            clientId: (process.env.GITHUB_ID) ? process.env.GITHUB_ID : '',
            clientSecret: (process.env.GITHUB_SECRET) ? process.env.GITHUB_SECRET : '',
        }),
    ],
});
