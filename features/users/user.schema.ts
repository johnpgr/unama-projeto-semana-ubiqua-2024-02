import { relations, sql } from "drizzle-orm"
import { primaryKey, sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { Reservation } from "../reservations/reservation.schema"
import { ulid } from "~/lib/ulid"
import { AdapterAccountType } from "next-auth/adapters"

export type UserRole = (typeof UserRole)[keyof typeof UserRole]
export const UserRole = {
  Admin: "Admin",
  User: "User",
} as const

export type User = typeof User.$inferSelect
export const User = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => ulid()),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  hashedPassword: text("hashedPassword"),
  emailVerified: integer("email_verified", { mode: "timestamp_ms" }),
  image: text("image"),
  role: text("role").notNull().default(UserRole.Admin),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
})

export const UsersRelations = relations(User, ({ many }) => ({
  reservations: many(Reservation),
  sessions: many(Session),
  accounts: many(Account),
}))

export type Account = typeof Account.$inferSelect
export const Account = sqliteTable(
  "accounts",
  {
    userId: text("userId")
      .notNull()
      .references(() => User.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const AccountRelations = relations(Account, ({ one }) => ({
  user: one(User, {
    fields: [Account.userId],
    references: [User.id],
  }),
}))

export type Session = typeof Session.$inferSelect
export const Session = sqliteTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
})

export const SessionRelations = relations(Session, ({ one }) => ({
  user: one(User, {
    fields: [Session.userId],
    references: [User.id],
  }),
}))

export type VerificationToken = typeof VerificationToken.$inferSelect
export const VerificationToken = sqliteTable(
  "verification_tokens",
  {
    identifier: text("identifier")
      .notNull()
      .$defaultFn(() => ulid()),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)
