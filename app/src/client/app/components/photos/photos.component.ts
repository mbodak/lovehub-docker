import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../../services/photos.service';
import { Photo } from '../../models/photo';
import * as jwt_decode from 'jwt-decode';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  filesToUpload: FileList;
  userId: number;
  avatar: Photo;
  photos: Photo[];

  constructor(private photosService: PhotosService) {}

  ngOnInit() {
    this.userId = parseInt(jwt_decode(localStorage.getItem('jwt_token')).id, 10);
    this.getAva();
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <FileList>fileInput.target.files;
    if (this.filesToUpload) {
      this.upload();
    }
    this.fileReset(fileInput);
  }

  fileReset(fileInput: any) {
    fileInput.target.value = '';
    return ;
  }

  async upload() {
    const file: File = this.filesToUpload[0];
    const fileBase64 = await this.toDataURL(file);
    const fileName = file.name;
    const fileRes = {base64: fileBase64, name: fileName};
    this.photosService.uploadAvatar(fileRes, this.userId).subscribe( () => this.getAva());
  }

  toDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  getAva() {
    this.photosService.getAvatar(this.userId)
      .subscribe(avatar => {
        this.avatar = avatar;
        console.log(this.avatar);
        this.displayAvatar();
      });
  }

  displayAvatar() {
    const obj = this.avatar;
    if (obj) {
      const img = new Image();
      img.src = obj.base64;
      document.getElementById('profile-photo').style.backgroundImage = 'url(\'' + img.src + '\')';
    } else {
      document.getElementById('profile-photo').style.backgroundImage =
        'url(https://kiittnp.in/8134d463acc8c7b66744a481847ab4b/assets/img/user.png)';
    }
  }

  // deletePhoto(photoId) {
  //   this.photosService.deletePhoto(photoId).subscribe();
  // }

}
