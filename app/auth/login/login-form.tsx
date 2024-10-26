"use client"

import React from "react"
import { useServerAction } from "zsa-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Checkbox } from "~/components/ui/checkbox"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "next/navigation"
import { LoginSchema } from "~/features/auth/auth.validation"
import { loginAction } from "~/features/auth/auth.actions"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PendingButton } from "~/components/pending-btn"
import { toast } from "sonner"

export function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")
  const [showPassword, setShowPassword] = React.useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const { execute, isPending } = useServerAction(loginAction, {
    onError: ({ err }) =>
      toast.error("Erro ao logar", { description: err.message }),
  })
  const form = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      callbackUrl: callbackUrl || "",
    },
  })

  const onSubmit = async (data: LoginSchema) => {
    await execute(data)
  }

  if (searchParams.get("error") === "OAuthAccontNotLinked")
    toast.error("Erro ao logar", {
      description: "Seu email já esta em uso em outra conta!",
    })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    {...field}
                    type="email"
                    className="pl-10 pr-10"
                    placeholder="Seu email"
                    required
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    className="pl-10 pr-10"
                    placeholder="Sua senha"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Esconder senha" : "Mostrar senha"}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Lembrar de mim</Label>
          </div>
          <div className="text-sm text-muted-foreground">
            <Link href="/forgot-password" className="hover:underline">
              Esqueceu a senha?
            </Link>
          </div>
        </div>
        <PendingButton text="Entrar" isPending={isPending} className="w-full" />
      </form>
    </Form>
  )
}
