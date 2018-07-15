import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req, UseFilters } from '@nestjs/common';
import { UserProfileDto } from './dto/user-profile.dto';
import { UsersProfileService } from './users-profile.service';
import { UserProfile } from './user-profile.entity';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';

import * as jwt from 'jsonwebtoken';
import {UsersService} from '../users/users.service';

export interface FilteredUsersProfile {
  rows?: UserProfile[];
  count?: number;
}


@Controller('api/users-profile')
export class UsersProfileController {

  constructor(
    private readonly usersProfileService: UsersProfileService,
    private readonly usersService: UsersService
    ) {}

  @HttpCode(201)
  @Post()
  async create(@Body() userProfileDto: UserProfileDto): Promise<UserProfileDto> {
    return await this.usersProfileService.create(userProfileDto);
  }

  @Put()
  async update(@Req() req, @Body() userProfileDto: UserProfileDto) {
    const userId = req.id,
      user = await this.usersService.findById(req.id);

    if(user.userProfile.id) {
      return await this.usersProfileService.update(user.userProfile.id, userProfileDto);
    } else {
      return await this.usersProfileService.create({...userProfileDto, ...{ userId }});
    }
  }

  @HttpCode(200)
  @Get(':id')
  async findByUserId(@Param() params): Promise<UserProfile> {
    return await this.usersProfileService.findByUserId(params.id);
  }

  @HttpCode(200)
  @Get()
  async findAll(@Query() queries): Promise<FilteredUsersProfile> {
    const key = Object.keys(queries)[0];
    if (key === 'name') {
      console.log(`server controller: findByName(${queries.name})`);
      return await this.usersProfileService.findByName(queries.name, queries.offset, queries.limit);
    } else if (key === 'age') {
      console.log(`server controller: findByAge(${queries.age})`);
      return await this.usersProfileService.findByAge(parseInt(queries.age), queries.offset, queries.limit);
    } else if (key === 'sex') {
      console.log(`server controller: findByGender(${queries.sex})`);
      return await this.usersProfileService.findBySex(queries.sex, queries.offset, queries.limit);
    } else if (key === 'preference') {
      console.log(`server controller: findByPreference(${queries.preference})`);
      return await this.usersProfileService.findByPreference(queries.preference, queries.limit);
    }
    return await this.usersProfileService.findAll();
  }

  @HttpCode(204)
  @Delete(':id')
  async removeById(@Param() params): Promise<{statusCode: number}> {
    const affected = await this.usersProfileService.remove(params.id);
    return {statusCode: affected};
  }
}
