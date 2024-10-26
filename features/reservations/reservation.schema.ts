import { relations, sql } from "drizzle-orm"
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { User } from "../users/user.schema"
import { Accommodation } from "../accommodations/accommodation.schema"
import { ulid } from "~/lib/ulid"

export const ReservationStatus = {
  Pending: "Pending",
  Approved: "Approved",
  Rejected: "Rejected",
} as const
export type ReservationStatus =
  (typeof ReservationStatus)[keyof typeof ReservationStatus]

export type InsertReservation = typeof Reservation.$inferInsert
export type Reservation = typeof Reservation.$inferSelect

export const Reservation = sqliteTable("reservations", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => ulid()),
  checkIn: integer("check_in", { mode: "timestamp" }).notNull(),
  checkOut: integer("check_out", { mode: "timestamp" }).notNull(),
  totalGuests: integer("total_guests").notNull(),
  status: text("status").$type<ReservationStatus>().notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  accommodationId: text("accommodation_id").references(() => Accommodation.id),
  userId: text("user_id").references(() => User.id),
})

export const ReservationsRelations = relations(Reservation, ({ one }) => ({
  user: one(User, {
    fields: [Reservation.userId],
    references: [User.id],
  }),
  accommodation: one(Accommodation, {
    fields: [Reservation.accommodationId],
    references: [Accommodation.id],
  }),
}))
