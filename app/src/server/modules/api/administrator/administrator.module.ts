import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AdministratorController } from './administrator.controller';
import { AdministratorProviders } from './administrator.providers';
import { AdministratorServiceComponent } from './administrator.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AdministratorController],
  components: [AdministratorServiceComponent, ...AdministratorProviders],
})
export class AdministratorModule {

}
