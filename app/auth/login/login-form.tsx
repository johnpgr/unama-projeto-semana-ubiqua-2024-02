"use client"

import React, { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Checkbox } from "~/components/ui/checkbox"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "next/navigation"
import { z } from "zod"
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

export function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")
  const urlError =
    searchParams.get("error") === "OAuthAccontNotLinked"
      ? "Seu email já esta em uso em outra conta!"
      : ""

  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const [result, setResult] = React.useState({
    message: "",
    success: false,
  })
  const [isPending, startTransition] = React.useTransition()
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      callbackUrl: callbackUrl || "",
    },
  })

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      loginAction(data).then((res) => {
        if (res?.data) {
          setResult(res.data)
        } else {
          setResult({
            success: false,
            message:
              "Ocorreu um erro inesperado ao fazer login. Tente novamente mais tarde",
          })
        }
        form.reset()
      })
    })
  }

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
        <div className="text-center text-red-500">{urlError}</div>
        <div>
          {result.success ? (
            <div className="text-green-500">{result.message}</div>
          ) : (
            <div className="text-red-500">{result.message}</div>
          )}
        </div>
      </form>
    </Form>
  )
}
