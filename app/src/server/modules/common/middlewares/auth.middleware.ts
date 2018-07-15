import * as jwt from 'jsonwebtoken';
import { ExpressMiddleware, Middleware, NestMiddleware } from '@nestjs/common';
import { AsyncExpressMiddleware } from '@nestjs/common/interfaces';
import { Request, Response, NextFunction } from 'express';
import { User } from '../../api/users/user.entity';
import { MessageCodeError } from '../error/MessageCodeError';

@Middleware()
export class AuthMiddleware implements NestMiddleware {

  constructor() {}

  public resolve(...args: any[]): ExpressMiddleware | AsyncExpressMiddleware | Promise<AsyncExpressMiddleware> {
    return async(req: Request, res: Response, next: NextFunction) => {
      if(req.headers.authorization && ((req.headers.authorization as string).split(' ')[0]) === 'Bearer') {
        let token = (req.headers.authorization as string).split(' ')[1],
          decoded: any,
          user: User;

        try {
          decoded = jwt.verify(token, process.env.JWT_KEY || 'secretKey');
        } catch(err) {
          throw new MessageCodeError('request:unauthorized');
        }

        console.log(`AuthMiddleware decoded object: ${decoded}`);
        if(decoded) {
          user = await User.findOne<User>({
            where: {
              email: decoded.email
            }
          });

          req['id'] = decoded.id;
        }

        console.log('AuthMiddleware ' + user.name);
        if (!user) {
          throw new MessageCodeError('request:unauthorized');
        }

        next();
      } else {
        throw new MessageCodeError('request:unauthorized');
      }
    }
  }
}
