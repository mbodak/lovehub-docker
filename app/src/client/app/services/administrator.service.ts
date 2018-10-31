import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class AdministratorService {
  private isVisible = true;
  private usersList: any = {};
  private usersData: any = {};
  private currentUser: any = {};
  private selectedUser: any = {};
  private searchResults: any[] = [];
  private hintsToEmail: any[] = [];
  private getUsersOptions: any = {};
  private updateUsersOptions: any = {};
  private serverURL = 'api/administrator';

  private isVisibleSource = new BehaviorSubject<boolean>(this.isVisible);
  private receivedUsersList = new BehaviorSubject<any>(this.usersList);
  private receivedUsersData = new BehaviorSubject<any>(this.usersData);
  private receivedCurrentUserData = new BehaviorSubject<any>(this.currentUser);
  private receivedSearchData = new BehaviorSubject<any>(this.searchResults);
  private receivedHintsList = new BehaviorSubject<any>(this.hintsToEmail);

  public receivedSelectedUserData = new BehaviorSubject<any>(this.selectedUser);

  public navBarState = this.isVisibleSource.asObservable();
  public receivedUsers = this.receivedUsersList.asObservable();
  public receivedData = this.receivedUsersData.asObservable();
  public receivedCurrentUser = this.receivedCurrentUserData.asObservable();
  public receivedSearchResults = this.receivedSearchData.asObservable();
  public receivedHints = this.receivedHintsList.asObservable();
  public receivedSelectedUser = this.receivedSelectedUserData.asObservable();

  constructor(private http: HttpClient) {
  }

  changeNavBarState(): void {
    this.isVisible = !this.isVisible;
    this.isVisibleSource.next(this.isVisible);
  }

  getCurrentUserParameters(currentUserId): any {
    return this.http.get((`${this.serverURL}/get-user/${currentUserId}`), httpOptions)
      .subscribe(response => {
        this.receivedCurrentUserData.next(response);
      });
  }

  getUsersEnquiryRequest(enquiry?): any {
    if (enquiry) {
      this.getUsersOptions = enquiry;
    }

    return this.http.post((`${this.serverURL}/get-users`), JSON.stringify(this.getUsersOptions), httpOptions)
      .subscribe(response => this.receivedUsersList.next(response));
  }

  updateUsersEnquiryRequest(enquiry): any {
    this.updateUsersOptions = enquiry;

    this.http.patch((`${this.serverURL}/update-users`), JSON.stringify(this.updateUsersOptions), httpOptions)
      .subscribe(next => this.getUsersEnquiryRequest());
  }

  getStatistics(): any {
    return this.http.get((`${this.serverURL}/get-statistics`), httpOptions)
      .subscribe(response => {
        this.receivedUsersData.next(response);
      });
  }

  searchUsers(input): any {
    return this.http.get((`${this.serverURL}/search/${input}`), httpOptions)
      .subscribe(response => {
        this.receivedSearchData.next(response);
      });
  }

  getHints(input) {
    return this.http.get((`${this.serverURL}/get-hints-for-email/${input}`), httpOptions)
      .subscribe(response => {
        this.receivedHintsList.next(response);
      });
  }

  sendEmail(selectedUsers) {
    return this.http.post((`${this.serverURL}/send-email`), JSON.stringify(selectedUsers), httpOptions)
        .subscribe(response => {
          console.log(response);
          return alert('The mails have been successfully sent');
        });
  }

}
