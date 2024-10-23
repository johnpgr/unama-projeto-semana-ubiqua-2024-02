export class BaseSeeder {
  async run(): Promise<void> { }
}

export class DatabaseSeeder extends BaseSeeder {
  private async runSeeder(seeder: { default: typeof BaseSeeder }) {
    await new seeder.default().run()
  }

  public async run() {
    await this.runSeeder(await import("../features/users/user.seeder"))
    await this.runSeeder(await import("../features/addresses/address.seeder"))
    await this.runSeeder(await import("../features/accommodations/accommodation.seeder"))
    await this.runSeeder(await import("../features/reservations/reservation.seeder"))
  }
}
