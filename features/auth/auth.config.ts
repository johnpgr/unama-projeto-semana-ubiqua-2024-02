import { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import { LoginSchema } from "./auth.validation"
import { getUserByEmail } from "../users/user.queries"
import { verifyPassword } from "~/lib/passwords"

export const AuthConfig: NextAuthConfig = {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validFields = LoginSchema.safeParse(credentials)
        if (!validFields.success) {
          return null
        }

        const { email, password } = validFields.data

        const user = await getUserByEmail(email)
        if (!user || !user.hashedPassword) {
          return null
        }

        const passwordMatch = await verifyPassword(
          user.hashedPassword,
          password
        )
        if (!passwordMatch) return null

        return user
      },
    }),
  ],
}

export const DEFAULT_LOGIN_REDIRECT = "/"
