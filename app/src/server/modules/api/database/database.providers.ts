import { Sequelize } from 'sequelize-typescript';

import { User } from '../users/user.entity';
import { UserProfile } from '../users-profile/user-profile.entity';
import { RecoverPassEntity } from '../controllers/recover-password/recover-pass.entity';
import { Rating } from '../users-profile/rating.entity';
import { Location } from '../users-profile/location.entity';
import { UserProfileInterest } from '../users-profile/user-profile-interest.entity';
import { Interest } from '../users-profile/interest.entity';
import { Likes } from '../users-profile/likes.entity';
import { ChatList } from '../chat-list/chat-list.entity';

import { config } from '../../../config/config';

const { host, port, db: database, user: username, pass: password } = config.postgres;

export const databaseProviders = [
  {
    provide: 'SequelizeToken',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host,
        port,
        username,
        password,
        database,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
      });
      sequelize.addModels([
        User,
        UserProfile,
        Rating,
        Likes,
        Location,
        Interest,
        UserProfileInterest,
        ChatList,
        RecoverPassEntity
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
