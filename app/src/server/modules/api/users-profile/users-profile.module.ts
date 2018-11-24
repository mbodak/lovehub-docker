import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersProfileController } from './users-profile.controller';
import { usersProfileProviders } from './users-profile.providers';
import { likesProvider } from './users-profile.providers';
import { UsersProfileService } from './users-profile.service';
import { UsersModule } from '../users/users.module';
import {UserProfileProvider} from "./user-profile.provider";
import {MongodbModule} from "../mongodb/mongodb.module";

@Module({
  imports: [DatabaseModule, UsersModule, MongodbModule],
  controllers: [UsersProfileController],
  components: [UsersProfileService, ...usersProfileProviders, ...UserProfileProvider,...likesProvider],
  exports: [UsersProfileService]
})
export class UsersProfileModule {}
