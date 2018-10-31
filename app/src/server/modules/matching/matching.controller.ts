import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MatchingServiceComponent } from './matching.service';
import { UserProfileDto } from '../api/users-profile/dto/user-profile.dto';

@Controller('api/matching')
export class MatchingController {
  constructor(private matchingService: MatchingServiceComponent) {}
  @Post('/')
  async matching(@Query('id') id: number, @Query('preference') preference) {

    return await this.matchingService.matchUsers(id, preference);
  }

  @Post('/unlike/:id')
  async matchUnlike(@Body() user: UserProfileDto, @Param('id') id) {
    return await this.matchingService.unlikeUsers(user, id);
  }

  @Post('/like/:id')
  async matchLike(@Body() user: UserProfileDto, @Param('id') id) {
    return await this.matchingService.unlikeUsers(user, id);
  }
}

