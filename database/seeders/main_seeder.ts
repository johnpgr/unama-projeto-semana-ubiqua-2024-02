import { BaseSeeder } from "@adonisjs/lucid/seeders"

export default class extends BaseSeeder {
  private async runSeeder(seeder: { default: typeof BaseSeeder }) {
    await new seeder.default(this.client).run()
  }

  public async run() {
    await this.runSeeder(await import("./user_seeder.js"))
    await this.runSeeder(await import("./accommodation_seeder.js"))
    await this.runSeeder(await import("./address_seeder.js"))
    await this.runSeeder(await import("./reservation_seeder.js"))
  }
}

