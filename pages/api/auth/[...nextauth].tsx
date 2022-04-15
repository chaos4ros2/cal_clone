import NextAuth from 'next-auth';
// https://next-auth.js.org/providers/credentials#example
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '../../../lib/prisma';
import {verifyPassword} from "../../../lib/auth";

export default NextAuth({
    session: {
        // jwt: true
        strategy: "jwt",
    },
    pages: {
        signIn: '/auth/login',
        signOut: '/auth/logout',
        error: '/auth/error', // Error code passed in query string as ?error=
    },
    providers: [
        CredentialsProvider({
            name: 'Calendso',
            credentials: {
                email: { label: "Email Address", type: "email", placeholder: "john.doe@example.com" },
                password: { label: "Password", type: "password", placeholder: "Your super secure password" }
            },
            async authorize(credentials) {
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email
                    }
                });

                if (!user) {
                    throw new Error('No user found');
                }

                const isValid = await verifyPassword(credentials.password, user.password);

                if (!isValid) {
                    throw new Error('Incorrect password');
                }

                return {id: user.id, username: user.username, email: user.email, name: user.name};
            }
        })
    ],
    secret: '123',
});