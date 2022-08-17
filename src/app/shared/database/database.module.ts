import { Module } from "@nestjs/common";
import * as env from "../../../environment";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../user/models/entities/user.model";
import { Product } from "../../product/models/entities/product.model";
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "mysql",
        host: env.DB_HOST,
        port: Number(env.DB_PORT),
        username: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
        entities: [Product, User],
        synchronize: true,
      })
    }),
  ],
})
export class DatabaseModule {}
