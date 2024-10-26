import { NextResponse } from "next/server"
import { signOut } from "~/features/auth/auth"

export const runtime = "edge"
export const preferredRegion = "home"

export async function POST() {
  await signOut({ redirect: false })

  return new NextResponse()
}
