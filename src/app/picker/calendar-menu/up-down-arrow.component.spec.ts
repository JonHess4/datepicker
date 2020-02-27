import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpDownArrowComponent } from './up-down-arrow.component';

describe('UpDownArrowComponent', () => {
  let component: UpDownArrowComponent;
  let fixture: ComponentFixture<UpDownArrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpDownArrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpDownArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
