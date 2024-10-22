import { BaseSchema } from "@adonisjs/lucid/schema"

export default class extends BaseSchema {
  protected tableName = "reservations"

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id")

      table.datetime("check_in").notNullable()
      table.datetime("check_out").notNullable()
      table.integer("total_price").notNullable()
      table.integer("total_guests").notNullable()
      table.enum("status", ["pending", "approved", "rejected"]).notNullable()
      table
        .integer("accommodation_id")
        .unsigned()
        .references("id")
        .inTable("accommodations")
        .onDelete("CASCADE")
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")

      table.timestamp("created_at")
      table.timestamp("updated_at")
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
