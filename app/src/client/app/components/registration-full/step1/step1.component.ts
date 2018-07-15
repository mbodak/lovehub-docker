import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['../registration-full.component.scss']
})
export class Step1Component implements OnInit {

  @Output() preferenceEvent = new EventEmitter<string>();
  constructor() { }
  ngOnInit() {
  }
  selectPreference(preference: string) {
    this.preferenceEvent.emit(preference);
  }
}
