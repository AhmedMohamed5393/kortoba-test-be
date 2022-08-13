import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import * as env from "./environment";
import { SwaggerModule } from "@nestjs/swagger";
import { config } from "./documentation";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = env.PORT;
  app.use(cookieParser());
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(port);
}
bootstrap();
