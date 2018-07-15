import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../../services/photos.service';
import * as jwt_decode from 'jwt-decode';
import { Photo } from '../../models/photo';
import { Like } from '../../models/like';
import { LikesService } from '../../services/likes.service';


@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss']
})
export class LikesComponent implements OnInit {

  userId: number;
  userId2: number;
  likes: Like[];
  photos: Photo[] = [ {userId: 0, _id: '', base64: '', avatar: false, name: ''} ];

  constructor(private photosService: PhotosService, private likesService: LikesService) { }

  ngOnInit() {
    this.userId = parseInt(jwt_decode(localStorage.getItem('jwt_token')).id, 10);
    this.photosService.getPhotos(this.userId)
      .subscribe(items => {
        this.photos = items;
      });



  }

  getLikesForUser(userId: number) {
    this.likesService.getLikesByUserId(this.userId)
      .subscribe(likes => {
        this.likes = likes;
      });
  }



}
