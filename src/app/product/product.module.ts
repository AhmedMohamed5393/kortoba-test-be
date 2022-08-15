import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { memoryStorage } from "multer";
import * as env from "../../environment";
import { Product } from "./models/entities/product.model";
import { ProductService } from "./service";
import { ProductServices } from "./services/productService";
import { CanEditMiddleware } from "./utils/middlewares/canEditMiddleware";
import { CreateProductMiddleware } from "./utils/middlewares/createProductMiddleware";
import { GetDeleteProductMiddleware } from "./utils/middlewares/getDeleteProductMiddleware";
import { GetProductsMiddleware } from "./utils/middlewares/getProductsMiddleware";
import { UpdateProductMiddleware } from "./utils/middlewares/updateProductMiddleware";
@Module({
    imports: [JwtModule.register({ secret: "super-secret" }), TypeOrmModule.forFeature([Product]), MulterModule.register({ storage: memoryStorage(), dest: env.MULTER_DEST })],
    controllers: [ProductService],
    providers: [ProductServices],
})
export class ProductModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(GetProductsMiddleware).forRoutes({ path: "/api/product", method: RequestMethod.GET });
        consumer.apply(GetDeleteProductMiddleware).forRoutes({ path: "/api/product/:id", method: RequestMethod.GET });
        consumer.apply(CreateProductMiddleware).forRoutes({ path: "/api/product", method: RequestMethod.POST });
        consumer.apply(UpdateProductMiddleware, CanEditMiddleware).forRoutes({ path: "/api/product", method: RequestMethod.PUT });
        consumer.apply(GetDeleteProductMiddleware, CanEditMiddleware).forRoutes({ path: "/api/product/:id", method: RequestMethod.DELETE });
    }
}
