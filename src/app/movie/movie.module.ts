import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { memoryStorage } from 'multer';
import * as env from "../../environment";
import { RolesGuard } from '../shared/guards/role.guard';
import { Movie } from './models/entities/movie.model';
import { MovieService } from './service';
import { MovieServices } from './services/movieService';
import { CreateMovieMiddleware } from './utils/middlewares/createMovieMiddleware';
import { GetDeleteMovieMiddleware } from './utils/middlewares/getDeleteMovieMiddleware';
import { GetMoviesMiddleware } from './utils/middlewares/getMoviesMiddleware';
import { UpdateMovieMiddleware } from './utils/middlewares/updateMovieMiddleware';
@Module({
    imports: [
        JwtModule.register({ secret: 'super-secret' }),
        MulterModule.register({ storage: memoryStorage(), dest: env.MULTER_DEST }),
        TypeOrmModule.forFeature([Movie]),
    ],
    controllers: [MovieService],
    providers: [MovieServices, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class MovieModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(GetMoviesMiddleware).forRoutes({ path: "/api/movie", method: RequestMethod.GET });
        consumer.apply(GetDeleteMovieMiddleware).forRoutes({ path: "/api/movie/:id", method: RequestMethod.GET });
        consumer.apply(CreateMovieMiddleware).forRoutes({ path: "/api/movie", method: RequestMethod.POST });
        consumer.apply(UpdateMovieMiddleware).forRoutes({ path: "/api/movie", method: RequestMethod.PUT });
        consumer.apply(GetDeleteMovieMiddleware).forRoutes({ path: "/api/movie/:id", method: RequestMethod.DELETE });
    }
}
