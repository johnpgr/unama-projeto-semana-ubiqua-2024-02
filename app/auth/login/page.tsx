import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { GithubLogin } from "./github-login-btn"
import { redirect } from "next/navigation"
import { getSession } from "~/features/auth/auth"

export const runtime = "edge"

export default async function AuthPage() {
  const session = await getSession()
  if (session?.user) {
    redirect("/")
  }

  return (
    <div className="w-full flex items-center justify-center min-h-screen px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Bem-vindo ao EasyLodge
          </CardTitle>
          <CardDescription className="text-center">
            Faça login ou crie uma conta para gerenciar suas hospedagens
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="register">Registrar</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 -mt-4">
          <p>ou</p>
          <GithubLogin />
        </CardFooter>
      </Card>
    </div>
  )
}
