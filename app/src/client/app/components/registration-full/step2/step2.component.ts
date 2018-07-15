import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['../registration-full.component.scss']
})
export class Step2Component implements OnInit {

  @Output() orientationEvent = new EventEmitter<string>();
  constructor() { }
  ngOnInit() {
  }
  selectOrientation(orientation: string) {
    this.orientationEvent.emit(orientation);
  }
}
