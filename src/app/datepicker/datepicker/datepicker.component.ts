import { Component, ElementRef, OnInit } from '@angular/core';
import { ICalendarCell } from '../models/calendar-cell';
import { ICalendarMenu } from '../models/calendar-menu';
import { CalendarCellService } from '../services/calendar-cell.service';
import { CellController, DatepickerCellController } from '../services/cell-controller';

@Component({
	selector: 'app-datepicker',
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

	public set key(newKey: number) { this._key = newKey; }
	private _key: number = Math.floor(Math.random() * 10000);

	public set cellController(newCellController: CellController) { this._cellController = newCellController; }
	private _cellController: CellController = new DatepickerCellController();

	public get selectedDate(): Date { return this._selectedDate; }
	private _selectedDate: Date = null;

	private calendarMenu: ICalendarMenu;

	private calendarCells: ICalendarCell[];

	private set selectedCell(newSelectedCell: ICalendarCell) {
		if (this.calendarMenu.type === 'day') {
			this._cellController.onDateCellSelected(newSelectedCell, this._selectedDate);
		} else if (this.calendarMenu.type === 'year') {
			this._cellController.onYearCellSelected(newSelectedCell);
		}
		this._selectedCell = newSelectedCell;
	}
	private _selectedCell: ICalendarCell;

	constructor(
		private calendarCellService: CalendarCellService,
		public elementRef: ElementRef
	) { }

	ngOnInit(): void {

		const today: Date = new Date();

		this.calendarMenu = {
			type: 'day',
			monthName: '' + today.getMonth(),
			year: today.getFullYear()
		};

		this.calendarCells = this.calendarCellService.getDateCells(this._key, today.getMonth(), today.getFullYear());
	}

	/**
	 * start property setters
	 */

	private setCalendarMenuProperties(type: string, monthName: string, year: number): void {
		this.calendarMenu.type = type;
		this.calendarMenu.monthName = monthName;
		this.calendarMenu.year = year;
	}

	private setCalendarCells(month: number, year: number): void {
		if (month) {
			this.calendarCells = this.calendarCellService.getDateCells(this._key, month, year);
		} else {
			this.calendarCells = this.calendarCellService.getYearCells(this._key, year);
		}
	}

	/**
	 * end property setters
	 */

	/**
	 * start logic methods
	 */

	/**
	 * end logic methods
	 */

	/**
	 * start child event emitter methods
	 */

	private onDisplayToggle(newDisplay: string): void {

	}

	private onPagination(numPages: number): void {

	}

	private onCellSelected(selectedCell: ICalendarCell): void {
		this.selectedCell = selectedCell;

		if (this.calendarMenu.type === 'day') {
			const today: Date = new Date();
			this._selectedDate = new Date(today.getFullYear(), today.getMonth(), selectedCell.value);
		}
	}

	private onMouseOverCell(cell: ICalendarCell): void {

	}

	private onMouseOutCell(cell: ICalendarCell): void {

	}

	private onMove(direction: string): void {

	}

	/**
	 * end child event emitter methods
	 */

}
