import { Component, OnChanges, OnInit } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { UsersProfileService } from '../../services/users-profile.service';
import { PhotosService } from '../../services/photos.service';

import { SearchParam } from './shared/search-param';
import { FilterParam } from './shared/filter-param';
import { UserProfile } from '../../models/user-profile';


interface UsersProfileAvatar {
  userProfile: UserProfile;
  avatar: string;
}

@Component({
  moduleId: module.id,
  selector: 'app-user-search',
  templateUrl: 'user-search.component.html',
  styleUrls: ['user-search.component.scss'],
})
export class UserSearchComponent implements OnInit, OnChanges {

  users: UserProfile[] = [];
  usersWithAva: UsersProfileAvatar[] = [];
  searchFilter: FilterParam;
  ageFilter: FilterParam;
  sexFFilter: FilterParam;
  sexMFilter: FilterParam;
  term: SearchParam = null;

  countItems: number;
  offsetItems = 0;
  currentPage = 1;
  itemsPerPage = 6;

  private searchTerms = new Subject<SearchParam>();

  constructor(private usersProfileService: UsersProfileService, private photosService: PhotosService) {
    this.searchFilter = new FilterParam('Name', 'search', 'firstName', '',
      'Enter a favourite name..');
    this.ageFilter = new FilterParam('Age', 'range', 'age', '0');
    this.sexMFilter = new FilterParam('Male', 'radio', 'sex', 'MALE');
    this.sexFFilter = new FilterParam('Female', 'radio', 'sex', 'FEMALE');
  }

  ngOnInit(): void {
    this.searchTerms
      .pipe(
        debounceTime(3000),
        distinctUntilChanged()
      )
      .subscribe((term) => {
        this.fetchData();
      });
  }

  ngOnChanges() {
  }

  search(term: SearchParam): void {
    this.term = term;
    this.searchTerms.next(term);
  }

  fetchData() {
    this.usersWithAva = [];
    return this.usersProfileService
      .searchUsers(this.term.searchName, this.term.searchValue, this.offsetItems, this.itemsPerPage)
      .subscribe(result => {
        console.log('UserSearchComponent');
        this.users = result.rows;
        this.countItems = result.count;
        for(let user of this.users) {
          this.getAvatars(user);
        }
      });
  }

  private getAvatars(user: UserProfile): void {
    this.photosService.getAvatar(user.userId).subscribe(photo => {
      this.usersWithAva.push({ userProfile: user, avatar: photo.base64 });
    });
  }

  onPageChange(page) {
    this.currentPage = page;
    this.offsetItems = (this.currentPage - 1) * this.itemsPerPage;
    this.fetchData();
  }
}
