import { BaseSchema } from "@adonisjs/lucid/schema"

export default class extends BaseSchema {
  protected tableName = "addresses"

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string("id").primary().notNullable()

      table.string("street").notNullable()
      table.string("city").notNullable()
      table.string("postal_code").notNullable()
      table
        .integer("accommodation_id")
        .unsigned()
        .references("id")
        .inTable("accommodations")
        .onDelete("CASCADE")
      table.timestamp("created_at", { useTz: true })
      table.timestamp("updated_at", { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
