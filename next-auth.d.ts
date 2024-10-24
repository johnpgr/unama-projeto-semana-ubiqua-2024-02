import { AdapterSession } from "next-auth/adapters"
import { UserRole } from "./database/schema";

declare module "next-auth" {
  interface Session extends AdapterSession {
    user?: { id: string; role: UserRole }
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    role: UserRole
  }
}
