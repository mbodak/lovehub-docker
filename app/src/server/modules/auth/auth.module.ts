import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { AuthMiddleware } from '../common/middlewares/auth.middleware';;
import { UsersModule } from '../api/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  components: [AuthService],
  modules: [],
  exports: [],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes(
      {path: 'api/users-profile', method: RequestMethod.GET},
      {path: 'api/users-profile', method: RequestMethod.PUT},
    );
  }
}
