import {Component, Inject} from '@nestjs/common';
import { RecoverPassEntity } from './recover-pass.entity';
import {MailService} from '../../services/mail.service';
import {User} from '../../users/user.entity';
import {UsersService} from '../../users/users.service';
import {TokenService} from '../../services/token.service';

@Component()
export class RecoverPassService {

  constructor(@Inject('RecoverPassRepository') private readonly recoverPassRepository: typeof RecoverPassEntity,
              private readonly mailService: MailService,
              private readonly userService: UsersService,
              private readonly tokenService: TokenService) {}


  async recoverPassByEmail(email: string): Promise<any> {
    const user: User = await this.userService.findByEmail(email);
    if (user) {
      const token = await this.tokenService.generateToken();
      await this.tokenService.create(user.id, token);
      await this.mailService.sendRecoverPassEmail(email, token);
      return {message: 'Mail was send.'};
    } else {
      return {error: 'User not found.'};
    }
  }

  async updateUserPassword(token: string, newPass: string): Promise<any> {
    const isTokenValid = await this.tokenService.isTokenValid(token);

    if (isTokenValid) {
      const userToken = await this.tokenService.findTokenByValue(token);

      await this.userService.updatePass(newPass, userToken.userId);

      return await this.tokenService.updateTokenStatus(token);
    } else {
      return null;
    }
  }

  async validate(token: string) {
    const isValid = await this.tokenService.isTokenValid(token);
    const isUsed = await this.tokenService.isTokenUsed(token);
    let message = {};

    if (!isValid) {
      message = {error: 'Token time is over.'};
    } else if (isUsed) {
      message = {error: 'Token is already used'};
    } else {
      message = {message: 'Token is valid'};
    }

    return message;
  }
}
