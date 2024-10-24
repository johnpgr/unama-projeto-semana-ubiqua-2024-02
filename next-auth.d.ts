import { AdapterSession } from "next-auth/adapters"
import { UserRole } from "./database/schema"
import { User } from "next-auth"

declare module "next-auth" {
  interface Session extends AdapterSession {
    user?: {
      id: string
      name: string
      email: string
      role: UserRole
      image?: string
    }
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    role: UserRole
  }
}
