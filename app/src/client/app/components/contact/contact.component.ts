import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contacts = {
    phones: ['+38 095 447 48 12', '+38 067 236 45 54'],
    address: 'Kyiv, Somestr Str., 228',
    mail: 'feedback@gmail.com'
  };

  constructor() { }

  ngOnInit() {}
}
