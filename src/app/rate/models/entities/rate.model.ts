import { User } from '../../../user/models/entities/user.model';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Movie } from '../../../movie/models/entities/movie.model';
@Entity()
export class Rate {
  @PrimaryGeneratedColumn() id: number;
  @Column() value: number;
  @ManyToOne(type => Movie, movie => movie.id) movie: Movie;
  @ManyToOne(type => User, user => user.id) user: User;
}
