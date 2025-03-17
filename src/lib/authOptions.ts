import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import {
  ENV_GOOGLE_CLIENT_ID,
  ENV_GOOGLE_CLIENT_SECRET,
} from "@/lib/constants";

import { prisma } from "@/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      isAdmin: boolean;
    };
  }
}

const { auth, handlers, signIn, signOut, unstable_update } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: ENV_GOOGLE_CLIENT_ID,
      clientSecret: ENV_GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    signIn: async (param) => {
      const { profile, account, user } = param;
      if (account?.provider !== "google") {
        console.error("Invalid provider");
        return false;
      }

      const email = user?.email || profile?.email;
      const name = user?.name || profile?.name;
      const image = user?.image || profile?.avatar_url;

      if (!email || typeof email !== "string") {
        console.error("Invalid email");
        return false;
      }

      const dbUser = await prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          loggedInTimes: true,
        },
      });

      if (dbUser) {
        console.log(
          `User ${email} logged in ${dbUser.loggedInTimes + 1} times`
        );

        await prisma.user.update({
          where: { email },
          data: {
            name,
            image: typeof image === "string" ? image : undefined,
            loginJson: param as {
              user: {
                email?: string | null;
                name?: string | null;
                image?: string | null;
              };
              account: { provider: string } | null;
              profile?: { email?: string; name?: string; avatar_url?: string };
            },
            loggedInTimes: dbUser.loggedInTimes + 1,
            lastLogin: new Date(),
          },
        });
        return true;
      }

      await prisma.user.create({
        data: {
          name,
          email,
          image: typeof image === "string" ? image : undefined,
          loginJson: param as {
            user: {
              email?: string | null;
              name?: string | null;
              image?: string | null;
            };
            account: { provider: string } | null;
            profile?: { email?: string; name?: string; avatar_url?: string };
          },
        },
      });

      return true;
    },
    async session({ session }) {
      if (session.user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email! },
          select: {
            id: true,
            isBlocked: true,
          },
        });

        if (dbUser) {
          session.user.id = dbUser.id.toString();

          if (dbUser.isBlocked) {
            throw new Error("User is blocked");
          }
        } else {
          throw new Error("User not found");
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
  },
  session: {
    maxAge: 60 * 60,
  },
});

export { auth, handlers, signIn, signOut, unstable_update };
