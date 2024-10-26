import { relations, sql } from "drizzle-orm"
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core"
import { Address } from "../addresses/address.schema"
import { Reservation } from "../reservations/reservation.schema"
import { ulid } from "~/lib/ulid"

export const AccommodationType = {
  Hotel: "Hotel",
  Hostel: "Hostel",
  Resort: "Resort",
  Ship: "Ship",
  Adapted: "Adapted",
} as const
export type AccommodationType =
  (typeof AccommodationType)[keyof typeof AccommodationType]

export type InsertAccommodation = typeof Accommodation.$inferInsert
export type Accommodation = typeof Accommodation.$inferSelect

export const Accommodation = sqliteTable("accommodations", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => ulid()),
  name: text("name").notNull(),
  type: text("type").$type<AccommodationType>().notNull(),
  capacity: integer("capacity").notNull(),
  price: real("price").notNull(),
  rating: real("rating").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  addressId: text("address_id")
    .references(() => Address.id)
    .unique(),
})

export const AccommodationsRelations = relations(
  Accommodation,
  ({ one, many }) => ({
    address: one(Address, {
      fields: [Accommodation.addressId],
      references: [Address.id],
    }),
    reservations: many(Reservation),
  })
)
