import { Module } from '@nestjs/common';
import { AppController } from './app.component';
import { DatabaseModule } from './app/shared/database/database.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { UserModule } from './app/user/user.module';
import { CategoryModule } from './app/category/category.module';
import { MovieModule } from './app/movie/movie.module';
import { RateModule } from './app/rate/rate.module';
@Module({
    imports: [
        UserModule,
        CategoryModule,
        MovieModule,
        RateModule,
        DatabaseModule,
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                POSTGRES_HOST: Joi.string().required(),
                POSTGRES_PORT: Joi.number().required(),
                POSTGRES_USER: Joi.string().required(),
                POSTGRES_PASSWORD: Joi.string().required(),
                POSTGRES_DB: Joi.string().required(),
                PORT: Joi.number(),
            }),
        }),
    ],
    controllers: [AppController],
})
export class AppModule {}
