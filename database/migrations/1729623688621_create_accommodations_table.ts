import { BaseSchema } from "@adonisjs/lucid/schema"

export default class extends BaseSchema {
  protected tableName = "accommodations"

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id")

      table.string("name").notNullable()
      table
        .enum("type", ["hotel", "hostel", "resort", "ship", "adapted"])
        .notNullable()
      table.integer("capacity").notNullable()
      table.integer("price").notNullable()
      table.integer("rating").nullable()

      table.timestamp("created_at")
      table.timestamp("updated_at")
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
