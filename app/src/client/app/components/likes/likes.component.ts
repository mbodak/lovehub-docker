import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../../services/photos.service';
import * as jwt_decode from 'jwt-decode';
import { Photo } from '../../models/photo';
import { Like } from '../../models/like';
import { LikesService } from '../../services/likes.service';
import { ActivatedRoute } from '@angular/router';
import { UsersProfileService } from '../../services/users-profile.service';
import { UserProfile } from '../../models/user-profile';
import 'rxjs/add/operator/map';
import {SearchParam} from '../user-search/shared/search-param';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss']
})
export class LikesComponent implements OnInit {

  userId: number;
  userIdUrl: number;
  like: Like;
  term: SearchParam = null;

  whatUserLike: number[];
  likesForUser: number[];
  mutualLikes: number[] = [];

  avatars_1: Photo[] = [ {userId: 0, _id: '', base64: '', avatar: true, name: ''} ];
  avatars_2: Photo[] = [ {userId: 0, _id: '', base64: '', avatar: true, name: ''} ];
  avatars_3: Photo[] = [ {userId: 0, _id: '', base64: '', avatar: true, name: ''} ];

  users_1: any[] = [];
  users_2: any[] = [];
  users_3: any[] = [];

  photos: Photo[] = [ {userId: 0, _id: '', base64: '', avatar: false, name: ''} ];

  constructor(private photosService: PhotosService,
              private likesService: LikesService,
              private usersProfileService: UsersProfileService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.like = new Like();
    this.userId = parseInt(jwt_decode(localStorage.getItem('jwt_token')).id, 10);
    this.route.params.subscribe(params => {
      this.userIdUrl = parseInt(params['id'], 10);
      console.log('URLID', params['id']);
    });

    this.photosService.getPhotos(this.userId)
      .subscribe(items => {
        this.photos = items;
      });

    this.findMutualLikes();

    this.getLikesForUser()
    .subscribe(likesForUser => {
      this.likesForUser = likesForUser;
      this.getUsersAva(this.likesForUser, this.avatars_3);
      this.getUsersName(this.likesForUser, this.users_3);
      console.log('FOR:', this.likesForUser);
    });

    this.getWhatUserLike()
    .subscribe(whatUserLike => {
      this.whatUserLike = whatUserLike;
      this.getUsersAva(this.whatUserLike, this.avatars_2);
      this.getUsersName(this.whatUserLike, this.users_2);
      console.log('WHAT:', this.whatUserLike);
    });
  }

  addLike(otherId: number) {
    this.like.whoLike = this.userId;
    this.like.whatLike = otherId;
    this.likesService.addLike(this.like as Like).subscribe();
    console.log('Like wrote');
  }

  getWhatUserLike(): Observable<number[]> {
    return this.likesService.getWhatLikeUser(this.userId);
  }

  getLikesForUser(): Observable<number[]> {
    return this.likesService.getWhoLikesUser(this.userId);
  }

  // getLikes() {
  //   this.likesService.getLikes().subscribe(likes => {
  //     this.likes = likes;
  //     console.log('LIKES:', this.likes);
  //   });
  // }

  dislike(otherId: number) {
    this.likesService.dislikeUser(this.userId, otherId).subscribe();
    console.log('Dislike');
  }

  findMutualLikes() {
    Observable.zip(this.getWhatUserLike(), this.getLikesForUser()).subscribe(
      result => {
        result[0].forEach(like1 => {
          result[1].forEach(like2 => {
            if (like1 == like2) {
              this.mutualLikes.push(like1);
            }
          });
      });
        this.getUsersAva(this.mutualLikes, this.avatars_1);
        this.getUsersName(this.mutualLikes, this.users_1);
        console.log('MUTUAL:', this.mutualLikes);
    });
  }

  getUsersAva(arr: number[], avatars: Photo[]) {
    arr.forEach(userid => {
      this.photosService.getAvatar(userid).subscribe(avatar => {
        avatars.push(avatar);
      });
    });
  }

  getUsersName(arr: number[], users: any[]) {
    users = [];
    arr.forEach(userid => {
      this.usersProfileService.findByUserId(userid).subscribe(user => {
        users.push(user);
      });
    });
  }
}
