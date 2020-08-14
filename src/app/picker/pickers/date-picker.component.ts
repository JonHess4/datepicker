import { Component, ElementRef, OnInit } from '@angular/core';
import { CalendarCellService } from '../services/calendar-cell.service';
import { Picker } from './picker';

@Component({
	selector: 'app-date-picker',
	templateUrl: './date-picker.component.html',
	styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent extends Picker implements OnInit {

	constructor(
		calendarCellService: CalendarCellService,
		elementRef: ElementRef
	) {
		super(calendarCellService, elementRef);
	}

	ngOnInit(): void {
	}

	protected onPagination(direction: string): void {
		throw new Error('Method not implemented.');
	}
	protected onViewChange(newView: string): void {
		super.onViewChange(newView);
	}
	protected onSelect(selectedCell: any): void {
		throw new Error('Method not implemented.');
	}
	protected onTraversal(direction: string): void {
		throw new Error('Method not implemented.');
	}
	protected onHoverChange(newHoveredCell: any): void {
		throw new Error('Method not implemented.');
	}

}
