import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AdministratorController } from './administrator.controller';
import { AdministratorProviders } from './administrator.providers';
import { AdministratorServiceComponent } from './administrator.service';
import { MailService } from '../services/mail.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AdministratorController],
  components: [AdministratorServiceComponent, MailService, ...AdministratorProviders],
})
export class AdministratorModule {

}
