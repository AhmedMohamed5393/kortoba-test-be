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
const multer = require("multer");
@Module({
    imports: [JwtModule.register({ secret: "super-secret" }), TypeOrmModule.forFeature([Product]), MulterModule.register({ storage: memoryStorage(), dest: env.MULTER_DEST })],
    controllers: [ProductService],
    providers: [ProductServices],
})
export class ProductModule {
    private filestorageEngine = multer.diskStorage({
        destination: (req, file, cb) => { cb(null, env.MULTER_DEST); },
        filename:(req, file, cb) => { cb(null, file.originalname); }
    });
    private multerDest = multer({ storage: this.filestorageEngine }).single("image");
    private multerFields = multer().fields(["id", "title", "price", "image"]);
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(GetProductsMiddleware).forRoutes({ path: "/api/product", method: RequestMethod.GET });
        consumer.apply(GetDeleteProductMiddleware).forRoutes({ path: "/api/product/:id", method: RequestMethod.GET });
        consumer.apply(this.multerDest, this.multerFields, CreateProductMiddleware).forRoutes({ path: "/api/product", method: RequestMethod.POST });
        consumer.apply(this.multerDest, this.multerFields, UpdateProductMiddleware, CanEditMiddleware).forRoutes({ path: "/api/product", method: RequestMethod.PUT });
        consumer.apply(GetDeleteProductMiddleware, CanEditMiddleware).forRoutes({ path: "/api/product/:id", method: RequestMethod.DELETE });
    }
}
