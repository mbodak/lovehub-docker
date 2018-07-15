import { Controller, Body, Param, Get, Post, Patch } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';

import { AdministratorServiceComponent } from './administrator.service';

@Controller('api/administrator')
export class AdministratorController {

  constructor(private readonly administratorService: AdministratorServiceComponent) {
  }

  @Get('')
  async getStatitstics() {
    return await this.administratorService.collectSiteStatistics();
  }

  @Get(':id')
  async getUser(@Param('id', new ParseIntPipe()) id) {
    await this.administratorService.getUser(id);

    return this.administratorService.currentUser;
  }

  @Post('')
  async getUsers(@Body() getUsersEnquiryDto) {
    return await this.administratorService.manageUsersList(getUsersEnquiryDto);
  }

  @Patch('')
  async updateUsers(@Body() updateUsersEnquiryDto) {
    return await this.administratorService.updateUsersList(updateUsersEnquiryDto);
  }

}
