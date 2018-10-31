import { Component, Inject } from '@nestjs/common';

import { MailService } from '../services/mail.service';
import { User } from '../users/user.entity';
import { UserProfile } from '../users-profile/user-profile.entity';

interface GeneralInformation {
  totalQuantityOfUsers: number;
  quantityOfFemales: number;
  quantityOfMales: number;
  averageTimeSpent: number;
  difTotalQuantityOfUsers: number;
  difQuantityOfFemales: number;
  difQuantityOfMales: number;
  difAverageTimeSpent: number;
}

interface UsersByAge {
  'less than 20': number;
  'from 20 to 30': number;
  'from 30 to 40': number;
  'from 40 to 50': number;
  'from 50 to 60': number;
  'greater than 60': number;
}

interface UsersNumberDynamics {
  femaleNumberByMonth: number[];
  maleNumberByMonth: number[];
  measurementPeriod: any[];
}

interface SiteStatistics {
  generalInformation: GeneralInformation;
  usersByAge: UsersByAge;
  usersNumberDynamics: UsersNumberDynamics;
}

interface SearchResults {
  users: any[];
  searchQuery: string;
}

@Component()
export class AdministratorServiceComponent {
  public originalUsersList: any[] = [];
  public currentUser = {} as UserProfile;

  constructor(@Inject('UsersRepository') private readonly userRepository: typeof User,
              @Inject('UsersProfileRepository') private readonly userProfileRepository: typeof UserProfile,
              @Inject('MailService') private mailService: MailService) {
  }

  async getUser(id: number) {
    return await this.userProfileRepository
      .findById<UserProfile>(id)
      .then(result => this.currentUser = result);
  }

  async getUsers() {
    return await this.userProfileRepository
      .findAll<UserProfile>({ raw: true })
      .then(result => this.originalUsersList = result);
  }

  async updateUser(id: number, options/*: {}*/) {
    return await this.userProfileRepository
      .update(options, {where: {id: id}});
  }

  async updateUsersList(updateUsersEnquiryDto) {
    const usersToUpdate = updateUsersEnquiryDto.usersList;
    const appliedAction = updateUsersEnquiryDto.appliedAction;

    switch (appliedAction) {
      case 'ban':
        usersToUpdate.forEach(async id => {
          await this.updateUser(id, {isActive: false, isBaned: true});
        });
        break;

      case 'restore':
        usersToUpdate.forEach(async id => {
          await this.updateUser(id, {isActive: true, isBaned: false});
        });
        break;

      // case 'delete':
      //   usersToUpdate.forEach(async id => {
      //     await this.updateUser(id, {role: 'deleted'});
      //   });
      //   break;

      case 'assign moderator':
        usersToUpdate.forEach(async id => {
          await this.updateUser(id, {role: 'MODERATOR'});
        });
        break;

      case 'relieve moderator':
        usersToUpdate.forEach(async id => {
          await this.updateUser(id, {role: 'USER'});
        });
        break;
    }
  }

  async manageUsersList(getUsersEnquiryDto) {
    const sortingColumn: string = getUsersEnquiryDto.sortingOptions.tableColumn;
    const sortingOption: string = getUsersEnquiryDto.sortingOptions.sortingOption;
    const userRole: string = getUsersEnquiryDto.userRole;
    const userStatus: string = getUsersEnquiryDto.userStatus;
    const usersPerPage: number = parseInt(getUsersEnquiryDto.usersPerPage, 10);
    const nextPage: number = parseInt(getUsersEnquiryDto.nextPage, 10);
    const startingUserPosition: number = (nextPage - 1) * usersPerPage;
    const processedResponse = {
      users: <any []>[],
      currentUser: {},
      numberOfPages: <number>0
    };

    let processedUsersList;
    let endingUserPosition: number;

    await this.getUsers();

    processedUsersList = this.originalUsersList.slice(0);

    if (processedUsersList) {
      processedUsersList.map((obj, i, arr) => {
        arr[i].status = arr[i].isBaned ? 'Baned' : 'Active';

        if (arr[i].registrationDate) {
          arr[i].membership = Math.floor((Date.now() - arr[i].registrationDate) / (1000 * 60 * 60 * 24 * 365));

          (arr[i].membership < 1)
            ? (arr[i].membership = 'Less than a year')
            : ((arr[i].membership === 1)
              ? (arr[i].membership += ' year')
              : (arr[i].membership += ' years'));
        }

        (arr[i].lastActiveDate)
          ? (arr[i].lastActiveDate = (new Date(parseInt(arr[i].lastActiveDate, 10))).toISOString().split('T')[0])
          : (arr[i].lastActiveDate = '');
      });
    }

    processedUsersList = processedUsersList.filter(user => {
        return ((user.role !== 'ADMIN')
                &&
                (userRole === 'any' || user.role === userRole)
                &&
                (userStatus === 'any' || user.status === userStatus));
        });

    endingUserPosition = ((startingUserPosition + usersPerPage) <= (processedUsersList.length - 1))
      ? (usersPerPage)
      : (processedUsersList.length - startingUserPosition);

    processedResponse.numberOfPages = Math.ceil(processedUsersList.length / usersPerPage);

    if (sortingOption !== 'none') {
      processedUsersList.sort((userA, userB) => {
        switch (sortingOption) {
          case 'ascending':
            if (userA[sortingColumn] < userB[sortingColumn]) {
              return -1;
            } else if (userA[sortingColumn] > userB[sortingColumn]) {
              return 1;
            } else {
              return 0;
            }

          case 'descending':
            if (userA[sortingColumn] < userB[sortingColumn]) {
              return 1;
            } else if (userA[sortingColumn] > userB[sortingColumn]) {
              return -1;
            } else {
              return 0;
            }
        }
      });
    }

    processedUsersList = processedUsersList.splice(startingUserPosition, endingUserPosition);

    processedResponse.users = processedUsersList;

    return processedResponse;
  }

