import { Component, ElementRef, OnInit } from '@angular/core';
import { ICalendarCell, IDateCell } from '../models/picker-cell';
import { IDatepickerMenu } from '../models/picker-menu';
import { PickerComponent } from '../picker.component';
import { PickerCellService } from '../services/picker-cell.service';

@Component({
	selector: 'app-datepicker',
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent extends PickerComponent implements OnInit {

	protected mPickerMenu: IDatepickerMenu;
	private get mCurrentDisplay(): string { return this.mPickerMenu.display; }
	private set mCurrentDisplay(newDisplay: string) { this.mPickerMenu.display = newDisplay; }

	private mDateCells: IDateCell[];
	private mYearCells: ICalendarCell[];

	private mTrackerDate: Date;
	private mTrackerYear: number;

	private mTabableDate: IDateCell;
	private mTabableYear: ICalendarCell;

	constructor(
		pickerCellService: PickerCellService,
		elementRef: ElementRef
	) {
		super(pickerCellService, elementRef);
	}

	ngOnInit(): void {

		const today: Date = new Date();

		this.mTrackerDate = new Date(today.getFullYear(), today.getMonth(), 1);
		this.mTrackerYear = today.getFullYear();

		this.mPickerMenu = { display: 'day', month: today.getMonth(), year: today.getFullYear() };
	}

	private updateTabableDate(newTabableDate: IDateCell): void {
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
	 * start child event emitter methods
	 */

	private onPagination(numPages: number): void {
		if (this.mCurrentDisplay === 'day') {
			this.pageMonth(numPages);
		} else if (this.mCurrentDisplay === 'year') {
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

			const yearCells: ICalendarCell[] = this.pickerCellService.getYearCells(this.mKey, this.mTrackerYear);
			this.updateTabableYear(yearCells[this.mTrackerDate.getFullYear() - this.mTrackerYear]);
		}

		this.mPickerMenu.month = this.mTrackerDate.getMonth();
		this.mPickerMenu.year = this.mTrackerDate.getFullYear();

		const monthOffset: number = this.pickerCellService.getMonthOffset(this.mTrackerDate.getMonth(), this.mTrackerDate.getFullYear());
		this.updateTabableDate(this.mDateCells[Math.min(this.mDateCells.length - 1, monthOffset + this.mTabableDate.value - 1)]);
	}

	private pageYears(numPages: number): void {
		this.mTrackerYear += numPages * 28;
		const index: number = this.mYearCells.indexOf(this.mTabableYear);
		this.updateTabableYear(this.mYearCells[index]);
	}

	private onCellSelected(selectedCell: IDateCell): void {
		if (this.mCurrentDisplay === 'day') {
			this.updateTabableDate(selectedCell);
		} else if (this.mCurrentDisplay === 'year') {
			this.mTrackerDate.setFullYear(selectedCell.value);
			this.mPickerMenu.year = this.mTrackerDate.getFullYear();
			super.setDisplay(this.mPickerMenu, 'day');
			this.updateTabableYear(selectedCell);
		}
	}

	private onMove(direction: string): void {
		let index: number;
		let distance: number;
		const map: Map<string, number> = new Map<string, number>();
		map.set('left', -1);
		map.set('right', 1);

		if (this.mCurrentDisplay === 'day') {
			map.set('up', -7);
			map.set('down', 7);
			distance = map.get(direction);
			index = this.mDateCells.indexOf(this.mTabableDate);

			if (this.mDateCells[index + distance]) {
				this.updateTabableDate(this.mDateCells[index + distance]);
				const monthOffset: number = this.pickerCellService.getMonthOffset(this.mTrackerDate.getMonth(), this.mTrackerDate.getFullYear());
				this.focusTabableItem(index + distance - monthOffset);
			}

		} else if (this.mCurrentDisplay === 'year') {
			map.set('up', -4);
			map.set('down', 4);
			distance = map.get(direction);
			index = this.mYearCells.indexOf(this.mTabableYear);

			if (this.mYearCells[index + distance]) {
				this.updateTabableYear(this.mYearCells[index + distance]);
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
