import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaterangepickerMenuComponent } from './daterangepicker-menu.component';

describe('DaterangepickerMenuComponent', () => {
  let component: DaterangepickerMenuComponent;
  let fixture: ComponentFixture<DaterangepickerMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaterangepickerMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaterangepickerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
