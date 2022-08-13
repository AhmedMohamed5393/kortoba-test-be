import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../../movie/models/entities/movie.model';
import { Category } from '../../category/models/entities/category.model';
import { User } from '../../user/models/entities/user.model';
import { Rate } from '../../rate/models/entities/rate.model';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [Category, User, Movie, Rate],
        synchronize: true,
      })
    }),
  ],
})
export class DatabaseModule {}
