import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFullComponent } from './registration-full.component';

describe('RegistrationFullComponent', () => {
  let component: RegistrationFullComponent;
  let fixture: ComponentFixture<RegistrationFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
