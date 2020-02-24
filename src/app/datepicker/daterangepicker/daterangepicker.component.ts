import { Component, ElementRef, OnInit } from '@angular/core';
import { ICalendarCell, IDateCell } from '../models/picker-cell';
import { IDaterangepickerMenu } from '../models/picker-menu';
import { PickerComponent } from '../picker.component';
import { PickerService } from '../services/picker.service';

@Component({
	selector: 'app-daterangepicker',
	templateUrl: './daterangepicker.component.html',
	styleUrls: ['./daterangepicker.component.scss']
})
export class DaterangepickerComponent extends PickerComponent implements OnInit {

	private mFocusedInput: number;
	public set focusedInput(newInput: number) { this.mFocusedInput = newInput; }

	protected mPickerMenu: IDaterangepickerMenu;
	private get mLeftDisplay(): string { return this.mPickerMenu.leftMenu.display; }
	private set mLeftDisplay(newDisplay: string) { this.mPickerMenu.leftMenu.display = newDisplay; }
	private get mRightDisplay(): string { return this.mPickerMenu.rightMenu.display; }
	private set mRightDisplay(newDisplay: string) { this.mPickerMenu.rightMenu.display = newDisplay; }

	private mLeftDateCells: IDateCell[];
	private mRightDateCells: IDateCell[];
	private mLeftYearCells: ICalendarCell[];
	private mRightYearCells: ICalendarCell[];

	private mLeftTrackerDate: Date;
	private mRightTrackerDate: Date;
	private mLeftTrackerYear: number;
	private mRightTrackerYear: number;

	private mStartDateCell: IDateCell;
	private mEndDateCell: IDateCell;
	public get startDate(): Date { return (this.mStartDateCell ? this.mStartDateCell.date : null); }
	public get endDate(): Date { return (this.mEndDateCell ? this.mEndDateCell.date : null); }

	private mHoveredDateCell: IDateCell;

	constructor(
		pickerService: PickerService,
		elementRef: ElementRef
	) {
		super(pickerService, elementRef);
	}

	ngOnInit(): void {

		super.ngOnInit();

		const today: Date = new Date();

		this.mPickerMenu = {
			leftMenu: {
				display: 'day',
				month: this.pickerService.getMonthName(today.getMonth()),
				year: today.getFullYear()
			},
			rightMenu: {
				display: 'day',
				month: this.pickerService.getMonthName(today.getMonth() + 1),
				year: today.getFullYear()
			}
		};

		this.mLeftTrackerDate = new Date(today.getFullYear(), today.getMonth(), 1);
		this.mRightTrackerDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);

		this.mLeftDateCells = this.pickerService.getDateCells(this.mKey, this.mLeftTrackerDate);
		this.mRightDateCells = this.pickerService.getDateCells(this.mKey, this.mRightTrackerDate);

		this.mLeftTrackerYear = today.getFullYear();
		this.mRightTrackerYear = today.getFullYear();

		this.mLeftYearCells = this.pickerService.getYearCells(this.mKey, this.mLeftTrackerYear);
		this.mRightYearCells = this.pickerService.getYearCells(this.mKey, this.mRightTrackerYear);

