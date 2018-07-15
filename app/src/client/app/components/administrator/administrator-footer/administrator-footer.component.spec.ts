import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorFooterComponent } from './administrator-footer.component';

describe('AdministratorFooterComponent', () => {
  let component: AdministratorFooterComponent;
  let fixture: ComponentFixture<AdministratorFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
