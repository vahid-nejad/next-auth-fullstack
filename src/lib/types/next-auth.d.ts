import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string | null | undefined;
      email: string | null | undefined;
      accessToken: string;
    };
  }
}
