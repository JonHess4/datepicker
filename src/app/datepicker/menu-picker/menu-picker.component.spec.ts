import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPickerComponent } from './menu-picker.component';

describe('MenuPickerComponent', () => {
  let component: MenuPickerComponent;
  let fixture: ComponentFixture<MenuPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
