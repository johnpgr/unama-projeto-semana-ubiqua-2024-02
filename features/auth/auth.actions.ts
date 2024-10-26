"use server"

import { LoginSchema, RegisterSchema } from "./auth.validation"
import { getUserByEmail, getUserByName } from "../users/user.queries"
import { signIn, signOut } from "./auth"
import { DEFAULT_LOGIN_REDIRECT } from "./auth.config"
import { AuthError } from "next-auth"
import { User } from "../users/user.schema"
import bcrypt from "bcryptjs"
import { db } from "~/database"
import { createServerAction, ZSAError } from "zsa"
import { redirect } from "next/navigation"

export const loginAction = createServerAction()
  .input(LoginSchema)
  .handler(async ({ input }) => {
    const { email, password, callbackUrl } = input
    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.hashedPassword) {
      throw new ZSAError("NOT_AUTHORIZED", "Credenciais inválidas")
    }

    try {
      await signIn("credentials", {
        email,
        password,
      })
    } catch (e) {
      if (e instanceof AuthError) {
        if (e.type === "CredentialsSignin") {
          throw new ZSAError("NOT_AUTHORIZED", "Credenciais inválidas")
        }
        console.error(e)
        throw new ZSAError(
          "INTERNAL_SERVER_ERROR",
          "Ocorreu um erro inesperado. Tente novamente mais tarde.",
        )
      }
    }

    redirect(callbackUrl || DEFAULT_LOGIN_REDIRECT)
  })

export const registerAction = createServerAction()
  .input(RegisterSchema)
  .handler(async ({ input }) => {
    const { name, email, password, callbackUrl } = input

    const existingUser = await getUserByName(email)
    if (existingUser) {
      throw new ZSAError("CONFLICT", "Nome de usuário já cadastrado")
    }

    const existingEmail = await getUserByEmail(email)
    if (existingEmail) {
      throw new ZSAError("CONFLICT", "Email já cadastrado")
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    try {
      await db.insert(User).values({
        email,
        name,
        hashedPassword,
      })
      await signIn("credentials", {
        email,
        password,
      })
    } catch (e) {
      console.error(e)
      throw new ZSAError(
        "INTERNAL_SERVER_ERROR",
        "Ocorreu um erro inesperado. Tente novamente mais tarde.",
      )
    }

    redirect(callbackUrl || DEFAULT_LOGIN_REDIRECT)
  })

export async function loginGithubAction() {
  await signIn("github")
}

export async function signOutAction() {
  await signOut()
}
