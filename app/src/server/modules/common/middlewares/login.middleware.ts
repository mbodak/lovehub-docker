import {Middleware, NestMiddleware, ExpressMiddleware, Inject} from '@nestjs/common';
import { LoginValidateService } from '../../api/controllers/login/login-validate.service';
import {MessageCodeError} from '../error/MessageCodeError';

@Middleware()
export class LoginMiddleware implements NestMiddleware {
  constructor(@Inject('LoginValidateService') private logValidator: LoginValidateService) {}
  resolve(...ags: any[]): ExpressMiddleware {
    return (req, res, next) => {
        const {email, password} = req.body;
        if (!this.logValidator.validateEmail(email)) {
          throw new MessageCodeError('login:login:notValidEmail');
        } else if(!this.logValidator.validatePassword(password)) {
          throw new MessageCodeError('login:login:notValidPassword');
        } else {
          next();
        }
    };
  }
}
