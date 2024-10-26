"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, EyeOff, Eye, Lock } from "lucide-react"
import { useSearchParams } from "next/navigation"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { registerAction } from "~/features/auth/auth.actions"
import { RegisterSchema } from "~/features/auth/auth.validation"
import { PendingButton } from "~/components/pending-btn"
import { Checkbox } from "~/components/ui/checkbox"
import { toast } from "sonner"
import Link from "next/link"
import { useServerAction } from "zsa-react"

export function RegisterForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const {execute, isPending} = useServerAction(registerAction, {
    onError: ({err}) => toast.error("Erro ao registrar", {description: err.message}),
  })

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      callbackUrl: callbackUrl || "",
    },
    mode: "onChange",
  })

  const onSubmit = async (data: RegisterSchema) => {
    await execute(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Seu nome" required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <div className="flex items-center gap-2 text-sm">
          <Checkbox />
          <span>
            Eu concordo com os{" "}
            <Link href="#" className="text-primary font-medium">
              termos e condições
            </Link>
          </span>
        </div>
        <PendingButton
          isPending={isPending}
          text="Registrar"
          className="w-full"
        />
      </form>
    </Form>
  )
}
