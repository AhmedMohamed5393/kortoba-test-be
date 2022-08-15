import { Product } from "../../../product/models/entities/product.model";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column() email: string;
  @Column() password: string;
  @Column() birthdate: string;
  @OneToMany(type => Product, product => { product.id, product.title, product.price }) product: Product[];
}
