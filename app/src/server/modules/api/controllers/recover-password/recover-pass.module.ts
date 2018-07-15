import {Module} from '@nestjs/common';
import { RecoverPassService} from './recover-pass.service';
import {RecoverPassController} from './recover-pass.controller';
import { recoverPassProviders } from './recover-pass.providers';
import { MailService } from '../../services/mail.service';
import { usersProviders} from '../../users/users.providers';
import { UsersService} from '../../users/users.service';
import { TokenService } from '../../services/token.service';

@Module({
  controllers: [RecoverPassController],
  components: [RecoverPassService, ...recoverPassProviders, MailService,
  UsersService, ...usersProviders, TokenService]
})

export class RecoverPassModule {}
