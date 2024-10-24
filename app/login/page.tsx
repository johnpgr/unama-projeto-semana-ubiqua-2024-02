import { Github } from "lucide-react"
import { AuthForms } from "./auth-forms"
import { Button } from "~/components/ui/button"
import { auth, signInGithubAction } from "~/lib/auth"
import { redirect } from "next/navigation"

export const runtime = "edge"
export const experimental_ppr = true

export default async function AuthPage() {
  const session = await auth()
  if(session?.user) redirect("/")

  return (
    <AuthForms
      githubButton={
        <form
          className="w-full"
          action={signInGithubAction}
        >
          <Button variant="secondary" className="text-sm w-full">
            Entrar com Github <Github />
          </Button>
        </form>
      }
    />
  )
}
