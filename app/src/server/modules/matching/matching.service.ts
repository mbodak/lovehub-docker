/**
 * Created by Crofty on 2/19/18.
 */
import {Component, Inject} from '@nestjs/common';
import {UserProfileDto} from '../api/users-profile/dto/user-profile.dto';
import {Matching} from './matching.interface';
import {Model} from 'mongoose';
import {UsersProfileService} from '../api/users-profile/users-profile.service';

@Component()
export class MatchingServiceComponent {
  constructor(private profileService: UsersProfileService,
              @Inject('MatchingModelToken') private readonly match: Model<Matching>) {
  }

  async matchUsers(id: number, preference: string): Promise<any> {
    const user = await this.profileService.findByUserId(id);
    this.match.find({
      $or: [{'user1.user': user.userId}, {'user2.user': user.userId}],
      $and: [{'user1.active': true}, {'user2.active': true}]
    })
      .sort('-timestamp')
      .populate('user1.user')
      .populate('user2.user')
      .then(matches => {
        return matches;
      })
      .catch(err => {
        return {success: false, message: err.message};
      });
    //return this.profileService.findByPreference(preference, 50);
  }

  async unlikeUsers(user: UserProfileDto, id: any): Promise<any> {
    // Find a potential match
    this.match.findOne({
      $or: [
        {$and: [{'user1.user': user.userId}, {'user2.user': id}]},
        {$and: [{'user2.user': user.userId}, {'user1.user': id}]}
      ]
    })
      .populate('user1.user')
      .populate('user2.user')
      .then(match => {
        if (!match) {
          // No such match - Error
          return {success: false, message: 'You cannot unlike this user!'};
        }
      })
      .catch(err => {
        return {success: false, message: err.message};
      });
  }

  async likeUsers(user: UserProfileDto, id: any): Promise<any> {
    // Find a potential match
    this.match.findOne({
      $or: [
        {$and: [{'user1.user': user.userId}, {'user2.user': id}]},
        {$and: [{'user2.user': user.userId}, {'user1.user': id}]}
      ]
    })
      .populate('user1.user')
      .populate('user2.user')
      .then(match => {
        if (!match) {
          // No such match - Create new Match
          // return match.create({
          //   user1: {
          //     user: user.userId,
          //     active: true
          //   },
          //   user2: {
          //     user: id
          //   }
          // })
          //   .catch(err => {
          //     return {success: false, message: err.message};
          //   });
        }
      });
  }
}