		const offset: number = this.pickerService.getMonthOffset(this.mLeftTrackerDate.getMonth(), this.mLeftTrackerDate.getFullYear());
		this.mTabableDate = this.mLeftDateCells[offset + today.getDate() - 1];
		this.mTabableDate.tabIndex = 0;
		this.mTabableYear = this.mLeftYearCells[0];
		this.mTabableYear.tabIndex = 0;
	}

	private updateStartDateCell(newCell: IDateCell): void {
		if (this.mStartDateCell && !(this.mStartDateCell === this.mEndDateCell)) {
			this.mStartDateCell.isSelected = false;
		}
		this.mStartDateCell = newCell;
		if (this.mStartDateCell) {
			this.mStartDateCell.isSelected = true;
		}
	}

	private updateEndDateCell(newCell: IDateCell): void {
		if (this.mEndDateCell && !(this.mStartDateCell === this.mEndDateCell)) {
			this.mEndDateCell.isSelected = false;
		}
		this.mEndDateCell = newCell;
		if (this.mEndDateCell) {
			this.mEndDateCell.isSelected = true;
		}
	}

	private pushLeftCalendar(): void {
		this.mLeftTrackerDate.setFullYear(this.mRightTrackerDate.getFullYear());
		this.mLeftTrackerDate.setMonth(this.mRightTrackerDate.getMonth() - 1);
		this.mLeftDateCells = this.pickerService.getDateCells(this.mKey, this.mLeftTrackerDate);
		this.mPickerMenu.leftMenu.month = this.pickerService.getMonthName(this.mLeftTrackerDate.getMonth());
		this.mPickerMenu.leftMenu.year = this.mLeftTrackerDate.getFullYear();
	}

	private pushRightCalendar(): void {
		this.mRightTrackerDate.setFullYear(this.mLeftTrackerDate.getFullYear());
		this.mRightTrackerDate.setMonth(this.mLeftTrackerDate.getMonth() + 1);
		this.mRightDateCells = this.pickerService.getDateCells(this.mKey, this.mRightTrackerDate);
		this.mPickerMenu.rightMenu.month = this.pickerService.getMonthName(this.mRightTrackerDate.getMonth());
		this.mPickerMenu.rightMenu.year = this.mRightTrackerDate.getFullYear();
	}

	private onPaginationLeft(numPages: number): void {
		if (this.mLeftDisplay === 'day') {
			this.pageMonth(numPages);
		} else if (this.mLeftDisplay === 'year') {
			this.pageYears(numPages);
		}
	}

	private onPaginationRight(numPages: number): void {
		if (this.mRightDisplay === 'day') {
			this.pageMonth(numPages);
		} else if (this.mRightDisplay === 'year') {
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

		numYears = Math.floor(Math.abs(numPages + this.mLeftTrackerDate.getMonth()) / 12);
		numYears += (((numPages % 12) + this.mLeftTrackerDate.getMonth() < 0) ? 1 : 0);

		newTrackerDateYear = this.mLeftTrackerDate.getFullYear() + (numYears * direction);

		newTrackerDateMonth = ((numPages % 12) + this.mLeftTrackerDate.getMonth() + 12) % 12;
		this.mLeftTrackerDate.setMonth(newTrackerDateMonth);

		if (this.mLeftTrackerDate.getFullYear() !== newTrackerDateYear) {
			this.mLeftTrackerDate.setFullYear(newTrackerDateYear);

			while (newTrackerDateYear - this.mLeftTrackerYear >= 28) {
				this.mLeftTrackerYear += 28;
			}
			while (newTrackerDateYear - this.mLeftTrackerYear < 0) {
				this.mLeftTrackerYear -= 28;
			}

			const yearCells: ICalendarCell[] = this.pickerService.getYearCells(this.mKey, this.mLeftTrackerYear);
			this.updateTabableYear(yearCells[this.mLeftTrackerDate.getFullYear() - this.mLeftTrackerYear]);
		}

		this.mPickerMenu.leftMenu.month = this.pickerService.getMonthName(this.mLeftTrackerDate.getMonth());
		this.mPickerMenu.leftMenu.year = this.mLeftTrackerDate.getFullYear();

		this.mLeftDateCells = this.pickerService.getDateCells(this.mKey, this.mLeftTrackerDate);

		const monthOffset: number = this.pickerService.getMonthOffset(this.mLeftTrackerDate.getMonth(), this.mLeftTrackerDate.getFullYear());
		this.updateTabableDate(this.mLeftDateCells[Math.min(this.mLeftDateCells.length - 1, monthOffset + this.mTabableDate.value - 1)]);

		this.pushRightCalendar();

	}

	private pageYears(numPages: number): void {

	}

	//

	private onDateHover(newHoveredDateCell: IDateCell): void {
		this.mHoveredDateCell = newHoveredDateCell;
	}

	private onDateUnhover(): void {
		this.mHoveredDateCell = null;
	}

	protected onDateSelected(newCell: IDateCell): void {

		let newStartDateCell: IDateCell;
		let newEndDateCell: IDateCell;

		const tp: IDateCell[] = [];
		tp.push(newCell);
		if (this.mStartDateCell) {
			tp.push(this.mStartDateCell);
			tp.push(this.mEndDateCell);
		}

		tp.sort((a: IDateCell, b: IDateCell) => (a.date > b.date) ? 1 : -1);

		if (this.mStartDateCell === this.mEndDateCell && this.mEndDateCell === newCell) {
			newStartDateCell = null;
			newEndDateCell = null;
		} else if (this.mStartDateCell === newCell) {
			newStartDateCell = this.mEndDateCell;
			newEndDateCell = this.mEndDateCell;
		} else if (this.mEndDateCell === newCell) {
			newStartDateCell = this.mStartDateCell;
			newEndDateCell = this.mStartDateCell;
		} else if (tp.indexOf(newCell) === 1 && tp[2]) {
			if (this.mFocusedInput === 1) {
				newStartDateCell = newCell;
				newEndDateCell = this.mEndDateCell;
			} else if (this.mFocusedInput === 2) {
				newStartDateCell = this.mStartDateCell;
				newEndDateCell = newCell;
			}
		} else {
			newStartDateCell = tp[0];
			newEndDateCell = tp[tp.length - 1];
		}

		this.updateStartDateCell(newStartDateCell);
		this.updateEndDateCell(newEndDateCell);
	}

	private onYearSelectedLeft(yearCell: ICalendarCell): void {
		this.mPickerMenu.leftMenu.year = yearCell.value;
		this.mLeftTrackerDate.setFullYear(yearCell.value);
		this.mLeftDateCells = this.pickerService.getDateCells(this.mKey, this.mLeftTrackerDate);
		this.mLeftDisplay = 'day';
		if (this.mLeftTrackerDate >= this.mRightTrackerDate) {
			this.pushRightCalendar();
		}
	}

	private onYearSelectedRight(yearCell: ICalendarCell): void {
		this.mPickerMenu.rightMenu.year = yearCell.value;
		this.mRightTrackerDate.setFullYear(yearCell.value);
		this.mRightDateCells = this.pickerService.getDateCells(this.mKey, this.mRightTrackerDate);
		this.mRightDisplay = 'day';
		if (this.mLeftTrackerDate >= this.mRightTrackerDate) {
			this.pushLeftCalendar();
		}
	}

	protected onDateTraversal(direction: string): void {
		console.log('Traversing Date');
	}
	protected onYearTraversal(direction: string): void {
		console.log('Traversing Year');
	}
}
