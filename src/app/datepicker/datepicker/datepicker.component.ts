import { Component, ElementRef, OnInit } from '@angular/core';
import { ICalendarCell } from '../models/calendar-cell';
import { ICalendarMenu } from '../models/calendar-menu';
import { CalendarCellService } from '../services/calendar-cell.service';

@Component({
	selector: 'app-datepicker',
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

	public selectedDate: Date = null;

	private calendarMenu: ICalendarMenu;

	private calendarCells: ICalendarCell[];

	constructor(
		private calendarCellService: CalendarCellService,
		public elementRef: ElementRef
	) { }

	ngOnInit(): void {

		const today: Date = new Date();

		this.calendarMenu = {
			type: 'day',
			monthName: '' + today.getMonth(),
			year: today.getFullYear()
		};

		this.calendarCells = this.calendarCellService.getDateCells(today.getMonth(), today.getFullYear());

	}

	/**
	 * start property setters
	 */

	private setCalendarMenu(type: string, monthName: string, year: number): void {
		this.calendarMenu.type = type;
		this.calendarMenu.monthName = monthName;
		this.calendarMenu.year = year;
	}

	private setCalendarCells(month: number, year: number): void {
		if (month) {
			this.calendarCells = this.calendarCellService.getDateCells(month, year);
		} else {
			this.calendarCells = this.calendarCellService.getYearCells(year);
		}
	}

	/**
	 * end property setters
	 */

	/**
	 * start logic methods
	 */

	/**
	 * end logic methods
	 */

	/**
	 * start child event emitter methods
	 */

	private onDisplayToggle(newDisplay: string): void {

	}

	private onPagination(numPages: number): void {

	}

	private onCellSelected(selectedCell: ICalendarCell): void {

	}

	private onMouseOverCell(cell: ICalendarCell): void {

	}

	private onMouseOutCell(cell: ICalendarCell): void {

	}

	private onMove(direction: string): void {

	}

	/**
	 * end child event emitter methods
	 */

}
