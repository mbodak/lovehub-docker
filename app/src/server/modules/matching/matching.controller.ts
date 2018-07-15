import {Controller, Get, Query} from '@nestjs/common';
import {MatchingServiceComponent} from './matching.service';

@Controller('api/matching')
export class MatchingController {
  constructor(private matchingService: MatchingServiceComponent) {}
  @Get()
  matching(@Query('preference') preference) {

    return this.matchingService.matchUsers(preference);
  }
}

