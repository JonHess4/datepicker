import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellPickerComponent } from './cell-picker.component';

describe('CellPickerComponent', () => {
	let component: CellPickerComponent;
	let fixture: ComponentFixture<CellPickerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CellPickerComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CellPickerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
