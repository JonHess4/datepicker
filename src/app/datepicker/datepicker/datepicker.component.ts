import { Component, ElementRef, OnInit } from '@angular/core';
import { ICalendarCell } from '../models/calendar-cell';
import { ICalendarMenu } from '../models/calendar-menu';
import { CalendarCellService } from '../services/calendar-cell.service';
import { DatepickerSelectedDateResolver, SelectedDateResolver } from '../services/selected-date-resolver';

@Component({
	selector: 'app-datepicker',
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

	// this key is used to retrieve the correct data from calendarCellService
	public set key(newKey: number) { this.mKey = newKey; }
	private mKey: number = Math.floor(Math.random() * 10000);

	// the selectedDateResolver holds selected dates and resolves the visual effects of selecting a date
	public set selectedDateResolver(newSelectedDateResolver: SelectedDateResolver) { this.mSelectedDateResolver = newSelectedDateResolver; }
	private mSelectedDateResolver: SelectedDateResolver = new DatepickerSelectedDateResolver();

	private get mCurrentDisplayType(): string { return this.mCalendarMenu.type; }
	private set mCurrentDisplayType(newType: string) { this.mCalendarMenu.type = newType; }
	private mCalendarMenu: ICalendarMenu;

	public get calendarCells(): ICalendarCell[] { return this.mCalendarCells; }
	private mCalendarCells: ICalendarCell[];

	public get trackerDate(): Date { return this.mTrackerDate; }
	public set trackerDate(newTrackerDate: Date) { this.mTrackerDate = newTrackerDate; }
	private mTrackerDate: Date;
	private mTrackerYear: number;

	private mTabableDate: ICalendarCell;
	private mTabableYear: ICalendarCell;

	constructor(
		private calendarCellService: CalendarCellService,
		public elementRef: ElementRef
	) { }

	ngOnInit(): void {

		const today: Date = new Date();

		this.mCalendarMenu = {
			type: 'day',
			monthName: '' + today.getMonth(),
			year: today.getFullYear()
		};

		this.mCalendarCells = this.getDateCells(today.getFullYear(), today.getMonth());

		this.mTrackerDate = new Date(today.getFullYear(), today.getMonth(), 1);
		this.mTrackerYear = today.getFullYear();

		this.markToday();
	}

	private markToday(): void {
		const today: Date = new Date();
		const todayCalendarDateCells: ICalendarCell[] = this.calendarCellService.getDateCells(this.mKey, today.getMonth(), today.getFullYear());
		const todayCalendarYearCells: ICalendarCell[] = this.calendarCellService.getYearCells(this.mKey, today.getFullYear());

		todayCalendarYearCells[0].isToday = true;
		const monthOffset: number = this.calendarCellService.getMonthOffset(today.getMonth(), today.getFullYear());
		todayCalendarDateCells[today.getDate() + monthOffset - 1].isToday = true;

		this.mTabableDate = todayCalendarDateCells[today.getDate() + monthOffset - 1];
		this.mTabableDate.tabIndex = 0;
		this.mTabableYear = todayCalendarYearCells[0];
		this.mTabableYear.tabIndex = 0;
	}

	/**
	 * start property setters
	 */

	 private getDateCells(month: number, year: number): ICalendarCell[] {
		 return this.calendarCellService.getDateCells(this.mKey, month, year);
	 }

	 private getYearCells(year: number): ICalendarCell[] {
		 return this.calendarCellService.getYearCells(this.mKey, year);
	 }

	private updateTabableDate(newTabableDate: ICalendarCell): void {
		this.mTabableDate.tabIndex = -1;
		this.mTabableDate = newTabableDate;
		this.mTabableDate.tabIndex = 0;
	}

	private updateTabableYear(newTabableYear: ICalendarCell): void {
		this.mTabableYear.tabIndex = -1;
		this.mTabableYear = newTabableYear;
		this.mTabableYear.tabIndex = 0;
	}

	/**
	 * end property setters
	 */

	/**
	 * start child event emitter methods
	 */

	private onDisplayToggle(newDisplay: string): void {
		if (this.mCurrentDisplayType === 'day') {
			this.mCurrentDisplayType = 'year';
			this.getYearCells(this.mTrackerYear);
		} else if (this.mCurrentDisplayType === 'year') {
			this.mCurrentDisplayType = 'day';
			this.getDateCells(this.mTrackerDate.getMonth(), this.mTrackerDate.getFullYear());
		}
	}

	private onPagination(numPages: number): void {
		if (this.mCurrentDisplayType === 'day') {
			this.pageMonth(numPages);
		} else if (this.mCurrentDisplayType === 'year') {
			this.pageYears(numPages);
		}
	}

	private pageMonth(numPages: number): void {

		// positive 1 if forward, negative one if backwards
		const direction: number = Math.abs(numPages) / numPages;
		// number of years the paging will span
		let numYears: number;
		// the month we will be paging to
		let newTrackerDateMonth: number;
		// the year that we will be paging to
		let newTrackerDateYear: number;

		numYears = Math.floor(Math.abs(numPages + this.trackerDate.getMonth()) / 12);
		if ((numPages % 12) + this.trackerDate.getMonth() < 0) {
			numYears += 1;
		}
		newTrackerDateYear = this.trackerDate.getFullYear() + (numYears * direction);

		newTrackerDateMonth = ((numPages % 12) + this.trackerDate.getMonth() + 12) % 12;
		this.trackerDate.setMonth(newTrackerDateMonth);

		if (this.trackerDate.getFullYear() !== newTrackerDateYear) {
			this.trackerDate.setFullYear(newTrackerDateYear);

			while (newTrackerDateYear - this.mTrackerYear >= 28) {
				this.mTrackerYear += 28;
			}
			while (newTrackerDateYear - this.mTrackerYear < 0) {
				this.mTrackerYear -= 28;
			}

			const yearCells: ICalendarCell[] = this.getYearCells(this.mTrackerYear);
			this.updateTabableYear(yearCells[this.mTrackerDate.getFullYear() - this.mTrackerYear]);
		}

		this.mCalendarMenu.monthName = '' + this.trackerDate.getMonth();
		this.mCalendarMenu.year = this.trackerDate.getFullYear();
		this.mCalendarCells = this.getDateCells(this.trackerDate.getMonth(), this.trackerDate.getFullYear());

		const monthOffset: number = this.calendarCellService.getMonthOffset(this.trackerDate.getMonth(), this.trackerDate.getFullYear());
		this.updateTabableDate(this.mCalendarCells[Math.min(this.mCalendarCells.length - 1, monthOffset + this.mTabableDate.value - 1)]);
	}

	private pageYears(numPages: number): void {
		this.mTrackerYear += numPages * 28;
		const index: number = this.mCalendarCells.indexOf(this.mTabableYear);
		this.mCalendarCells = this.getYearCells(this.mTrackerYear);
		this.updateTabableYear(this.mCalendarCells[index]);
	}

	private onCellSelected(selectedCell: ICalendarCell): void {
		if (this.mCurrentDisplayType === 'day') {
			this.mSelectedDateResolver.onDateCellSelected(selectedCell);
			this.updateTabableDate(selectedCell);
		} else if (this.mCurrentDisplayType === 'year') {
			this.trackerDate.setFullYear(selectedCell.value);
			this.onDisplayToggle('day');
			this.mCalendarMenu.year = this.trackerDate.getFullYear();
			this.updateTabableYear(selectedCell);
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

		if (this.mCurrentDisplayType === 'day') {
			map.set('up', -7);
			map.set('down', 7);
			distance = map.get(direction);
			index = this.mCalendarCells.indexOf(this.mTabableDate);

			if (this.mCalendarCells[index + distance]) {
				this.updateTabableDate(this.mCalendarCells[index + distance]);
				const monthOffset: number = this.calendarCellService.getMonthOffset(this.trackerDate.getMonth(), this.trackerDate.getFullYear());
				this.focusTabableItem(index + distance - monthOffset);
			}

		} else if (this.mCurrentDisplayType === 'year') {
			map.set('up', -4);
			map.set('down', 4);
			distance = map.get(direction);
			index = this.mCalendarCells.indexOf(this.mTabableYear);

			if (this.mCalendarCells[index + distance]) {
				this.updateTabableYear(this.mCalendarCells[index + distance]);
				this.focusTabableItem(index + distance);
			}
		}
	}

	private focusTabableItem(index: number): void {
		const mCalendarCells: HTMLElement[] = this.elementRef.nativeElement.getElementsByClassName('circle');
		mCalendarCells[index].focus();
	}

	/**
	 * end child event emitter methods
	 */

}
