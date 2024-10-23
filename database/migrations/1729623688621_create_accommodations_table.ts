import { AccommodationType } from "#models/accommodation"
import { BaseSchema } from "@adonisjs/lucid/schema"

export default class extends BaseSchema {
  protected tableName = "accommodations"

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string("id").primary().notNullable()

      table.string("name").notNullable()
      table.enum("type", Object.values(AccommodationType)).notNullable()
      table.integer("capacity").notNullable()
      table.integer("price").notNullable()
      table.integer("rating").notNullable().defaultTo(0)

      table.timestamp("created_at")
      table.timestamp("updated_at")
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
