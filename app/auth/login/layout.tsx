import { redirect } from "next/navigation"
import React from "react"
import { getSession } from "~/features/auth/auth"

export const runtime = "edge"

export default async function LoginLayot({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  if (session?.user) {
    redirect("/")
  }

  return <>{children}</>
}
