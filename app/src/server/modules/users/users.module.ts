import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersServiceComponent } from './users.service';

@Module({
  controllers: [UsersController],
  components: [UsersServiceComponent],
})
export class UsersModule {}
