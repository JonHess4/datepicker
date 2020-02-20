import { Component, ElementRef, OnInit } from '@angular/core';
import { ICalendarCell, IDateCell } from '../models/picker-cell';
import { IDatepickerMenu, IPickerMenu } from '../models/picker-menu';
import { PickerService } from '../services/picker.service';

@Component({
	// selector: 'app-picker',
	template: ''
})
export class PickerComponent implements OnInit {

	// this key is used to retrieve the correct data from pickerCellService
	protected readonly mKey: number = Math.floor(Math.random() * 10000);

	// holds the info for the picker menu
	protected mPickerMenu: IPickerMenu;

	protected mTabableDate: IDateCell;
	protected mTabableYear: ICalendarCell;

	constructor(
		protected pickerService: PickerService,
		public elementRef: ElementRef
	) { }

	ngOnInit(): void {
		this.markToday();
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
		this.mTabableDate.tabIndex = -1;
		this.mTabableDate = newTabableDate;
		this.mTabableDate.tabIndex = 0;
	}

	protected updateTabableYear(newTabableYear: ICalendarCell): void {
		this.mTabableYear.tabIndex = -1;
		this.mTabableYear = newTabableYear;
		this.mTabableYear.tabIndex = 0;
	}

	protected onDateSelected(dateCell: IDateCell): void {}

	protected onDateTraversal(direction: string): void { }

	protected onYearTraversal(direction: string): void { }
}
