import { Component, ElementRef, OnInit } from '@angular/core';
import { ICalendarCell, IDateCell } from '../models/picker-cell';
import { IDatepickerMenu } from '../models/picker-menu';
import { PickerComponent } from '../picker.component';
import { PickerService } from '../services/picker.service';

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

	// private mTrackerDate: Date;
	// private mTrackerYear: number;

	private mSelectedDateCell: IDateCell;
	public get selectedDate(): Date { return (this.mSelectedDateCell ? this.mSelectedDateCell.date : null); }

	constructor(
		pickerService: PickerService,
		elementRef: ElementRef
	) {
		super(pickerService, elementRef);
	}

	ngOnInit(): void {
		super.ngOnInit();

		const today: Date = new Date();

		this.mPickerMenu = { display: 'day', month: this.pickerService.getMonthName(today.getMonth()), year: today.getFullYear() };

		this.mTrackerDate = new Date(today.getFullYear(), today.getMonth(), 1);
		this.mDateCells = this.pickerService.getDateCells(this.mKey, this.mTrackerDate);
		this.mTrackerYear = today.getFullYear();
		this.mYearCells = this.pickerService.getYearCells(this.mKey, this.mTrackerYear);

		const offset: number = this.pickerService.getMonthOffset(this.mTrackerDate.getMonth(), this.mTrackerDate.getFullYear());
		this.mTabableDate = this.mDateCells[offset + today.getDate() - 1];
		this.mTabableDate.tabIndex = 0;
		this.mTabableYear = this.mYearCells[0];
		this.mTabableYear.tabIndex = 0;
	}

	private updateSelectedDate(newSelectedDate: IDateCell): void {
		if (this.mSelectedDateCell) {
			this.mSelectedDateCell.isSelected = false;
		}
		if (this.mSelectedDateCell !== newSelectedDate) {
			this.mSelectedDateCell = newSelectedDate;
			this.mSelectedDateCell.isSelected = true;
		} else {
			this.mSelectedDateCell = null;
		}
	}

	private onPagination(numPages: number): void {
		if (this.mCurrentDisplay === 'day') {
			this.pageMonth(numPages);
		} else if (this.mCurrentDisplay === 'year') {
			this.pageYears(numPages);
		}
	}

	protected pageMonth(numPages: number): void {
		super.pageMonth(numPages);

		this.mPickerMenu.month = this.pickerService.getMonthName(this.mTrackerDate.getMonth());
		this.mPickerMenu.year = this.mTrackerDate.getFullYear();

		this.mDateCells = this.pickerService.getDateCells(this.mKey, this.mTrackerDate);

		const monthOffset: number = this.pickerService.getMonthOffset(this.mTrackerDate.getMonth(), this.mTrackerDate.getFullYear());
		this.updateTabableDate(this.mDateCells[Math.min(this.mDateCells.length - 1, monthOffset + this.mTabableDate.value - 1)]);
	}

	private pageYears(numPages: number): void {
		this.mTrackerYear += numPages * 28;
		const index: number = this.mYearCells.indexOf(this.mTabableYear);
		this.mYearCells = this.pickerService.getYearCells(this.mKey, this.mTrackerYear);
		this.updateTabableYear(this.mYearCells[index]);
	}

	protected onDateSelected(selectedDate: IDateCell): void {
		this.updateTabableDate(selectedDate);
		this.updateSelectedDate(selectedDate);
	}

	private onYearSelected(selectedYear: ICalendarCell): void {
		this.mTrackerDate.setFullYear(selectedYear.value);
		this.mPickerMenu.year = this.mTrackerDate.getFullYear();
		this.mDateCells = this.pickerService.getDateCells(this.mKey, this.mTrackerDate);
		super.setDisplay(this.mPickerMenu, 'day');
		this.updateTabableYear(selectedYear);
	}

	protected onDateTraversal(direction: string): void {

		const map: Map<string, number> = new Map<string, number>();
		map.set('left', -1);
		map.set('right', 1);
		map.set('up', -7);
		map.set('down', 7);

		const distance: number = map.get(direction);
		const index: number = this.mDateCells.indexOf(this.mTabableDate);

		if (this.mDateCells[index + distance]) {
			this.updateTabableDate(this.mDateCells[index + distance]);
			const monthOffset: number = this.pickerService.getMonthOffset(this.mTrackerDate.getMonth(), this.mTrackerDate.getFullYear());
			this.focusTabableCell(index + distance - monthOffset);
		}
	}

	protected onYearTraversal(direction: string): void {

		const map: Map<string, number> = new Map<string, number>();
		map.set('left', -1);
		map.set('right', 1);
		map.set('up', -4);
		map.set('down', 4);

		const distance: number = map.get(direction);
		const index: number = this.mYearCells.indexOf(this.mTabableYear);

		if (this.mYearCells[index + distance]) {
			this.updateTabableYear(this.mYearCells[index + distance]);
			const offset: number = this.pickerService.getMonthOffset(this.mTrackerDate.getMonth(), this.mTrackerDate.getFullYear())
			this.focusTabableCell(index + distance + this.mDateCells.length - offset);
		}
	}

	private focusTabableCell(index: number): void {
		const mCalendarCells: HTMLElement[] = this.elementRef.nativeElement.getElementsByClassName('circle');
		mCalendarCells[index].focus();
	}

}
