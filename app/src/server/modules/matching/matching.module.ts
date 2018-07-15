import { Module } from '@nestjs/common';
import { MatchingController } from './matching.controller';
import {MatchingServiceComponent} from './matching.service';
import {UsersProfileModule} from '../api/users-profile/users-profile.module';

@Module({
  imports: [UsersProfileModule],
  controllers: [MatchingController],
  components: [MatchingServiceComponent],
})
export class MatchingModule {}


