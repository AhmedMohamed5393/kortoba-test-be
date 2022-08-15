import { Module } from "@nestjs/common";
import { AppController } from "./app.component";
import { DatabaseModule } from "./app/shared/database/database.module";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { UserModule } from "./app/user/user.module";
import { ProductModule } from "./app/product/product.module";
@Module({
    imports: [
        UserModule,
        ProductModule,
        DatabaseModule,
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.number().required(),
                DB_USER: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_NAME: Joi.string().required(),
                PORT: Joi.number(),
            }),
        }),
    ],
    controllers: [AppController],
})
export class AppModule {}
