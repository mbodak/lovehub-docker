import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../../services/photos.service';
import * as jwt_decode from 'jwt-decode';
import { Photo } from '../../models/photo';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-photo-slider',
  templateUrl: './photo-slider.component.html',
  styleUrls: ['./photo-slider.component.scss']
})

export class PhotoSliderComponent implements OnInit {

  filesToUpload: FileList;
  userId: number;
  userIdUrl: number;
  photos: Photo[] = [ {userId: 0, _id: '', base64: '', avatar: false, name: ''} ];

  constructor(private photosService: PhotosService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.userId = parseInt(jwt_decode(localStorage.getItem('jwt_token')).id, 10);
    this.route.params.subscribe(params => {
      this.userIdUrl = parseInt(params['id'], 10);
    });

    this.photosService.getPhotos(this.userIdUrl)
      .subscribe(items => {
        this.photos = items;
      });
  }

  deletePhoto(photoId: string) {
    if (confirm('Delete photo?')) {
      this.photosService.deletePhoto(photoId).subscribe(() => {
        this.photosService.getPhotos(this.userId)
          .subscribe(items => {
            this.photos = items;
          });
      });
    } else { return; }
  }

  fileChangeEvent(fileInput: any) {
    console.log('FileChangeEvent');
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
    this.photosService.uploadPhoto(fileRes, this.userId).subscribe(() => {
      this.photosService.getPhotos(this.userId)
        .subscribe(items => {
          this.photos = items;
        });
    });
  }

  toDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }



}
