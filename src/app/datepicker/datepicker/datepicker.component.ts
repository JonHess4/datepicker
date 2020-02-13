import { Component, ElementRef, OnInit } from '@angular/core';
import { ICalendarCell, IDateCell } from '../models/calendar-cell';
import { ICalendarMenu } from '../models/calendar-menu';
import { CalendarCellService } from '../services/calendar-cell.service';
import { DateCellStyler, DatepickerDateCellStyler } from '../services/date-cell-styler';

@Component({
	selector: 'app-datepicker',
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

	// this key is used to retrieve the correct data from calendarCellService
	public set key(newKey: number) { this._key = newKey; }
	private _key: number = Math.floor(Math.random() * 10000);

	// the dateCellStylist is used to 
	public set dateCellStyler(newDateCellStyler: DateCellStyler) { this._dateCellStyler = newDateCellStyler; }
	private _dateCellStyler: DateCellStyler = new DatepickerDateCellStyler();

	public get selectedDate(): Date { return this._selectedDate; }
	private _selectedDate: Date;

	private get currentDisplaytype(): string { return this.calendarMenu.type; }
	private set currentDisplaytype(newType: string) { this.calendarMenu.type = newType; }
	private calendarMenu: ICalendarMenu;

	private calendarCells: ICalendarCell[];

	private trackerDate: Date;
	private trackerYear: number;

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

		this.calendarCells = this.calendarCellService.getDateCells(this._key, today.getMonth(), today.getFullYear());

		this.trackerDate = new Date(today.getFullYear(), today.getMonth(), 1);
		this.trackerYear = today.getFullYear();

		this.markToday();
	}

	private markToday(): void {
		const today: Date = new Date();
		const todayCalendarDateCells: ICalendarCell[] = this.calendarCellService.getDateCells(this._key, today.getMonth(), today.getFullYear());
		const todayCalendarYearCells: ICalendarCell[] = this.calendarCellService.getYearCells(this._key, today.getFullYear());
		todayCalendarYearCells[0].isToday = true;
		const monthOffset: number = this.calendarCellService.getMonthOffset(today.getMonth(), today.getFullYear());
		todayCalendarDateCells[today.getDate() + monthOffset - 1].isToday = true;
	}

	/**
	 * start property setters
	 */

	private setCalendarCells(month: number, year: number): void {
		if (month) {
			this.calendarCells = this.calendarCellService.getDateCells(this._key, month, year);
		} else {
			this.calendarCells = this.calendarCellService.getYearCells(this._key, year);
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
		if (this.currentDisplaytype === 'day') {
			this.currentDisplaytype = 'year';
			this.setCalendarCells(null, this.trackerYear);
		} else if (this.currentDisplaytype === 'year') {
			this.currentDisplaytype = 'day';
			this.setCalendarCells(this.trackerDate.getMonth(), this.trackerDate.getFullYear());
		}
	}

	private onPagination(numPages: number): void {
		if (this.currentDisplaytype === 'day') {
			this.pageMonth(numPages);
		} else if (this.currentDisplaytype === 'year') {
			this.pageYears(numPages);
		}
	}

	private pageMonth(numPages: number): void {

		// positive 1 if forward, negative one if backwards
		const direction: number = Math.abs(numPages) / numPages;
		// number of years the paging will span
		let numYears: number;
		// the month we will be paging to
		let newTrackerMonth: number;
		// the year that we will be paging to
		let newSelectedYearValue: number;

		numYears = Math.floor(Math.abs(numPages + this.trackerDate.getMonth()) / 12);
		if ((numPages % 12) + this.trackerDate.getMonth() < 0) {
			numYears += 1;
		}
		newSelectedYearValue = this.trackerDate.getFullYear() + (numYears * direction);

		newTrackerMonth = ((numPages % 12) + this.trackerDate.getMonth() + 12) % 12;
		this.trackerDate.setMonth(newTrackerMonth);

		if (this.trackerDate.getFullYear() !== newSelectedYearValue) {

			while (newSelectedYearValue - this.trackerYear >= 28) {
				this.trackerYear += 28;
			}
			while (newSelectedYearValue - this.trackerYear < 0) {
				this.trackerYear -= 28;
			}
			// const yearCells: ICalendarCell[] = this.calendarCellService.getYearCells(this._key, this.trackerYear);
			this.trackerDate.setFullYear(newSelectedYearValue);
			// this.setTabableYear(this.selectedYear);
		}

		this.calendarMenu.monthName = '' + this.trackerDate.getMonth();
		this.calendarMenu.year = this.trackerDate.getFullYear();
		this.calendarCells = this.calendarCellService.getDateCells(this._key, this.trackerDate.getMonth(), this.trackerDate.getFullYear());

		const monthOffset: number = this.calendarCellService.getMonthOffset(this.trackerDate.getMonth(), this.trackerDate.getFullYear());
		// this.setTabableDate(this.displayItems[Math.min(this.displayItems.length - 1, monthOffset + this.tabableDate.value - 1)]);
	}

	private pageYears(numPages: number): void {
		this.trackerYear += numPages * 28;
		// const index: number = this.calendarCells.indexOf(this.tabableYear);
		this.calendarCells = this.calendarCellService.getYearCells(this._key, this.trackerYear);
		// this.setTabableYear(this.displayItems[index]);
	}

	private onCellSelected(selectedCell: ICalendarCell): void {
		if (this.currentDisplaytype === 'day') {
			this._dateCellStyler.onDateCellSelected(selectedCell as IDateCell);
			this._selectedDate = new Date(this.trackerDate.getFullYear(), this.trackerDate.getMonth(), selectedCell.value);
		} else if (this.currentDisplaytype === 'year') {
			this.trackerDate.setFullYear(selectedCell.value);
			this.setCalendarCells(this.trackerDate.getMonth(), this.trackerDate.getFullYear());
			this.currentDisplaytype = 'day';
			this.calendarMenu.year = this.trackerDate.getFullYear();
		}
	}

	private onMouseOverCell(cell: ICalendarCell): void {

	}

	private onMouseOutCell(cell: ICalendarCell): void {

	}

	private onMove(direction: string): void {
		let index: number;
		let distance: number;
		const map: Map<string, number> = new Map<string, number>();
		map.set('left', -1);
		map.set('right', 1);

		if (this.currentDisplaytype === 'day') {
			map.set('up', -7);
			map.set('down', 7);
			distance = map.get(direction);
			// index = this.calendarCells.indexOf(this.tabableDate);

			if (this.calendarCells[index + distance]) {
				// this.setTabableDate(this.calendarCells[index + distance]);
				const monthOffset: number = this.calendarCellService.getMonthOffset(this.trackerDate.getMonth(), this.trackerDate.getFullYear());
				// this.focusTabableItem(index + distance - monthOffset);
			}

		} else if (this.currentDisplaytype === 'year') {
			map.set('up', -4);
			map.set('down', 4);
			distance = map.get(direction);
			// index = this.calendarCells.indexOf(this.tabableYear);

			if (this.calendarCells[index + distance]) {
				// this.setTabableYear(this.calendarCells[index + distance]);
				this.focusTabableItem(index + distance);
			}
		}
	}

	private focusTabableItem(index: number): void {
		const displayItems: HTMLElement[] = this.elementRef.nativeElement.getElementsByClassName('display-item');
		displayItems[index].focus();
	}

	/**
	 * end child event emitter methods
	 */

}
