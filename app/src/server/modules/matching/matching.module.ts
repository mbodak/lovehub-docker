import { Module } from '@nestjs/common';
import { MatchingController } from './matching.controller';
import {MatchingServiceComponent} from './matching.service';
import {UsersProfileModule} from '../api/users-profile/users-profile.module';
import {Match} from './matching.provider';
import {MongodbModule} from '../api/mongodb/mongodb.module';

@Module({
  imports: [UsersProfileModule, MongodbModule],
  controllers: [MatchingController],
  components: [MatchingServiceComponent, ...Match],
})
export class MatchingModule {}


