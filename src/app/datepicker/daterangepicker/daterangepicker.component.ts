import { Component, ElementRef, OnInit } from '@angular/core';
import { ICalendarCell, IDateCell } from '../models/picker-cell';
import { IDaterangepickerMenu } from '../models/picker-menu';
import { PickerComponent } from '../picker.component';
import { PickerCellService } from '../services/picker-cell.service';

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

	private leftTabableDate: IDateCell;
	private rightTabableDate: IDateCell;
	private leftTabableYear: ICalendarCell;
	private rightTabableYear: ICalendarCell;

	private startDate: Date;
	private endDate: Date;

	constructor(
		pickerCellService: PickerCellService,
		elementRef: ElementRef
	) {
		super(pickerCellService, elementRef);
	 }

	ngOnInit(): void {
		super.ngOnInit();
	}

	setLeftDisplay(newDisplay: string): void {}

	setRightDisplay(newDisplay: string): void {}

	onPaginationLeft(): void {}

	onPaginationRight(): void {}

	protected onDateSelected(): void {}

	onDateHovered(): void {}

	onDateUnhovered(): void {}

	onLeftYearSelected(): void {}

	onRightYearSelected(): void {}

	onCellTraversal(): void {}

}
