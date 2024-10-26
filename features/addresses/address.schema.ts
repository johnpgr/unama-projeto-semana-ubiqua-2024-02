import { relations, sql } from "drizzle-orm"
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { Accommodation } from "../accommodations/accommodation.schema"
import { ulid } from "ulid"

export type InsertAddress = typeof Address.$inferInsert
export type Address = typeof Address.$inferSelect

export const Address = sqliteTable("addresses", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => ulid()),
  street: text("street").notNull(),
  city: text("city").notNull(),
  postalCode: text("postal_code").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
})

export const AddressesRelations = relations(Address, ({ one }) => ({
  accommodation: one(Accommodation, {
    fields: [Address.id],
    references: [Accommodation.addressId],
  }),
}))
