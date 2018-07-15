import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WindowService } from '../../services/window.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @ViewChild('footer') elementView: ElementRef;

  contacts = {
    phones:['+38 012 345 67 8*','+38 012 345 67 8*', '+38 012 345 67 8*'],
    address: 'Kyiv, Somestr str., 5',
    mail: 'write@us.now'
  };

  router: any;

  constructor(_router: Router, private windowService: WindowService) {
    this.router = _router;
  }

  ngOnInit() {}

  ngAfterViewInit(){
    const footerHeight = this.elementView.nativeElement.offsetHeight;

    this.windowService.footerHeight = footerHeight;
  }
}
