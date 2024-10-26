import { createInsertSchema } from "drizzle-zod"
import { Address } from "./address.schema"

export const AddressInsertSchema = createInsertSchema(Address)
