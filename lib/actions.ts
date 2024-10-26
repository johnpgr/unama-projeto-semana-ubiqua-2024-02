import { createSafeActionClient } from "next-safe-action"
import { getSession } from "~/features/auth/auth"

export const action = createSafeActionClient()

export const authedAction = action.use(async ({ next }) => {
  const session = await getSession()
  if (!session?.user) throw new Error("Unauthorized")

  return next({ ctx: { user: session.user } })
})
