import { User as NextAuthUser } from "next-auth"
import {JWT as NextAuthJWT} from "next-auth/jwt"
import { UserRole } from "./database/schema"

interface User extends NextAuthUser {
  id: string
  name: string
  email: string
  role: UserRole
  isTwoFactorEnabled: boolean
  isOAuth: boolean
}

declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    email: string
    name: string
    role: UserRole
    isOAuth: boolean
  }
}

declare module "next-auth" {
  interface Session {
    user?: User
  }
}
