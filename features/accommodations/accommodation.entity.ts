import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  type Relation,
  UpdateDateColumn,
} from "typeorm"
import { ulid } from "ulid"
import Reservation from "../reservations/reservation.entity"
import Address from "../addresses/address.entity"

export const AccommodationType = {
  Hotel: "Hotel",
  Hostel: "Hostel",
  Resort: "Resort",
  Ship: "Ship",
  Adapted: "Adapted",
} as const

export type AccommodationType =
  (typeof AccommodationType)[keyof typeof AccommodationType]

@Entity()
export default class Accommodation extends BaseEntity {
  @BeforeInsert()
  assignId() {
    this.id = ulid()
  }

  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column({ type: "varchar" })
  type: AccommodationType

  @Column()
  capacity: number

  @Column()
  price: number

  @Column({ type: "decimal", scale: 1, precision: 1 })
  rating: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => Reservation, (reservation) => reservation.accommodation)
  reservations: Relation<Reservation>

  @OneToOne(() => Address, { eager: true })
  @JoinColumn()
  address: Relation<Address>
}
