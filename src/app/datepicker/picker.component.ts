import { ElementRef, Input, OnInit } from '@angular/core';
import { ICalendarCell, IDateCell } from './models/picker-cell';
import { IDatepickerMenu, IPickerMenu } from './models/picker-menu';
import { PickerService } from './services/picker.service';

export abstract class PickerComponent implements OnInit {

	protected minDate: Date;
	protected maxDate: Date;
	public set min(minDate: Date) { this.minDate = minDate; }
	public set max(maxDate: Date) { this.maxDate = maxDate; }

	// this key is used to retrieve the correct data from pickerCellService
	protected readonly mKey: number = Math.floor(Math.random() * 10000);

	// holds the info for the picker menu
	protected mPickerMenu: IPickerMenu;

	// holds reference to which cell can be tabbed to
	protected mTabableDate: IDateCell;
	protected mTabableYear: ICalendarCell;

	// keeps track of what view we are on, like a bookmark
	protected mTrackerDate: Date;
	protected mTrackerYear: number;

	constructor(
		protected pickerService: PickerService,
		// gives the directive access to the instance's htmlelemnt
		public elementRef: ElementRef
	) { }

	ngOnInit(): void {
		this.markToday();
		this.mTrackerDate = new Date();
		this.mTrackerDate.setDate(1);
		this.mTrackerYear = this.mTrackerDate.getFullYear();
	}

	private markToday(): void {
		const today: Date = new Date();

		// date cell
		const dateCells: IDateCell[] = this.pickerService.getDateCells(this.mKey, today);
		const monthOffset: number = this.pickerService.getMonthOffset(today.getMonth(), today.getFullYear());
		dateCells[today.getDate() + monthOffset - 1].isToday = true;

		// year cell
		const yearCells: ICalendarCell[] = this.pickerService.getYearCells(this.mKey, today.getFullYear());
		yearCells[0].isToday = true;
	}

	protected setDisplay(pickerMenu: IDatepickerMenu, newDisplay: string): void {
		pickerMenu.display = newDisplay;
	}

	protected updateTabableDate(newTabableDate: IDateCell): void {
		if (this.mTabableDate) {
			this.mTabableDate.tabIndex = -1;
		}
		this.mTabableDate = newTabableDate;
		this.mTabableDate.tabIndex = 0;
	}

	protected updateTabableYear(newTabableYear: ICalendarCell): void {
		if (this.mTabableYear) {
			this.mTabableYear.tabIndex = -1;
		}
		this.mTabableYear = newTabableYear;
		this.mTabableYear.tabIndex = 0;
	}

	protected pageMonth(numPages: number): void {
		// positive 1 if forward, negative one if backwards
		const direction: number = Math.abs(numPages) / numPages;
		// number of years the paging will span
		let numYears: number;
		// the month we will be paging to
		let newTrackerDateMonth: number;
		// the year that we will be paging to
		let newTrackerDateYear: number;

		numYears = Math.floor(Math.abs(numPages + this.mTrackerDate.getMonth()) / 12);
		numYears += (((numPages % 12) + this.mTrackerDate.getMonth() < 0) ? 1 : 0);

		newTrackerDateYear = this.mTrackerDate.getFullYear() + (numYears * direction);

		newTrackerDateMonth = ((numPages % 12) + this.mTrackerDate.getMonth() + 12) % 12;
		this.mTrackerDate.setMonth(newTrackerDateMonth);

		if (this.mTrackerDate.getFullYear() !== newTrackerDateYear) {
			this.mTrackerDate.setFullYear(newTrackerDateYear);

			while (newTrackerDateYear - this.mTrackerYear >= 28) {
				this.mTrackerYear += 28;
			}
			while (newTrackerDateYear - this.mTrackerYear < 0) {
				this.mTrackerYear -= 28;
			}

			const yearCells: ICalendarCell[] = this.pickerService.getYearCells(this.mKey, this.mTrackerYear);
			this.updateTabableYear(yearCells[this.mTrackerDate.getFullYear() - this.mTrackerYear]);
		}

	}

	protected abstract onDateSelected(dateCell: IDateCell): void;

	protected abstract onDateTraversal(direction: string): void;

	protected abstract onYearTraversal(direction: string): void;

	protected focusTabableCell(index: number): void {
		const mCalendarCells: HTMLElement[] = this.elementRef.nativeElement.getElementsByClassName('circle');
		mCalendarCells[index].focus();
	}
}
