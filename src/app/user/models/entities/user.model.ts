import { Rate } from '../../../rate/models/entities/rate.model';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;
  @Column() role: string;
  @Column() name: string;
  @Column() email: string;
  @Column() password: string;
  @Column() birthdate: string;
  @OneToMany(type => Rate, rate => rate.id) rate: Rate[];
}
