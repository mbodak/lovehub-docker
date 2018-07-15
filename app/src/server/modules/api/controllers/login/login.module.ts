import {Module, NestModule, RequestMethod} from '@nestjs/common';
import { LoginController} from './login.controller';
import { LoginService} from './login.service';
import { LoginValidateService } from './login-validate.service';
import {MiddlewaresConsumer} from '@nestjs/common/interfaces/middlewares';
import { LoginMiddleware } from '../../../common/middlewares/login.middleware';
import { usersProviders} from '../../users/users.providers';
import { UsersService} from '../../users/users.service';
import {usersProfileProviders} from '../../users-profile/users-profile.providers';
import { UsersProfileService} from '../../users-profile/users-profile.service';

@Module({
  controllers: [LoginController],
  components: [LoginValidateService, LoginService,
  UsersService, ...usersProviders]
})
export class LoginModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(LoginMiddleware).forRoutes(
      {path: 'api/login', method: RequestMethod.POST}
    );
  }
}

