import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { AdministratorService } from '../../../services/administrator.service';

interface SelectedUser {
  id: number;
  firstName: string;
  concurrency: any[];
}

@Component({
  selector: 'app-administrator-send-email',
  templateUrl: './administrator-send-email.component.html',
  styleUrls: [
    '../shared/normalize.scss',
    '../shared/default-styles.scss',
    '../shared/default-layout-styles.scss',
    './administrator-send-email.component.scss']
})
export class AdministratorSendEmailComponent implements OnInit {
  public mainSectionIsVisible: boolean;
  public inputFieldFocus = false;
  public userSelectedFromHints = false;
  public allUsersSelected = false;
  public hints = [] as any;
  public selectedUsers = [] as any;
  public selectedUser = <SelectedUser>{};
  public emailSubject: string;
  public emailBody: string;
  public emailDto = {} as any;
  public typedUser: string;
  public typedUserChanged: Subject<string> = new Subject<string>();

  constructor(private administratorService: AdministratorService) {
    this.typedUserChanged
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(input => this.typedUser = input);
  }

  ngOnInit() {
    this.administratorService.navBarState.subscribe(data => {
      return this.mainSectionIsVisible = data;
    });

    this.administratorService.receivedHints.subscribe(data => {
      this.hints = data;
    });

    this.administratorService.receivedSelectedUser.subscribe(data => {
      if (data && data.id) {
        this.selectedUsers.push(data);
      }
    });
  }

  async inputChange(input: string) {
    this.userSelectedFromHints = false;
    await this.typedUserChanged.next(input);
    this.getHints(this.typedUser);
  }

  getHints(input): void {
    this.hints = [] as any;

    if (input) {
      this.administratorService.getHints(input.trim().toLowerCase());
    } else {
      this.administratorService.getHints('');
    }
  }

  selectUser(): void {
    if (this.selectedUser && this.userSelectedFromHints) {
      this.selectedUsers.push(this.selectedUser);
      this.userSelectedFromHints = false;
      this.hints = [] as any;
      this.selectedUser = <SelectedUser>{};
      this.typedUser = '';

      this.selectedUsers = [...new Set(this.selectedUsers)]
        .filter((user: SelectedUser, index, self) =>
          index === self.findIndex((t: SelectedUser) => (
            t.id === user.id
          ))
        );
    }
  }

  addUserFromHint(hint): void {
    this.selectedUser = hint;
    this.userSelectedFromHints = true;
    this.allUsersSelected = false;
    this.hints = [] as any;

    if (hint.firstName) {
      this.typedUser = hint.firstName;
    }
  }

  selectAllUsers(): void {
    this.allUsersSelected = true;
    this.userSelectedFromHints = false;
    this.selectedUsers = [] as any;
    this.hints = [] as any;
    this.typedUser = '';
    this.selectedUser = <SelectedUser>{};
  }

  deleteUser(user): void {
    this.selectedUsers.splice(this.selectedUsers.indexOf(user), 1);
  }

  deselectAll(): void {
    this.allUsersSelected = false;
  }

  sendEmail(): void {
    this.emailDto.selectedUsers = this.selectedUsers;
    this.emailDto.emailSubject = this.emailSubject;
    this.emailDto.emailBody = this.emailBody;

    if (this.emailSubject && this.emailBody) {
      if (this.allUsersSelected) {
        this.administratorService.sendEmail(this.emailDto);
        // this.administratorService.receivedSelectedUserData.next('');

        this.allUsersSelected = false;
        this.userSelectedFromHints = false;
        this.selectedUsers = [] as any;
        this.hints = [] as any;
        this.emailSubject = '';
        this.emailBody = '';
        this.typedUser = '';
        this.selectedUser = <SelectedUser>{};
      } else if (this.selectedUsers.length > 0) {
        this.administratorService.sendEmail(this.emailDto);
        // this.administratorService.receivedSelectedUserData.next('');

        this.allUsersSelected = false;
        this.userSelectedFromHints = false;
        this.selectedUsers = [] as any;
        this.hints = [] as any;
        this.emailSubject = '';
        this.emailBody = '';
        this.typedUser = '';
        this.selectedUser = <SelectedUser>{};
      } else {
        alert('Select users to send email')
      }
    } else {
      alert('Email subject and body are not filled')
    }
  }

  onInputFocus(): void {
    this.inputFieldFocus = true;
    this.hints = [] as any;
    this.typedUser = '';
    this.selectedUser = <SelectedUser>{};

    this.getHints(this.typedUser || '');
  }

  onInputBlur(): void {
    setTimeout(() => {
      this.inputFieldFocus = false;
    }, 100);
  }

}
