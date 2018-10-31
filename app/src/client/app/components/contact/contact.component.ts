import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contacts = {
    phones:['+38 012 345 67 8*','+38 012 345 67 8*', '+38 012 345 67 8*'],
    address: 'Kyiv, Somestr str., 5',
    mail: 'write@us.now'
  };

  constructor() { }

  ngOnInit() {}
}
