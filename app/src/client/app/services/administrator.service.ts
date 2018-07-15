import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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
  private getUsersOptions: any = {};
  private updateUsersOptions: any = {};
  private serverURL = 'api/administrator';

  private isVisibleSource = new BehaviorSubject<boolean>(this.isVisible);
  private receivedUsersList = new BehaviorSubject<any>(this.usersList);
  private receivedUsersData = new BehaviorSubject<any>(this.usersData);
  private receivedCurrentUserData = new BehaviorSubject<any>(this.currentUser);

  navBarState = this.isVisibleSource.asObservable();
  receivedUsers = this.receivedUsersList.asObservable();
  receivedData = this.receivedUsersData.asObservable();
  receivedCurrentUser = this.receivedCurrentUserData.asObservable();

  constructor(private http: HttpClient) {
  }

  // Show/hide aside navbar
  changeNavBarState(): void {
    this.isVisible = !this.isVisible;
    this.isVisibleSource.next(this.isVisible);
  }

  // Get current logged in user parameters
  getCurrentUserParameters(currentUserId): any {
    console.log(`${this.serverURL}/${currentUserId}`);

    return this.http.get((`${this.serverURL}/${currentUserId}`), httpOptions)
      .subscribe(response => {
        this.receivedCurrentUserData.next(response);
      });
  }

  // Get usersList from DB according to the specified view parameters, on startup with default parameters
  getUsersEnquiryRequest(enquiry?): any {
    if (enquiry) {
      this.getUsersOptions = enquiry;
    }

    return this.http.post(this.serverURL, JSON.stringify(this.getUsersOptions), httpOptions)
       .subscribe(response => this.receivedUsersList.next(response));
  }

  // Update users status in DB
  updateUsersEnquiryRequest(enquiry): any {
    this.updateUsersOptions = enquiry;

    this.http.patch(this.serverURL, JSON.stringify(this.updateUsersOptions), httpOptions)
      .subscribe(next => this.getUsersEnquiryRequest());
  }

  // Get site statistics for administrator dashboard view
  getStatistics(): any {
    return this.http.get(this.serverURL, httpOptions)
      .subscribe(response => {
        this.receivedUsersData.next(response);
      });
  }

}
