import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "./axios";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET ?? "",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "ejemplo@ejemplo.com",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        // console.log(process.env.NEXTAUTH_URL);

        try {
          const credentialDetails = {
            email: credentials?.email,
            password: credentials?.password,
          };

          const res = await axios.post("/login", credentialDetails);

          // If no error and we have user data, return it
          if (res.status === 200) {
            const user = res.data.data.user;
            return user;
          }

          throw new Error(JSON.stringify(res.data.data.errors));
        } catch (error) {
          console.log(credentials, error);
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    jwt({ account, token, user, profile, session }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
};
