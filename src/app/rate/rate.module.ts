import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from '../shared/guards/role.guard';
import { Rate } from './models/entities/rate.model';
import { RateService } from './service';
import { RateServices } from './services/rateService';
import { UpdateRateMiddleware } from './utils/middlewares/updateRateMiddleware';
@Module({
    imports: [JwtModule.register({ secret: 'super-secret' }), TypeOrmModule.forFeature([Rate])],
    controllers: [RateService],
    providers: [RateServices, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class RateModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UpdateRateMiddleware).forRoutes({ path: "/api/rate", method: RequestMethod.PUT });
    }
}
