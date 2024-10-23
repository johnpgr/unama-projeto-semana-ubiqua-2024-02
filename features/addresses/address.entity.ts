import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  OneToOne,
  PrimaryColumn,
  type Relation,
  UpdateDateColumn,
  Entity,
} from "typeorm"
import { ulid } from "ulid"
import Accommodation from "../accommodations/accommodation.entity"

@Entity()
export default class Address extends BaseEntity {
  @BeforeInsert()
  private assignId() {
    this.id = ulid()
  }

  @PrimaryColumn()
  id: string

  @Column()
  street: string

  @Column()
  city: string

  @Column()
  postalCode: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToOne(() => Accommodation)
  accommodation: Relation<Accommodation>
}
