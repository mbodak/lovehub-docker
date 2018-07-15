import { Module } from '@nestjs/common';
import { HomepageController } from './homepage.controller';

@Module({
  imports: [],
  controllers: [HomepageController],
  components: [],
})
export class HomepageModule {}
