import { eq } from "drizzle-orm"
import { db } from "~/database"

export async function getAccountByUserId(userId: string) {
  return (
    (await db.query.Account.findFirst({
      where: (a) => eq(a.userId, userId),
    })) ?? null
  )
}
