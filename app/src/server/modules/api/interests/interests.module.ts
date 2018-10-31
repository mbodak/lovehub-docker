import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { InterestsGateway } from './interests.gateway';
import { InterestsProviders } from './interests.providers';
import { InterestsServiceComponent } from './interests.service';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  components: [InterestsGateway, InterestsServiceComponent, ...InterestsProviders],
})
export class InterestsModule {

}
