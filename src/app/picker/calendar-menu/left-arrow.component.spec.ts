import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftArrowComponent } from './left-arrow.component';

describe('LeftArrowComponent', () => {
  let component: LeftArrowComponent;
  let fixture: ComponentFixture<LeftArrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftArrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
