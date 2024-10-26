"use client"

import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { DropdownMenuItem } from "~/components/ui/dropdown-menu"

export function SignoutButton() {
  const router = useRouter()

  async function onClick() {
    await fetch(window.location.origin + "/api/auth/signout", {
      method: "POST",
    })
    router.refresh()
  }

  return (
    <DropdownMenuItem asChild>
      <button onClick={onClick} className="cursor-pointer w-full">
        <LogOut className="mr-2 h-4 w-4" />
        Sair
      </button>
    </DropdownMenuItem>
  )
}
