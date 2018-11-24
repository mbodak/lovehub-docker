import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(private notifService: NotificationService) { }

  ngOnInit() {
    const userId = jwt_decode(localStorage.getItem('jwt_token')).id;

    this.notifService.connect(userId);

    this.notifService.getNotifications().subscribe((data: any) => {
      const n = new Notification(data.title,  {
        body: data.text
      });

      setTimeout(n.close.bind(n), 3000); 
    });

  }

}
