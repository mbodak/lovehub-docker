import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { UsersModule } from './users/users.module';
import { UsersProfileModule } from './users-profile/users-profile.module';
import { LoginModule } from './controllers/login/login.module';
import { RecoverPassModule } from './controllers/recover-password/recover-pass.module';
import {AdministratorModule} from './administrator/administrator.module';

@Module({
  imports: [LoginModule, UsersModule, UsersProfileModule,
  RecoverPassModule, AdministratorModule],
  controllers: [ApiController],
  components: [],
})
export class ApiModule {}
