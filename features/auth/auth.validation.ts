import { z } from "zod"

export type LoginSchema = z.infer<typeof LoginSchema>
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email invalido.",
  }),
  password: z.string().min(1, {
    message: "Insira uma senha.",
  }),
  callbackUrl: z.string().optional(),
})
export type RegisterSchema = z.infer<typeof RegisterSchema>
export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email invalido.",
  }),
  password: z
    .string()
    .min(1, {
      message: "Insira uma senha.",
    })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%]{8,}$/, {
      message:
        "A senha deve ter pelo menos 8 caracteres, conter pelo menos uma letra e um número.",
    }),
  name: z
    .string()
    .min(1, {
      message: "Insira um nome.",
    })
    .max(32, {
      message: "Nome muito longo.",
    })
    .regex(/^[A-Za-z_\.]+$/, {
      message: "Nome deve conter apenas letras, pontos ou underline.",
    }),
  callbackUrl: z.string().optional(),
})
