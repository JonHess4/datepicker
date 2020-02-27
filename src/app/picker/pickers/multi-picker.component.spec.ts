import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiPickerComponent } from './multi-picker.component';

describe('MultiPickerComponent', () => {
  let component: MultiPickerComponent;
  let fixture: ComponentFixture<MultiPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
