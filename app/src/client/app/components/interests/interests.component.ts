import { Component, OnInit } from '@angular/core';

import { InterestsService } from '../../services/interests.service';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: [
    '../administrator/shared/normalize.scss',
    '../administrator/shared/default-styles.scss',
    './interests.component.scss'
  ]
})
export class InterestsComponent implements OnInit {
  public editMode = false;
  public inputFieldFocus = false;
  public interests: string[] = ['reading', 'football', 'tv watching', 'skiing', 'snowboarding', 'skydiving', 'skating', 'swimming', 'traveling', 'working', 'etc.'];
  public typedInterest: string;
  public unsavedAddedInterests: string[] = [];
  public unsavedDeletedInterests: string[] = [];
  public hintsList: string[] = [];
  public hintsToShowList: string[] = ['reading', 'football', 'tv watching'];

  constructor(private interestsService: InterestsService) {
  }

  ngOnInit() {
  }

  // Add interest from input field
  addInterest() {
    this.unsavedAddedInterests.push(this.typedInterest);
    this.typedInterest = '';
  }

  // Add interest from drop down hints
  addInterestFromHint(hint) {
    this.typedInterest = hint;
  }

  // Delete interest from interest list in user profile back at DB
  deleteInterest(interest) {
    this.unsavedDeletedInterests.push(interest);
  }

  // Save changes and exit editing mode
  saveChanges() {
    const interests = this.interests;
    const addedInterests = this.unsavedAddedInterests;
    const deletedInterests = this.unsavedDeletedInterests;
    const addedInterestsLength = this.unsavedAddedInterests.length;
    const deletedInterestsLength = this.unsavedDeletedInterests.length;

    if (deletedInterestsLength) {
      for (let i = 0; i < deletedInterestsLength; i += 1) {
        if (interests.includes(deletedInterests[i])) {
          interests.splice(interests.indexOf(deletedInterests[i]), 1);
        }
      }
    }

    if (addedInterestsLength) {
      this.interests = [...interests, ...addedInterests];
    }

    this.editMode = false;

    console.log(this.interests);
  }

  // Toggle editing mode and undo changes on exit
  toggleEditMode() {
    this.editMode = !this.editMode;
    this.unsavedAddedInterests = [];
    this.unsavedDeletedInterests = [];
  }

  // Show hints on input filed in focus
  onInputFocus() {
    this.inputFieldFocus = true;
  }

  onInputBlur() {
    this.inputFieldFocus = false;
  }

}
