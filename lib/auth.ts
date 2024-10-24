import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "~/database"
import * as schema from "~/database/schema"
import Github from "next-auth/providers/github"
import { env } from "~/env.mjs"
import { Provider } from "next-auth/providers"
import { cache } from "react"

const providers: Provider[] = []

export const githubProviderEnabled =
  env.AUTH_GITHUB_CLIENT_ID && env.AUTH_GITHUB_SECRET

if (githubProviderEnabled) {
  providers.push(
    Github({
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    })
  )
}

export const { auth: defaultAuth, handlers, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: schema.User,
    accountsTable: schema.Account,
    sessionsTable: schema.Session,
    verificationTokensTable: schema.VerificationToken,
  }),
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.role = user.role
      }
      return session
    },
  },
  providers,
  secret: env.AUTH_SECRET,
})

export const auth = cache(defaultAuth)
