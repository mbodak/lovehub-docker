import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorSendEmailComponent } from './administrator-send-email.component';

describe('AdministratorSendEmailComponent', () => {
  let component: AdministratorSendEmailComponent;
  let fixture: ComponentFixture<AdministratorSendEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorSendEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorSendEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
