import { ulid } from "ulid"
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
  type Relation,
} from "typeorm"
import Accommodation from "../accommodations/accommodation.entity"
import User from "../users/user.entity"

export const ReservationStatus = {
  Pending: "Pending",
  Approved: "Approved",
  Rejected: "Rejected",
} as const
export type ReservationStatus =
  (typeof ReservationStatus)[keyof typeof ReservationStatus]

@Entity()
export default class Reservation extends BaseEntity {
  @BeforeInsert()
  assignId() {
    this.id = ulid()
  }

  @PrimaryColumn()
  id: string

  @Column()
  checkIn: Date

  @Column()
  checkOut: Date

  @Column()
  totalGuests: number

  @Column({ type: "varchar" })
  status: ReservationStatus

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => Accommodation, (accommodation) => accommodation.reservations)
  accommodation: Relation<Accommodation>

  @ManyToOne(() => User, (user) => user.reservations)
  user: Relation<User>
}
