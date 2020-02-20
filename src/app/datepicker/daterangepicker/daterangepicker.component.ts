import { Component, ElementRef, OnInit } from '@angular/core';
import { ICalendarCell, IDateCell } from '../models/picker-cell';
import { IDaterangepickerMenu } from '../models/picker-menu';
import { PickerComponent } from '../picker/picker.component';
import { PickerService } from '../services/picker.service';

@Component({
	selector: 'app-daterangepicker',
	templateUrl: './daterangepicker.component.html',
	styleUrls: ['./daterangepicker.component.scss']
})
export class DaterangepickerComponent extends PickerComponent implements OnInit {

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

	private startDate: Date;
	private endDate: Date;

	private hoveredDateCell: IDateCell;

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
		this.mTabableYear = this.mLeftYearCells[0];

	}

	private onPaginationLeft(numPages: number): void {
		console.log('Paging left side: ' + numPages);
	}

	private onPaginationRight(numPages: number): void {
		console.log('Pagin right side: ' + numPages);
	}

	//

	private onDateHover(newHoveredDateCell: IDateCell): void {
		this.hoveredDateCell = newHoveredDateCell;
	}

	private onDateUnhover(): void {
		this.hoveredDateCell = null;
	}

	protected onDateSelected(dateCell: IDateCell): void {

	}

	private onYearSelectedLeft(yearCell: ICalendarCell): void {

	}

	private onYearSelectedRight(yearCell: ICalendarCell): void {

	}

}