  async collectSiteStatistics() {
    const currentDate = Date.now();
    const currentMonth = new Date(currentDate).getMonth();
    const lastWeek = currentDate - 604800000;
    const averageMonthLength = 2629746000;
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    const statistics: SiteStatistics = {
      generalInformation: <GeneralInformation>{
        totalQuantityOfUsers: 0,
        quantityOfFemales: 0,
        quantityOfMales: 0,
        averageTimeSpent: 0,
      },
      usersByAge: <UsersByAge>{
        'less than 20': 0,
        'from 20 to 30': 0,
        'from 30 to 40': 0,
        'from 40 to 50': 0,
        'from 50 to 60': 0,
        'greater than 60': 0,
      },
      usersNumberDynamics: <UsersNumberDynamics>{
        femaleNumberByMonth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        maleNumberByMonth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        measurementPeriod: []
      }
    };
    const lastWeekStatistics = {
      generalInformation: <GeneralInformation>{
        totalQuantityOfUsers: 0,
        quantityOfFemales: 0,
        quantityOfMales: 0,
        averageTimeSpent: 0
      }
    };

    let users;
    let currentUserAge;

    await this.getUsers();

    users = this.originalUsersList.slice(0);

    statistics.generalInformation.totalQuantityOfUsers = users.length;

    for (let i = 0; i < users.length; i += 1) {
      if (users[i].sex === 'FEMALE') {
        statistics.generalInformation.quantityOfFemales += 1;
      } else if (users[i].sex === 'MALE') {
        statistics.generalInformation.quantityOfMales += 1;
      }

      // if (users[i].role !== 'deleted') {
      //   statistics.generalInformation.averageTimeSpent +=
      // (currentDate - Date.parse(users[i].registrationDate)) / (1000 * 60 * 60 * 24 * 365);
      // }

      if (users[i].registrationDate) {
        statistics.generalInformation.averageTimeSpent += (currentDate - users[i].registrationDate) / (1000 * 60 * 60 * 24 * 365);
      }

      if (users[i].age) {
        currentUserAge = users[i].age;

        if (currentUserAge < 20) {
          statistics.usersByAge['less than 20'] += 1;
        } else if (currentUserAge >= 20 && currentUserAge < 30) {
          statistics.usersByAge['from 20 to 30'] += 1;
        } else if (currentUserAge >= 30 && currentUserAge < 40) {
          statistics.usersByAge['from 30 to 40'] += 1;
        } else if (currentUserAge >= 40 && currentUserAge < 50) {
          statistics.usersByAge['from 40 to 50'] += 1;
        } else if (currentUserAge >= 50 && currentUserAge < 60) {
          statistics.usersByAge['from 50 to 60'] += 1;
        } else if (currentUserAge >= 60) {
          statistics.usersByAge['greater than 60'] += 1;
        }
      }

      if (users[i].registrationDate && (users[i].registrationDate <= lastWeek)) {
        // if (users[i].role !== 'deleted') {
        //   lastWeekStatistics.generalInformation.totalQuantityOfUsers += 1;
        // }

        lastWeekStatistics.generalInformation.totalQuantityOfUsers += 1;

        if (users[i].sex === 'FEMALE') {
          lastWeekStatistics.generalInformation.quantityOfFemales += 1;
        } else if (users[i].sex === 'MALE') {
          lastWeekStatistics.generalInformation.quantityOfMales += 1;
        }

        lastWeekStatistics.generalInformation.averageTimeSpent +=
          (currentDate - users[i].registrationDate) / (1000 * 60 * 60 * 24 * 365);
      }

      for (let j = 0; j <= 11; j += 1) {
        if (users[i].registrationDate && (users[i].registrationDate <= (currentDate - j * averageMonthLength))) {
          if (users[i].sex === 'FEMALE') {
            statistics.usersNumberDynamics.femaleNumberByMonth[j] += 1;
          } else if (users[i].sex === 'MALE') {
            statistics.usersNumberDynamics.maleNumberByMonth[j] += 1;
          }
        }
      }

      (users[i].registrationDate)
        ? (users[i].registrationDate = (new Date(parseInt(users[i].registrationDate, 10))).toISOString().split('T')[0])
        : (users[i].registrationDate = '');

      (users[i].lastActiveDate)
        ? (users[i].lastActiveDate = (new Date(parseInt(users[i].lastActiveDate, 10))).toISOString().split('T')[0])
        : (users[i].lastActiveDate = '');
    }

    statistics.usersNumberDynamics.femaleNumberByMonth.reverse();
    statistics.usersNumberDynamics.maleNumberByMonth.reverse();

    for (let i = 1; i <= 12; i += 1) {
      statistics.usersNumberDynamics.measurementPeriod.push((currentMonth - i + 13) % 12);
    }

    for (let i = 0; i < statistics.usersNumberDynamics.measurementPeriod.length; i += 1) {
      statistics.usersNumberDynamics.measurementPeriod[i] = months[statistics.usersNumberDynamics.measurementPeriod[i]];
    }

    statistics.generalInformation.averageTimeSpent /= statistics.generalInformation.totalQuantityOfUsers;
    statistics.generalInformation.averageTimeSpent = parseFloat(statistics.generalInformation.averageTimeSpent.toFixed(2));
    lastWeekStatistics.generalInformation.averageTimeSpent /= lastWeekStatistics.generalInformation.totalQuantityOfUsers;
    lastWeekStatistics.generalInformation.averageTimeSpent = parseFloat(lastWeekStatistics.generalInformation.averageTimeSpent.toFixed(2));

    statistics.generalInformation.difTotalQuantityOfUsers = parseFloat(
      (statistics.generalInformation.totalQuantityOfUsers /
      lastWeekStatistics.generalInformation.totalQuantityOfUsers * 100 - 100)
      .toFixed(2)
    );
    statistics.generalInformation.difQuantityOfFemales = parseFloat(
      (statistics.generalInformation.quantityOfFemales /
      lastWeekStatistics.generalInformation.quantityOfFemales * 100 - 100)
      .toFixed(2)
    );
    statistics.generalInformation.difQuantityOfMales = parseFloat(
      (statistics.generalInformation.quantityOfMales /
      lastWeekStatistics.generalInformation.quantityOfMales * 100 - 100)
      .toFixed(2)
    );
    statistics.generalInformation.difAverageTimeSpent = parseFloat(
      (statistics.generalInformation.averageTimeSpent /
      lastWeekStatistics.generalInformation.averageTimeSpent * 100 - 100)
      .toFixed(2)
    );

    return statistics;
  }

