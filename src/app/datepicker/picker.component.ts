import { ElementRef, OnInit } from '@angular/core';
import { ICalendarCell, IDateCell } from './models/picker-cell';
import { IPickerMenu, IDatepickerMenu } from './models/picker-menu';
import { PickerCellService } from './services/picker-cell.service';

export abstract class PickerComponent implements OnInit {

	// this key is used to retrieve the correct data from pickerCellService
	protected readonly mKey: number = Math.floor(Math.random() * 10000);

	// holds the info for the picker menu
	protected mPickerMenu: IPickerMenu;

	constructor(
		protected pickerCellService: PickerCellService,
		public elementRef: ElementRef
	) { }

	ngOnInit(): void {
		this.markToday();
	}

	private markToday(): void {
		const today: Date = new Date();

		// date cell
		const dateCells: IDateCell[] = this.pickerCellService.getDateCells(this.mKey, today.getMonth(), today.getFullYear());
		const monthOffset: number = this.pickerCellService.getMonthOffset(today.getMonth(), today.getFullYear());
		dateCells[today.getDate() + monthOffset - 1].isToday = true;

		// year cell
		const yearCells: ICalendarCell[] = this.pickerCellService.getYearCells(this.mKey, today.getFullYear());
		yearCells[0].isToday = true;
	}

	protected setDisplay(pickerMenu: IDatepickerMenu, newDisplay: string): void {
		pickerMenu.display = newDisplay;
	}

	protected abstract onDateSelected(): void;
}
