import { User } from "../../../user/models/entities/user.model";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
@Entity()
export class Product {
  @PrimaryGeneratedColumn() id: number;
  @Column() title: string;
  @Column() image: string;
  @Column() price: number;
  @ManyToOne(type => User, user => { user.id, user.name }) user: User;
}
