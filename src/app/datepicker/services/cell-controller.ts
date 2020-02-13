import { ICalendarCell } from '../models/calendar-cell';

// pseudo service, we do not want it to be a singleton
// this service is in charge of flipping the boolean values of the calendar cells and should be the only place they are flipped

export interface CellController {
	onDateCellSelected(newSelectedDateCell: ICalendarCell, newSelectedDate: Date): void;
}

export class DatepickerCellController implements CellController {

	private selectedDate: Date;

	private selectedDateCell: ICalendarCell;

	constructor() {}

	public onDateCellSelected(newSelectedDateCell: ICalendarCell, newSelectedDate: Date): void {
		newSelectedDateCell.isSelected = true;

		if (this.selectedDateCell) { this.selectedDateCell.isSelected = false; }

		this.selectedDateCell = (this.selectedDateCell === newSelectedDateCell ? null : newSelectedDateCell);

		this.selectedDate = newSelectedDate;
	}
}

export class DaterangepickerCellController implements CellController {

	public get startDate(): Date { return this._startDate; }
	private _startDate: Date;
	public get endDate(): Date { return this._endDate; }
	private _endDate: Date;

	private firstSelectedDateCell: ICalendarCell;
	private secondSelectedDateCell: ICalendarCell;

	constructor() {}

	public onDateCellSelected(newSelectedDateCell: ICalendarCell, newSelectedDate: Date): void {

		if (!this.firstSelectedDateCell) {
			this.firstSelectedDateCell = newSelectedDateCell;
			this.firstSelectedDateCell.isSelected = true;
		} else if (!this.secondSelectedDateCell) {
			this.secondSelectedDateCell = newSelectedDateCell;
			this.secondSelectedDateCell.isSelected = true;
		} else {
			this.firstSelectedDateCell.isSelected = false;
			this.firstSelectedDateCell = newSelectedDateCell;
			this.firstSelectedDateCell.isSelected = true;
			this.secondSelectedDateCell.isSelected = false;
			this.secondSelectedDateCell = null;
		}

		if (!this._startDate) {
			this._startDate = newSelectedDate;
		} else if (!this._endDate) {
			if (this.startDate > newSelectedDate) {
				this._endDate = this._startDate;
				this._startDate = newSelectedDate;
			} else {
				this._endDate = newSelectedDate;
			}
		} else {
			this._startDate = newSelectedDate;
			this._endDate = null;
		}
	}
}
