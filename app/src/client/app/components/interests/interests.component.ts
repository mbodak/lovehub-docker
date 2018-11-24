import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import * as jwt_decode from 'jwt-decode';

import { InterestsService } from '../../services/interests.service';

interface Results {
  interests: string[];
  hints: string[];
}

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: [
    '../administrator/shared/normalize.scss',
    '../administrator/shared/default-styles.scss',
    './interests.component.scss'
  ]
})
export class InterestsComponent implements OnInit, OnDestroy {
  public connection: any;
  public currentUserId: number;
  public profileOwnerId: number;
  public editMode = false;
  public editingIsForbidden = false;
  public inputFieldFocus = false;
  public validationMessageIsVisible = false;
  public isInputValid = true;
  public hints: string[] = [];
  public interests: string[] = [];
  public interestsToShow: string[] = [];
  public interestsToSave: string[] = [];
  public interestsToDelete: string[] = [];
  public typedInterest: string;
  public typedInterestChanged: Subject<string> = new Subject<string>();
  public changesInInterests = {
    interestsToSave: this.interestsToSave,
    interestsToDelete: this.interestsToDelete
  };

  constructor(
      private interestsService: InterestsService,
      private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.profileOwnerId = parseInt(params.id, 10);
      this.distinctProfileOwner();
      this.getInterests();
    });

    this.typedInterestChanged
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(input => this.typedInterest = input);
  }

  ngOnInit() {
    this.connection = this.interestsService.getData().subscribe((results: Results) => {
      this.hints = results.hints;
      this.interests = results.interests;

      if (this.interests && this.interests.length > 0) {
        if (!this.editingIsForbidden) {
          this.interestsToShow = [...new Set([...this.interests, ...this.interestsToShow])]
            .filter(interest => !!interest);
        } else {
          this.interestsToShow = [...this.interests]
            .filter(interest => !!interest);
        }
      }
    });

    this.route.url.subscribe(() => {
      if (this.profileOwnerId) {
        this.distinctProfileOwner();
        this.getInterests();
      }
    });

    if (this.profileOwnerId) {
      this.distinctProfileOwner();
      this.getInterests();
    }
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
    this.typedInterestChanged.unsubscribe();
  }

  async inputChange(input: string) {
    await this.typedInterestChanged.next(input);
    this.getHints(this.typedInterest);
  }

  getInterests(): void {
    if (this.profileOwnerId) {
      this.interestsService.getInterests(this.profileOwnerId);
    }
  }

  getHints(input): void {
    if (input) {
      this.interestsService.getHints(input.trim().toLowerCase());
    } else {
      this.interestsService.getHints('');
    }
  }

  addInterest(): void {
    const checkInputPattern = /^[a-zA-Z\s]+$/g;

    if (this.typedInterest) {
      if (checkInputPattern.test(this.typedInterest)) {
        this.interestsToSave.push(this.typedInterest.trim().toLowerCase());
        this.interestsToShow = [...new Set([...this.interestsToShow, ...this.interestsToSave])]
          .sort((a, b) => a.localeCompare(b));
        this.typedInterest = '';
      } else {
        this.isInputValid = false;
      }
    } else {
      this.isInputValid = false;
    }
  }

  addInterestFromHint(hint): void {
    this.typedInterest = hint;
  }

  deleteInterest(interest): void {
    this.interestsToDelete.push(interest);
    this.interestsToShow.splice(this.interestsToShow.indexOf(interest), 1);

    if (this.interestsToSave.indexOf(interest)) {
      this.interestsToSave.splice(this.interestsToSave.indexOf(interest), 1);
    }
  }

  saveChanges(): void {
    this.interests = this.interestsToShow;
    this.interestsService.saveChanges(this.changesInInterests);
    this.editMode = false;
    this.validationMessageIsVisible = false;
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    this.validationMessageIsVisible = false;

    if (!this.editMode) {
      this.interestsToShow = this.interests;
      this.interestsToSave = [];
      this.interestsToDelete = [];
    }
  }

  onInputFocus(): void {
    this.inputFieldFocus = true;
    this.validationMessageIsVisible = true;
    this.isInputValid = true;
    this.getHints(this.typedInterest || '');
  }

  onInputBlur(): void {
    setTimeout(() => {
      this.inputFieldFocus = false;
    }, 100);
  }

  distinctProfileOwner(): void {
    if (localStorage.getItem('jwt_token')) {
      this.currentUserId = parseInt(jwt_decode(localStorage.getItem('jwt_token')).id, 10);
      this.interestsService.currentUserId = this.currentUserId;
    }

    (this.profileOwnerId === this.currentUserId) ? (this.editingIsForbidden = false) : (this.editingIsForbidden = true);
  }

}
