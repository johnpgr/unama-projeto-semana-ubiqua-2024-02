import { Github } from "lucide-react"
import { Button } from "~/components/ui/button"
import { loginGithubAction } from "~/features/auth/auth.actions"

export function GithubLogin() {
  return (
    <form className="w-full" action={loginGithubAction}>
      <Button className="w-full bg-black hover:bg-black/90">
        Entrar com GitHub <Github className="h-4 w-4" />
      </Button>
    </form>
  )
}
