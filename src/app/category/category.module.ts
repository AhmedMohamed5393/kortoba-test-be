import { CategoryService } from './service';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './models/entities/category.model';
import { CategoryServices } from './services/categoryService';
import { RolesGuard } from '../shared/guards/role.guard';
import { GetCategoriesMiddleware } from './utils/middlewares/getCategoriesMiddleware';
import { GetDeleteCategoryMiddleware } from './utils/middlewares/getDeleteCategoryMiddleware';
import { CreateCategoryMiddleware } from './utils/middlewares/createCategoryMiddleware';
import { UpdateCategoryMiddleware } from './utils/middlewares/updateCategoryMiddleware';
import { APP_GUARD } from '@nestjs/core';
@Module({
    imports: [JwtModule.register({ secret: 'super-secret' }), TypeOrmModule.forFeature([Category])],
    controllers: [CategoryService],
    providers: [CategoryServices, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class CategoryModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(GetCategoriesMiddleware).forRoutes({ path: "/api/category", method: RequestMethod.GET });
        consumer.apply(GetDeleteCategoryMiddleware).forRoutes({ path: "/api/category/:id", method: RequestMethod.GET });
        consumer.apply(CreateCategoryMiddleware).forRoutes({ path: "/api/category", method: RequestMethod.POST });
        consumer.apply(UpdateCategoryMiddleware).forRoutes({ path: "/api/category", method: RequestMethod.PUT });
        consumer.apply(GetDeleteCategoryMiddleware).forRoutes({ path: "/api/category/:id", method: RequestMethod.DELETE });
    }
}
