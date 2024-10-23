import {
  OneToMany,
  BaseEntity,
  Column,
  PrimaryColumn,
  type Relation,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  Entity,
} from "typeorm"
import Reservation from "../reservations/reservation.entity"
import { ulid } from "ulid"

@Entity()
export default class User extends BaseEntity {
  @BeforeInsert()
  assignId() {
    this.id = ulid()
  }

  @PrimaryColumn()
  id: string

  @Column({ nullable: true })
  fullName?: string

  @Column()
  email: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Relation<Reservation>
}
