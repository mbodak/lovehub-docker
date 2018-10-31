import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AdministratorService } from '../../../services/administrator.service';

@Component({
  selector: 'app-administrator-users-management',
  templateUrl: './administrator-users-management.component.html',
  styleUrls: [
    '../shared/normalize.scss',
    '../shared/default-styles.scss',
    '../shared/default-layout-styles.scss',
    './administrator-users-management.component.scss']
})
export class AdministratorUsersManagementComponent implements OnInit {
  public mainSectionIsVisible: boolean;
  public allUsersSelected: boolean;
  public pages = [];
  public getUsersOptions = {
    userRole: 'any',
    userStatus: 'any',
    usersPerPage: 5,
    nextPage: 1,
    sortingOptions: {
      tableColumn: 'id',
      sortingOption: 'ascending'
    }
  };
  public updateUsersOptions = {
    usersList: [],
    appliedAction: 'ban'
  };
  public usersList = {
    users: [],
    currentUser: {},
    numberOfPages: 1,
    currentPage: 1,
    maxPagesToShow: 3
  };

  constructor(private administratorService: AdministratorService,
              private router: Router) {
  }

  ngOnInit() {
    this.administratorService.navBarState.subscribe(data => {
      return this.mainSectionIsVisible = data;
    });

    this.administratorService.receivedUsers.subscribe(data => {
      this.manageUsersListParameters(data);
      this.managePaginationPagesView();
    });

    this.administratorService.getUsersEnquiryRequest(this.getUsersOptions);
  }

  getUsers(): void {
    this.administratorService.getUsersEnquiryRequest(this.getUsersOptions);
  }

  updateUsers(): void {
    const checkedUsers = this.updateUsersOptions.usersList;
    const usersList = this.usersList.users;

    if (this.updateUsersOptions.appliedAction === 'send e-mail') {
      this.router.navigate(['/admin/email'])
          .then(() => {
            checkedUsers.forEach(user => {
              let userObject;

              for (let i = 0; i < usersList.length; i += 1) {
                if (usersList[i].id = user) {
                  userObject = usersList[i];
                  break;
                }
              }

              this.administratorService.receivedSelectedUserData.next(userObject);
            });
          });
    } else {
      this.administratorService.updateUsersEnquiryRequest(this.updateUsersOptions);
    }
  }

  manageUsersListParameters(data): void {
    this.usersList.users = data.users;
    this.usersList.currentUser = data.currentUser;
    this.usersList.numberOfPages = data.numberOfPages;
    this.usersList.currentPage = this.getUsersOptions.nextPage;
    this.pages = [];
  }

  managePaginationPagesView(): void {
    const pages = this.pages;
    const currentPage = this.usersList.currentPage;
    const numberOfPages = this.usersList.numberOfPages;
    const maxPagesToShow = this.usersList.maxPagesToShow;
    const lastPagesBlockLength = numberOfPages - maxPagesToShow;
    const middlePagesBlockStart = currentPage - Math.ceil(maxPagesToShow / 2) + 1;
    const middlePagesBlockEnd = currentPage + Math.ceil(maxPagesToShow / 2) - 1;

    if (numberOfPages <= maxPagesToShow) {
      for (let i = 1; i <= numberOfPages; i += 1) {
        pages.push({pageTitle: i});
      }
    } else {
      if (currentPage <= maxPagesToShow) {
        for (let i = 1; i <= (maxPagesToShow + 1); i += 1) {
          pages.push({pageTitle: i});
        }

        if (numberOfPages === (maxPagesToShow + 2)) {
          pages.push({pageTitle: numberOfPages});
        } else if (numberOfPages >= (maxPagesToShow + 2)) {
          pages.push({pageTitle: '...', pageFunction: 'next block'});
          pages.push({pageTitle: numberOfPages});
        }
      } else if ((numberOfPages - currentPage) < maxPagesToShow) {
        if (numberOfPages === (maxPagesToShow + 2)) {
          pages.push({pageTitle: 1});
        } else if (numberOfPages >= (maxPagesToShow + 2)) {
          pages.push({pageTitle: 1});
          pages.push({pageTitle: '...', pageFunction: 'previous block'});
        }

        for (let i = lastPagesBlockLength; i <= numberOfPages; i += 1) {
          pages.push({pageTitle: i});
        }
      } else {
        pages.push({pageTitle: 1});
        pages.push({pageTitle: '...', pageFunction: 'previous block'});

        for (let i = middlePagesBlockStart; i <= middlePagesBlockEnd; i += 1) {
          pages.push({pageTitle: i});
        }

        pages.push({pageTitle: '...', pageFunction: 'next block'});
        pages.push({pageTitle: numberOfPages});
      }
    }
  }

  pushSelectedUsersList(form, user): void {
    if (!form.value.selectUser) {
      this.updateUsersOptions.usersList.push(user.id);
    } else {
      const userListIndex = this.updateUsersOptions.usersList.indexOf(user.id);

      this.updateUsersOptions.usersList.splice(userListIndex, 1);
    }
  }

  pushAllToSelectedUsersList(): void {
    if (this.allUsersSelected) {
      this.usersList.users.forEach(user => {
        this.updateUsersOptions.usersList.push(user.id);
      });
    } else {
      this.updateUsersOptions.usersList = [] as any;
    }
  }

  resetSelectedUsersList(): void {
    this.updateUsersOptions.usersList = [];
  }

  applySort(column, direction): void {
    this.getUsersOptions.sortingOptions = {
      tableColumn: column,
      sortingOption: direction
    };
  }

  resetSortingOptions(): void {
    this.getUsersOptions.sortingOptions = {
      tableColumn: 'none',
      sortingOption: 'none'
    };
  }

  goToPage(page): void {
    const pages = this.pages;
    const lastPage = pages[pages.length - 1].pageTitle;
    const currentPage = this.usersList.currentPage;

    let nextBlock;
    let nextPage;

    switch (page.pageTitle) {
      case 'previous':
        (currentPage === 1) ? (nextPage = 1) : (nextPage = currentPage - 1);
        break;

      case 'next':
        (currentPage + 1 > lastPage) ? (nextPage = lastPage) : (nextPage = currentPage + 1);
        break;

      case '...':
        switch (page.pageFunction) {
          case 'previous block':
            for (let i = 0; i < pages.length; i += 1) {
              if (pages[i].pageFunction && pages[i].pageFunction === 'previous block') {
                nextBlock = i;
              }
            }

            nextPage = pages[nextBlock + 1].pageTitle - 1;
            break;

          case 'next block':
            for (let i = 0; i < pages.length; i += 1) {
              if (pages[i].pageFunction && pages[i].pageFunction === 'next block') {
                nextBlock = i;
              }
            }

            nextPage = pages[nextBlock - 1].pageTitle + 1;
            break;
        }
        break;

      default:
        nextPage = page.pageTitle;
        break;
    }

    this.getUsersOptions.nextPage = nextPage;
  }

  resetNextPage(): void {
    this.getUsersOptions.nextPage = 1;
  }

}
