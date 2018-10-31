import { Component, Inject } from '@nestjs/common';
import { UserProfile } from './user-profile.entity';
import { Likes } from './likes.entity';
import { UserProfileDto } from './dto/user-profile.dto';
import { LikeDto } from './dto/like.dto';
import { PREFERENCE } from './preference';
import { ORIENTATION } from './orientation';
import {where} from 'sequelize';
import { Model } from 'mongoose';
import {UserProfileInterface} from "./user-profile.interface";

export interface FilteredUsersProfile {
  rows?: UserProfile[];
  count?: number;
}

@Component()
export class UsersProfileService {

  constructor(@Inject('UsersProfileRepository') private readonly userProfileRepository: typeof UserProfile,
              @Inject('LikesRepository') private readonly likesRepository: typeof Likes,
              @Inject('UsersProfileModelToken') private readonly userProfileModel: Model<UserProfileInterface>) {}

  async create(userProfileDto: UserProfileDto): Promise<UserProfile> {
    const userProfile = new UserProfile();
    userProfile.firstName = userProfileDto.firstName;
    userProfile.lastName = userProfileDto.lastName;
    userProfile.phoneNumber = userProfileDto.phoneNumber;
    userProfile.age = userProfileDto.age;
    userProfile.sex = userProfileDto.sex;
    userProfile.role = userProfileDto.role;
    userProfile.preference = userProfileDto.preference;
    userProfile.orientation = userProfileDto.orientation;
    userProfile.userId = userProfileDto.userId;
    userProfile.isBaned = userProfileDto.isBaned;
    userProfile.isActive = userProfileDto.isActive;
    userProfile.registrationDate = userProfileDto.registrationDate;


    const mongoProfile = new this.userProfileModel({
    userId: userProfileDto.userId,
    firstName: userProfileDto.firstName,
    lastName: userProfileDto.lastName,
    age: userProfileDto.age,
    preference: userProfileDto.preference,
    });
    mongoProfile.save();
    try {
      return await userProfile.save();
    } catch (error) {
      console.error(`Arise an exception in the save() method UserProfile Service`);
      throw error;
    }
  }

  async findAll(): Promise<UserProfile[]> {
    try {
      return await this.userProfileRepository.findAll<UserProfile>();
    } catch (error) {
      console.error(`Arise an exception in the findAll() method UserProfile Service`);
      throw error;
    }
  }

  async findByUserId(userId: number): Promise<UserProfile> {
    try {
      console.log(`findByUserId(${userId})`);
      return await this.userProfileRepository
        .findOne<UserProfile>({ where: { userId } });
    } catch (error) {
      console.error(`Arise an exception in the findById(${userId}) method UserProfile Service`);
      throw error;
    }
  }

  async findShortInfo(id: number): Promise<any> {
    try {
      return await this.userProfileRepository
      .findOne<UserProfile>({
        where: {userId: id},
        attributes: ['userId', 'firstName', 'lastName']
      });
    } catch (error) {
      console.error(`UserProfileService findShortInfo Error: (${id})`);
      throw error;
    }
  }

  async findByName(name: string, offset: number, limit: number): Promise<FilteredUsersProfile> {
    console.log(`server service: findByName(${name})`);
    try {
      return await this.userProfileRepository
        .findAndCountAll<UserProfile>({where: {firstName: {$iLike: `${name}%`}}, offset: offset, limit: limit});
    } catch (error) {
      console.error(`Arise an exception in the findByName(${name}) method UserProfile Service`);
      throw error;
    }
  }

  async findByAll(): Promise<FilteredUsersProfile> {
    console.log(`server service: findByAll()`);
    try {
      return await this.userProfileRepository
        .findAndCountAll<UserProfile>();
    } catch (error) {
      console.error(`Arise an exception in the findByAll() method UserProfile Service`);
      throw error;
    }
  }

  async findByAge(age: number, offset: number, limit: number): Promise<FilteredUsersProfile> {
    console.log(`server service: findByAge(${age})`);
    try {
      return await this.userProfileRepository
        .findAndCountAll<UserProfile>({where: {age: {$gte: age}}, offset: offset, limit: limit});
    } catch (error) {
      console.error(`Arise an exception in the findByAge(${age}) method UserProfile Service`);
      throw error;
    }
  }

  async findBySex(sex: string, offset: number, limit: number): Promise<FilteredUsersProfile> {
    console.log(`server service: findByGender(${sex})`);
    try {
      return await this.userProfileRepository
        .findAndCountAll<UserProfile>({where: { sex }, offset: offset, limit: limit});
    } catch (error) {
      console.error(`Arise an exception in the findByGender(${sex}) method UserProfile Service`);
      throw error;
    }
  }

  async findByPreference(preference: string, limit: number): Promise<FilteredUsersProfile> {
    console.log(`server service: findByPreference(${preference})`);
    try {
      return await this.userProfileRepository
        .findAndCountAll<UserProfile>({where: {preference: preference}, limit: limit});
    } catch (error) {
      console.error(`Arise an exception in the findByPreference(${preference}) method UserProfile Service`);
      throw error;
    }
  }


  async update(id: number, userProfileDto: UserProfileDto): Promise<[number, UserProfile[]]> {
    try {
      console.log('Server UsersProfileService ' + id);
      return await this.userProfileRepository
        .update(userProfileDto, {where: { id }});
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<number> {
    try {
      return await this.userProfileRepository
        .destroy({where: { id }});
    } catch (error) {
      throw error;
    }
  }


  // operations with likes

  async createLike(likeDto: LikeDto): Promise<Likes> {
    const like = new Likes();
    like.whatLike = likeDto.whatLike;
    like.whoLike = likeDto.whoLike;
    return await like.save();
  }

  async findLikes(): Promise<Likes[]> {
    try {
      return await this.likesRepository
        .findAll<Likes>();
    } catch (error) {
      throw error;
    }
  }

  async findWhoLikesUser(userId: number): Promise<number[]> {
    try {
      const b = await this.likesRepository
        .findAll<Likes>({where: { whatLike: userId }, attributes: ['whoLike']});
      const who = b.map(({whoLike}) => whoLike);
      console.log('who:', who);
      return who;
    } catch (error) {
      throw error;
    }
  }

  async findWhatLikeUser(userId: number): Promise<number[]> {
    try {
      const a = await this.likesRepository
        .findAll<Likes>({where: { whoLike: userId }, attributes: ['whatLike']});
      const what = a.map(({whatLike}) => whatLike);
      console.log('what:', what);
      return what;
    } catch (error) {
      throw error;
    }
  }

  async deleteLike(userId: number, userIdUrl: number): Promise<number> {
    try {
      return await this.likesRepository
        .destroy({where: { whoLike: userId, whatLike: userIdUrl }});
    } catch (error) {
      throw error;
    }
  }
}
