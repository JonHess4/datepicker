import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDatepickerComponent } from './menu-datepicker.component';

describe('CalendarMenuComponent', () => {
	let component: MenuDatepickerComponent;
	let fixture: ComponentFixture<MenuDatepickerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MenuDatepickerComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MenuDatepickerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
