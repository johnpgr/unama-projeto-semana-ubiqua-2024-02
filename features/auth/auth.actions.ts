"use server"

import { action } from "~/lib/actions"
import { LoginSchema, RegisterSchema } from "./auth.validation"
import { getUserByEmail, getUserByName } from "../users/user.queries"
import { signIn, signOut } from "./auth"
import { DEFAULT_LOGIN_REDIRECT } from "./auth.config"
import { AuthError } from "next-auth"
import { hashPassword } from "~/lib/passwords"
import { User } from "../users/user.schema"
import { db } from "~/database"

export const loginAction = action
  .schema(LoginSchema)
  .action(async ({ parsedInput }) => {
    const { email, password, callbackUrl } = parsedInput
    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.hashedPassword) {
      throw new Error("Credeniciais inválidas")
    }

    return await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    }).catch((e) => {
      if (e instanceof AuthError) {
        if (e.type === "CredentialsSignin") {
          throw new Error("Credenciais inválidas")
        }
      }
      throw e
    })
  })

export const registerAction = action
  .schema(RegisterSchema)
  .action(async ({ parsedInput }) => {
    const { name, email, password, callbackUrl } = parsedInput

    const existingUser = await getUserByName(email)
    if (existingUser) {
      return {
        success: false,
        message: "Nome de usuário já cadastrado",
      }
    }

    const existingEmail = await getUserByEmail(email)
    if (existingEmail) {
      return { success: false, message: "Email já cadastrado" }
    }

    const hashedPassword = await hashPassword(password)
    return await db
      .insert(User)
      .values({
        email,
        name,
        hashedPassword,
      })
      .then(() =>
        signIn("credentials", {
          email,
          password,
          redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        })
      )
  })

export async function loginGithubAction() {
  await signIn("github")
}

export async function signOutAction() {
  await signOut()
}
