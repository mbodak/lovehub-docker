import * as jwt from 'jsonwebtoken';

import { Component, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { IAuthService, IJwtOptions } from './interfaces/IAuthService';
import { User } from '../api/users/user.entity';
import { UsersService } from '../api/users/users.service';
import { UserProfile } from '../api/users-profile/user-profile.entity';
import { MessageCodeError } from '../common/error/MessageCodeError';

const crypto = require('crypto');

@Component()
export class AuthService implements IAuthService {
  options: IJwtOptions = {
    algorithm: 'HS256',
    expiresIn: '15m',
    jwtid: process.env.JWT_ID || '1',
  };

  public async sign(credentials: { email: string, password: string }): Promise<string> {
    const user = await User.findOne({
      where: {
        email: credentials.email,
        password: crypto.createHmac('sha256', credentials.password).digest('hex')
      },
      include: [{
        model: UserProfile,
        // where: {
        //   [Sequelize.Op.not]: [{isBaned: true}]
        // }
      }]
    });

    if (!user) {
      throw new MessageCodeError('request:unauthorized');
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    UserProfile.update({lastActiveDate: Date.now()}, {where: {id: user.id}});

    return await jwt.sign(payload, process.env.JWT_KEY || 'secretKey', this.options);
  }
}
