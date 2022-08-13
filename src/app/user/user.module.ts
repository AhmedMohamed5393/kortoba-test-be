import { UserService } from './service';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/entities/user.model';
import { UserServices } from './services/userService';
import { LoginMiddleware } from './utils/middlewares/loginMiddleware';
import { RegisterMiddleware } from './utils/middlewares/registerMiddleware';
@Module({
    imports: [JwtModule.register({ secret: 'super-secret' }), TypeOrmModule.forFeature([User])],
    controllers: [UserService],
    providers: [UserServices],
})
export class UserModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RegisterMiddleware).forRoutes({ path: "/api/user/register", method: RequestMethod.POST });
        consumer.apply(LoginMiddleware).forRoutes({ path: "/api/user/login", method: RequestMethod.POST });
    }
}
