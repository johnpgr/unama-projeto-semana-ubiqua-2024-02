import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { Address } from "./address.schema";

export const addressInsertSchema = createInsertSchema(Address)
export const addressSelectSchema = createSelectSchema(Address)
