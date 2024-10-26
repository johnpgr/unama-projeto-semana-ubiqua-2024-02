"use client"

import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export function SignoutButton() {
  const router = useRouter()
  return (
    <div>
      <button
        type="submit"
        className="w-full cursor-pointer"
        onClick={() =>
          fetch(
            (process.env.VERCEL_URL ?? "http://localhost:3000") +
              "/api/auth/signout",
            { method: "POST" },
          ).then(() => router.refresh())
        }
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Sair</span>
      </button>
    </div>
  )
}
