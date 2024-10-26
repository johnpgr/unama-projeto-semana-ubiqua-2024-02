import { handlers } from "~/features/auth/auth"

export const runtime = "edge"
export const preferredRegion = "home"

export const { GET, POST } = handlers
