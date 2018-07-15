import { Component, OnInit } from '@angular/core';

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
  // Expand to full browser's width if Navbar is hidden
  mainSectionIsVisible: boolean;

  // Initial options to get usersList from DB
  // Options change upon applying sorting/filtering actions in the view
  getUsersOptions = {
    userRole: 'any',
    userStatus: 'any',
    usersPerPage: 5,
    nextPage: 1,
    sortingOptions: {
      tableColumn: 'id',
      sortingOption: 'ascending'
    }
  };

  // Options to update user(s) status in DB
  updateUsersOptions = {
    usersList: [],
    appliedAction: 'ban'
  };

  // UsersList table view parameters
  usersList = {
    users: [],
    currentUser: {},
    numberOfPages: 1,
    currentPage: 1,
    maxPagesToShow: 3
  };

  // Pagination pages for view
  pages = [];

  constructor(private administratorService: AdministratorService) {
  }

  ngOnInit() {
    // Subscribe to Administrator Service changes in usersList, received from DB
    this.administratorService.receivedUsers.subscribe(data => {
      this.manageUsersListParameters(data);
      this.managePaginationPagesView();
    });

    // Get usersList from DB with initial (default) options
    this.administratorService.getUsersEnquiryRequest(this.getUsersOptions);

    // Expand to full browser's width if Navbar is hidden
    this.administratorService.navBarState.subscribe(data => {
      return this.mainSectionIsVisible = data;
    });
  }

  // Fill usersList with data, received from server
  manageUsersListParameters(data): void {
    this.usersList.users = data.users;

    console.log(this.usersList.users);

    this.usersList.currentUser = data.currentUser;
    this.usersList.numberOfPages = data.numberOfPages;
    this.usersList.currentPage = this.getUsersOptions.nextPage;
    this.pages = [];
  }

  // Manage pagination view according to data, received from server
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

  // Push selected users to array to apply selected action
  pushSelectedUsersList(form, user): void {
    if (!form.value.selectUser) {
      this.updateUsersOptions.usersList.push(user.id);
    } else {
      const userListIndex = this.updateUsersOptions.usersList.indexOf(user.id);

      this.updateUsersOptions.usersList.splice(userListIndex, 1);
    }
  }

  // Reset selected users array upon applying an action
  resetSelectedUsersList(): void {
    this.updateUsersOptions.usersList = [];
  }

  // Save selected sorting options to acquire predefined userList from server
  applySort(column, direction): void {
    this.getUsersOptions.sortingOptions = {
      tableColumn: column,
      sortingOption: direction
    };
  }

  // Reset sorting options to default upon acquiring userList from server
  resetSortingOptions(): void {
    this.getUsersOptions.sortingOptions = {
      tableColumn: 'none',
      sortingOption: 'none'
    };
  }

  // Save next page option to acquire predefined userList from server
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

  // Reset next page option to default upon acquiring userList from server
  resetNextPage(): void {
    this.getUsersOptions.nextPage = 1;
  }

  // Get usersList from DB according to defined options in the view
  getUsers(): void {
    this.administratorService.getUsersEnquiryRequest(this.getUsersOptions);
  }

  // Update selected users in DB according to defined options in the view
  updateUsers(): void {
    this.administratorService.updateUsersEnquiryRequest(this.updateUsersOptions);
  }

}
