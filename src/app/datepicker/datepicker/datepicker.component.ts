import { Component, ElementRef, OnInit } from '@angular/core';
import { ICalendarCell } from '../models/calendar-cell';
import { ICalendarMenu } from '../models/calendar-menu';
import { CalendarCellService } from '../services/calendar-cell.service';
import { CellController, DatepickerCellController } from '../services/cell-controller';

@Component({
	selector: 'app-datepicker',
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

	public set key(newKey: number) { this._key = newKey; }
	private _key: number = Math.floor(Math.random() * 10000);

	public set cellController(newCellController: CellController) { this._cellController = newCellController; }
	private _cellController: CellController = new DatepickerCellController();

	public get selectedDate(): Date { return this._selectedDate; }
	private _selectedDate: Date = null;

	private calendarMenu: ICalendarMenu;

	private calendarCells: ICalendarCell[];

	private trackerDate: Date;
	private trackerYear: number;

	private set tabableDate(newTabableDate: ICalendarCell) {
		this._tabableDate.tabIndex = -1;
		this._tabableDate = newTabableDate;
		this._tabableDate.tabIndex = 0;
	}
	private _tabableDate: ICalendarCell;
	private set tabableYear(newTabableYear: ICalendarCell) {
		this._tabableYear.tabIndex = -1;
		this._tabableYear = newTabableYear;
		this._tabableYear.tabIndex = 0;
	}
	private _tabableYear: ICalendarCell;

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
		todayCalendarYearCells[0].tabIndex = 0;
		this._tabableYear = todayCalendarYearCells[0];
		const monthOffset: number = this.calendarCellService.getMonthOffset(today.getMonth(), today.getFullYear());
		todayCalendarDateCells[today.getDate() + monthOffset - 1].isToday = true;
		todayCalendarDateCells[today.getDate() + monthOffset - 1].tabIndex = 0;
		this._tabableDate = todayCalendarDateCells[today.getDate() + monthOffset - 1];
	}

	/**
	 * start property setters
	 */

	private setCalendarMenuProperties(type: string, monthName: string, year: number): void {
		this.calendarMenu.type = type;
		this.calendarMenu.monthName = monthName;
		this.calendarMenu.year = year;
	}

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
	 * start child event emitter methods
	 */

	private onDisplayToggle(newDisplay: string): void {
		if (this.calendarMenu.type === 'day') {
			this.calendarMenu.type = 'year';
			this.setCalendarCells(null, this.trackerYear);
		} else if (this.calendarMenu.type === 'year') {
			this.calendarMenu.type = 'day';
			this.setCalendarCells(this.trackerDate.getMonth(), this.trackerDate.getFullYear());
		}
	}

	private onPagination(numPages: number): void {
		if (this.calendarMenu.type === 'day') {
			this.pageMonth(numPages);
		} else if (this.calendarMenu.type === 'year') {
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
			this.trackerDate.setFullYear(newSelectedYearValue);

			const yearCells: ICalendarCell[] = this.calendarCellService.getYearCells(this._key, this.trackerYear);
			this.tabableYear = yearCells[this.trackerDate.getFullYear() - this.trackerYear];
		}

		this.calendarMenu.monthName = '' + this.trackerDate.getMonth();
		this.calendarMenu.year = this.trackerDate.getFullYear();
		this.calendarCells = this.calendarCellService.getDateCells(this._key, this.trackerDate.getMonth(), this.trackerDate.getFullYear());

		const monthOffset: number = this.calendarCellService.getMonthOffset(this.trackerDate.getMonth(), this.trackerDate.getFullYear());
		console.log(this.tabableDate);
		this.tabableDate = this.calendarCells[Math.min(this.calendarCells.length - 1, monthOffset + this._tabableDate.value - 1)];
	}

	private pageYears(numPages: number): void {
		this.trackerYear += numPages * 28;
		const index: number = this.calendarCells.indexOf(this.tabableYear);
		this.calendarCells = this.calendarCellService.getYearCells(this._key, this.trackerYear);
		this.tabableYear = this.calendarCells[index];
	}

	private onCellSelected(selectedCell: ICalendarCell): void {
		if (this.calendarMenu.type === 'day') {
			this._selectedDate = new Date(this.trackerDate.getFullYear(), this.trackerDate.getMonth(), selectedCell.value);
			this._cellController.onDateCellSelected(selectedCell, this._selectedDate);
		} else if (this.calendarMenu.type === 'year') {
			this.trackerDate.setFullYear(selectedCell.value);
			this._cellController.onYearCellSelected(selectedCell);
			this.setCalendarCells(this.trackerDate.getMonth(), this.trackerDate.getFullYear());
			this.calendarMenu.type = 'day';
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

		if (this.calendarMenu.type === 'day') {
			map.set('up', -7);
			map.set('down', 7);
			distance = map.get(direction);
			index = this.calendarCells.indexOf(this._tabableDate);

			if (this.calendarCells[index + distance]) {
				this.tabableDate = this.calendarCells[index + distance];
				const monthOffset: number = this.calendarCellService.getMonthOffset(this.trackerDate.getMonth(), this.trackerDate.getFullYear());
				this.focusTabableCell(index + distance - monthOffset);
			}

		} else if (this.calendarMenu.type === 'year') {
			map.set('up', -4);
			map.set('down', 4);
			distance = map.get(direction);
			index = this.calendarCells.indexOf(this._tabableYear);

			if (this.calendarCells[index + distance]) {
				this.tabableYear = this.calendarCells[index + distance];
				this.focusTabableCell(index + distance);
			}
		}
	}

	private focusTabableCell(index: number): void {
		const displayItems: HTMLElement[] = this.elementRef.nativeElement.getElementsByClassName('circle');
		displayItems[index].focus();
	}

	/**
	 * end child event emitter methods
	 */

}
