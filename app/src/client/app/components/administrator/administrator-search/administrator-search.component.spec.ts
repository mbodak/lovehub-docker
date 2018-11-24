import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorSearchComponent } from './administrator-search.component';

describe('AdministratorSearchComponent', () => {
  let component: AdministratorSearchComponent;
  let fixture: ComponentFixture<AdministratorSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
