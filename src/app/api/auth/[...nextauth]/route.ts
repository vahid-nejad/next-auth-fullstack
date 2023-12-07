import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from 'zod';
import { PrismaClient } from '@prisma/client'; 
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();


export async function getUser(email:any) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error; 
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string() })
          .safeParse(credentials);
          
          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await getUser(email);
            if (!user) return null;
            console.log(user)
          }
          console.log('parsedCredentials',parsedCredentials)
          return null;
        // // Add logic here to look up the user from the credentials supplied
        // const res = await fetch("http://localhost:3000/api/login", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     username: credentials?.username,
        //     password: credentials?.password,
        //   }),
        // });

        // const user = await res.json();

        // if (user) {
        //   user.name = "sakura";
        //   return user;
        // } else {

        //   return null;

          
        // }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log('jwt', token);
      if (user) {
        token.name = user.name
        console.log('token',token.name)
      };
      return { token };
    },

    async session({ session, token }) {
      console.log('session', session, token);
      // session.user = token as any;
      session.user.name = token.name;
      // console.log('data', session.user, token.name);
      return session;
    },
  },
});

export { handler as GET, handler as POST };
