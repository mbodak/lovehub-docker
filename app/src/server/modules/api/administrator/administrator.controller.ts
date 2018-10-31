import { Controller, Body, Param, Get, Post, Patch } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';

import { AdministratorServiceComponent } from './administrator.service';

@Controller('api/administrator')
export class AdministratorController {

  constructor(private readonly administratorService: AdministratorServiceComponent) {
  }

  @Get('get-user/:id')
  async getUser(@Param('id', new ParseIntPipe()) id) {
    await this.administratorService.getUser(id);
    return this.administratorService.currentUser;
  }

  @Get('search/:input')
  async getSearchResults(@Param('input') input) {
    return await this.administratorService.getSearchResults(input);
  }

  @Get('get-hints-for-email/:input')
  async getHints(@Param('input') input) {
    return await this.administratorService.getHints(input);
  }

  @Get('get-statistics')
  async getStatistics() {
    return await this.administratorService.collectSiteStatistics();
  }

  @Post('get-users')
  async getUsers(@Body() getUsersEnquiryDto) {
    return await this.administratorService.manageUsersList(getUsersEnquiryDto);
  }

  @Post('send-email')
  async sendEmail(@Body() emailDto) {
    await this.administratorService.sendEmail(emailDto).then(() => {
      return ('Mail processed');
    });
  }

  @Patch('update-users')
  async updateUsers(@Body() updateUsersEnquiryDto) {
    return await this.administratorService.updateUsersList(updateUsersEnquiryDto);
  }

}
