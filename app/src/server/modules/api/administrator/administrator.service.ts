import { Component, Inject } from '@nestjs/common';

import { UserProfile } from '../users-profile/user-profile.entity';
import { UserProfileDto } from '../users-profile/dto/user-profile.dto';

import { usersList } from './mock-users';   // TODO: delete when ready

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

interface UsersAttendance {
  femaleAttendanceByMonth: number[];
  maleAttendanceByMonth: number[];
  measurementPeriod: string[];
}

interface SiteStatistics {
  generalInformation: GeneralInformation;
  usersByAge: UsersByAge;
  usersAttendance: UsersAttendance;
}

@Component()
export class AdministratorServiceComponent {
  originalUsersList: any[] = [];
  currentUser = {} as UserProfile;

  constructor(@Inject('UsersProfileRepository') private readonly userProfileRepository: typeof UserProfile) {}

  // Get user from DB
  async getUser(id: number) {
    // return await this.userProfileRepository                        // TODO: uncomment to work with DB
    //   .findById<UserProfile>(id)
    //   .then(result => this.currentUser = result);

    for (let i = 0; i < this.originalUsersList.length; i += 1) {      // TODO: delete
      if (this.originalUsersList[i].id === id) {
        this.currentUser = this.originalUsersList[i];
        break;
      }
    }

    return this.currentUser;                                          // TODO: delete
  }

  // Get users from DB
  async getUsers() {
    // return await this.userProfileRepository                        // TODO: uncomment to work with DB
    //   .findAll<UserProfile>({ raw: true })
    //   .then(result => this.originalUsersList = result);

    this.originalUsersList = usersList;
  }

  // Update users in DB
  async updateUser(id: number, options/*: {}*/) {
    // return await this.userProfileRepository                        // TODO: uncomment to work with DB
    //   .update(options, {where: {id: id}});

    for (let i = 0; i < this.originalUsersList.length; i += 1) {      // TODO: delete
      if (this.originalUsersList[i].id === id) {
        this.originalUsersList[i].isActive = options.isActive;
        this.originalUsersList[i].isBaned = options.isBaned;
        break;
      }
    }
  }

  // Delete user from DB
  async deleteUser(id: number) {
    // return await this.userProfileRepository                        // TODO: uncomment to work with DB
    //   .destroy({where: {id: id}});

    for (let i = 0; i < this.originalUsersList.length; i += 1) {      // TODO: delete
      if (this.originalUsersList[i].id === id) {
        this.originalUsersList.splice(i, 1);
        break;
      }
    }
  }

  // Get usersList from DB according to options, received from client
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

    // Stop executing while acquiring usersList from DB
    await this.getUsers();

    processedUsersList = this.originalUsersList.slice(0);

    for (const user of processedUsersList) {    // TODO: delete and replace with nav bar component get current user method
      if (user.role === 'Administrator') {
        processedResponse.currentUser = user;
      }
    }

    // Assign usersList users missing properties, necessary for the view
    if (processedUsersList) {
      processedUsersList.map((obj, i, arr) => {
        arr[i].status = arr[i].isBaned ? 'Baned' : 'Active';
        arr[i].membership = Math.floor((Date.now() - Date.parse(arr[i].registrationDate)) / (1000 * 60 * 60 * 24 * 365));

        (arr[i].membership < 1) ? (arr[i].membership = 'Less than a year') : (
          (arr[i].membership === 1) ? (arr[i].membership += ' year') : (arr[i].membership += ' years')
        );
      });
    }

    // Filter usersList
    processedUsersList = processedUsersList.filter(user => {
      return ((userRole === 'any' || user.role === userRole) && (userStatus === 'any' || user.status === userStatus));
    });

    // Calculate last index to show users per current page
    endingUserPosition = (
      (startingUserPosition + usersPerPage) <= (processedUsersList.length - 1)
    ) ? (usersPerPage) : (processedUsersList.length - startingUserPosition);

    // Calculate number of pages for pagination
    processedResponse.numberOfPages = Math.ceil(processedUsersList.length / usersPerPage);

    // Sort usersList
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

    // Trim sorted and filtered usersList to show predefined page
    processedUsersList = processedUsersList.splice(startingUserPosition, endingUserPosition);

    processedResponse.users = processedUsersList;

    // // Use to fill DB with mock users from './mock-users'
    // this.originalUsersList.forEach((user) => {
    //   const userProfile = new UserProfile();
    //
    //   userProfile.firstName = user.firstName;
    //   userProfile.lastName = user.lastName;
    //   userProfile.id = user.id;
    //   userProfile.role = user.role;
    //   userProfile.isActive = true;
    //   userProfile.isBaned = false;
    //   userProfile.registrationDate = new Date(user.registrationDate);
    //   userProfile.lastActiveDate = new Date(user.lastActive);
    //
    //   userProfile.save();
    // });

    return processedResponse;
  }

  // Update usersList in DB according to options, received from client
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

      case 'delete':
        usersToUpdate.forEach(async id => {
          await this.deleteUser(id);
        });
        break;
    }
  }

  // Collect site statistics from admin dashboard
  async collectSiteStatistics() {
    const currentDate = Date.now();
    const statistics: SiteStatistics = {
      generalInformation: <GeneralInformation>{
        totalQuantityOfUsers: 0,
        quantityOfFemales: 0,
        quantityOfMales: 0,
        averageTimeSpent: 0,
        // Mock data, TODO: collect data from DB: users registered/deleted last week/current week
        difTotalQuantityOfUsers: 4,
        difQuantityOfFemales: -9,
        difQuantityOfMales: 12,
        difAverageTimeSpent: -4
      },
      usersByAge: <UsersByAge>{
        'less than 20': 0,
        'from 20 to 30': 0,
        'from 30 to 40': 0,
        'from 40 to 50': 0,
        'from 50 to 60': 0,
        'greater than 60': 0,
      },
      // Mock data, TODO: collect data from DB somehow
      usersAttendance: <UsersAttendance>{
        femaleAttendanceByMonth: [65, 59, 80, 81, 56, 55, 40],
        maleAttendanceByMonth: [28, 48, 40, 19, 86, 27, 90],
        measurementPeriod: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
      }
    };

    let users;
    let currentUserAge;

    await this.getUsers();

    users = this.originalUsersList.slice(0);

    statistics.generalInformation.totalQuantityOfUsers = users.length;

    for (let i = 0; i < statistics.generalInformation.totalQuantityOfUsers; i += 1) {
      if (users[i].gender === 'Female') {
        statistics.generalInformation.quantityOfFemales += 1;
      } else {
        statistics.generalInformation.quantityOfMales += 1;
      }

      statistics.generalInformation.averageTimeSpent += (currentDate - Date.parse(users[i].registrationDate)) / (1000 * 60 * 60 * 24 * 365);

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

    statistics.generalInformation.averageTimeSpent /= statistics.generalInformation.totalQuantityOfUsers;
    statistics.generalInformation.averageTimeSpent = parseFloat(statistics.generalInformation.averageTimeSpent.toFixed(2));

    return statistics;
  }

}
