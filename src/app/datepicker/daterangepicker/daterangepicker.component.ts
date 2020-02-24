import { Component, ElementRef, OnInit } from '@angular/core';
import { IDateCell } from '../models/picker-cell';
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

	private mLeftDateCells: IDateCell[];
	private mRightDateCells: IDateCell[];

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

		this.mLeftDateCells = this.pickerService.getDateCells(this.mKey, this.mTrackerDate);
		this.pushRightCalendar();

		const offset: number = this.pickerService.getMonthOffset(this.mTrackerDate.getMonth(), this.mTrackerDate.getFullYear());
		this.mTabableDate = this.mLeftDateCells[offset + today.getDate() - 1];
		this.mTabableDate.tabIndex = 0;
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
		this.mLeftDateCells = this.pickerService.getDateCells(this.mKey, this.mTrackerDate);
		this.mPickerMenu.leftMenu.month = this.pickerService.getMonthName(this.mTrackerDate.getMonth());
		this.mPickerMenu.leftMenu.year = this.mTrackerDate.getFullYear();
	}

	private pushRightCalendar(): void {
		const rightTrackerDate: Date = new Date(this.mTrackerDate.getFullYear(), this.mTrackerDate.getMonth() + 1, 1);
		this.mRightDateCells = this.pickerService.getDateCells(this.mKey, rightTrackerDate);
		this.mPickerMenu.rightMenu.month = this.pickerService.getMonthName(rightTrackerDate.getMonth());
		this.mPickerMenu.rightMenu.year = rightTrackerDate.getFullYear();
	}

	private onPagination(numPages: number): void {
		this.pageMonth(numPages);
	}

	protected pageMonth(numPages: number): void {
		super.pageMonth(numPages);

		this.mPickerMenu.leftMenu.month = this.pickerService.getMonthName(this.mTrackerDate.getMonth());
		this.mPickerMenu.leftMenu.year = this.mTrackerDate.getFullYear();

		this.mLeftDateCells = this.pickerService.getDateCells(this.mKey, this.mTrackerDate);

		const monthOffset: number = this.pickerService.getMonthOffset(this.mTrackerDate.getMonth(), this.mTrackerDate.getFullYear());
		this.updateTabableDate(this.mLeftDateCells[Math.min(this.mLeftDateCells.length - 1, monthOffset + this.mTabableDate.value - 1)]);

		this.pushRightCalendar();

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

	protected onDateTraversal(direction: string): void {
		console.log('Traversing Date');
	}
	protected onYearTraversal(direction: string): void {
		console.error('unreachable method reached');
	}
}
