import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userID: string | number;
      email: string;
      userName: string;
      accessToken: string;
    };
  }
}
