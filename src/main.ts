import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as env from "./environment";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import { SwaggerModule } from "@nestjs/swagger";
import { config } from "./documentation";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = env.PORT;
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.enableCors({
    methods: "GET, POST, PUT ,PATCH, DELETE, OPTIONS",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Content-Language, Accept, Authorization, token, Set-Cookie, Cookie",
    credentials: true,
  });
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(port);
}
bootstrap();
