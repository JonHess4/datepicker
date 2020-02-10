import { TestBed } from '@angular/core/testing';

import { CalendarCellService } from './calendar-cell.service';

describe('CalendarCellService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: CalendarCellService = TestBed.get(CalendarCellService);
		expect(service).toBeTruthy();
	});
});