  async getSearchResults(input) {
    const findConcurrences = new RegExp(`${input}`, 'i');
    const searchResults: SearchResults = {
      users: [],
      searchQuery: ''
    };

    let users;

    await this.getUsers();

    users = this.originalUsersList.slice(0);

    users.forEach((user) => {
      for (const p in user) {
        if (user.hasOwnProperty(p)) {
          if (findConcurrences.test(String(user[p]).trim().toLowerCase())) {
            user['concurrency'] = [p];
            searchResults.users.push(user);
          }
        }
      }
    });

    searchResults.users = [...new Set(searchResults.users)]
      .filter(user => user.role !== 'ADMIN')
      .map(user => {
      (user.registrationDate)
        ? (user.registrationDate = (new Date(parseInt(user.registrationDate, 10))).toISOString().split('T')[0])
        : (user.registrationDate = '');

      (user.lastActiveDate)
        ? (user.lastActiveDate = (new Date(parseInt(user.lastActiveDate, 10))).toISOString().split('T')[0])
        : (user.lastActiveDate = '');

      user.concurrency.push(user[user.concurrency[0]]);

      return user;
    });

    searchResults.searchQuery = input;

    return searchResults;
  }

  async getHints(input) {
    let hints = [] as any;

    await this.getSearchResults(input).then(result => {
      result.users.forEach(user => {
        hints.push({
          id: user.id,
          firstName: user.firstName,
          concurrency: user.concurrency
        });
      });
    });

    if (hints.length > 10) {
      hints = hints.splice(0, 10);
    }

    return hints;
  }

  async sendEmail(emailDto) {
    if (emailDto.selectedUsers && emailDto.selectedUsers.length > 0) {
      emailDto.selectedUsers.forEach(async user => {
        return await this.userRepository
          .findById<User>(user.id)
          .then(async result => {
            return await this.mailService.sendMail(result.email, emailDto.emailSubject, emailDto.emailBody);
          });
      });
    } else {
      await this.userRepository
        .findAll<User>({ raw: true })
        .then(result => {
          result.forEach(async user => {
            return await this.mailService.sendMail(user.email, emailDto.emailSubject, emailDto.emailBody);
          });
        });
    }
  }

}
