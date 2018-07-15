import {Component, Inject} from '@nestjs/common';
import { User } from '../../users/user.entity';
import { UserProfile} from '../../users-profile/user-profile.entity';

@Component()
export class LoginService {

  // constructor(@Inject('UsersRepository') private readonly userRepository: typeof User,
  //             @Inject('UsersProfileRepository') private readonly userProfileRepository: typeof UserProfile) {}
  //
  // async findUser(email: string, password: number): Promise<UserProfile> {
  //   return await this.userRepository.();
  // }
}
