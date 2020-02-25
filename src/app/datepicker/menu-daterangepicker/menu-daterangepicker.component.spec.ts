import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDaterangepickerComponent } from './menu-daterangepicker.component';

describe('DaterangepickerMenuComponent', () => {
	let component: MenuDaterangepickerComponent;
	let fixture: ComponentFixture<MenuDaterangepickerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MenuDaterangepickerComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MenuDaterangepickerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
