import { Controller, HttpCode, Param, Body, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { User } from './User';
import { UsersServiceComponent } from './users.service';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersServiceComponent) {}

  @HttpCode(201)
  @Post()
  create(@Body() user: CreateUserDto) {
    this.usersService.create(user as User);
  }

  @Get()
  findAll(): Observable<User[]> {
    return of(this.usersService.findAll());
  }

  @Get(':id')
  findOne(@Param() params): Observable<User> {
    console.log(params.id);
    return of(new User());
  }
}
