import { Category } from '../../../category/models/entities/category.model';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Rate } from '../../../rate/models/entities/rate.model';
@Entity()
export class Movie {
  @PrimaryGeneratedColumn() id: number;
  @Column() title: string;
  @Column() image: string;
  @ManyToOne(type => Category, category => { category?.id, category?.title }) @JoinColumn() category?: Category;
  @Column() description: string;
  @OneToMany(type => Rate, rate => { rate?.id, rate?.value }) @JoinColumn() rate?: Rate[];
}
