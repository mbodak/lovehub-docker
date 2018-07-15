import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorUsersManagementComponent } from './administrator-users-management.component';

describe('AdministratorUsersManagementComponent', () => {
  let component: AdministratorUsersManagementComponent;
  let fixture: ComponentFixture<AdministratorUsersManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorUsersManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorUsersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
