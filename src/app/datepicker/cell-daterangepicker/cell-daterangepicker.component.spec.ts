import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellDaterangepickerComponent } from './cell-daterangepicker.component';

describe('CellDaterangepickerComponent', () => {
	let component: CellDaterangepickerComponent;
	let fixture: ComponentFixture<CellDaterangepickerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CellDaterangepickerComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CellDaterangepickerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
