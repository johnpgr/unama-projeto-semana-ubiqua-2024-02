import { eq } from "drizzle-orm"
import { User } from "./user.schema"
import { db } from "~/database"

export async function getUserById(id: string): Promise<User | null> {
  return (
    (await db.query.User.findFirst({
      where: (u) => eq(u.id, id),
    })) ?? null
  )
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return (
    (await db.query.User.findFirst({
      where: (u) => eq(u.email, email),
    })) ?? null
  )
}

export async function getUserByName(name: string): Promise<User | null> {
  return (
    (await db.query.User.findFirst({
      where: (u) => eq(u.name, name),
    })) ?? null
  )
}

export async function getAccountByUserId(userId: string) {
  return (
    (await db.query.Account.findFirst({
      where: (a) => eq(a.userId, userId),
    })) ?? null
  )
}
