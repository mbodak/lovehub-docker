import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'home-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  _breads: boolean;
  @Input() iden: string;

  @Input() 
  set breads(value) {
    this._breads = true;
  }
  constructor() { }

  ngOnInit() {
  }

}
