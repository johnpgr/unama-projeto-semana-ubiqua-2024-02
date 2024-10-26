import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "~/database"
import * as schema from "~/database/schema"
import { env } from "~/env.mjs"
import { cache } from "react"
import { eq } from "drizzle-orm"
import { AuthConfig } from "./auth.config"
import {
  getAccountByUserId,
} from "./auth.queries"
import { getUserById } from "../users/user.queries"

export const {
  auth: defaultAuth,
  handlers,
  signIn,
  signOut,
} = NextAuth({
  trustHost: true,
  secret: env.AUTH_SECRET,
  session: { strategy: "jwt" },

  adapter: DrizzleAdapter(db, {
    usersTable: schema.User,
    accountsTable: schema.Account,
    sessionsTable: schema.Session,
    verificationTokensTable: schema.VerificationToken,
  }),

  pages: {
    signIn: "/auth/signin",
  },

  events: {
    async linkAccount({ user }) {
      await db
        .update(schema.User)
        .set({ emailVerified: new Date() })
        .where(eq(schema.User.id, user.id!))
    },
  },

  callbacks: {
    session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        session.user.role = token.role
      }
      if (session.user) {
        session.user.isOAuth = token.isOAuth
        session.user.name = token.name
        session.user.email = token.email
      }

      return session
    },

    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)

      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role

      return token
    },
  },

  ...AuthConfig,
})

export const getSession = cache(defaultAuth)
