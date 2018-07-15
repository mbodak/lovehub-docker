import { Controller, Get, Post, Delete, Body } from '@nestjs/common';


class User {
  login: string;
  email: string;
  User(login: string, email: string) {
    this.login = login;
    this.email = email;
  }
}

@Controller('api')
export class ApiController {

  @Get('')
  root() {

    return {
      message: 'Hello World!',
    };
  }
  @Post('user')
  registration(@Body() user: User) {

    return {
      message: `user: ${user.login}, email: ${user.email}`,
    };
  }
  @Delete('user')
  deleteUser() {

    return {
      message: 'user deleted!',
    };
  }
}
