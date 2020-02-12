import { ICalendarCell } from '../models/calendar-cell';

// pseudo service, we do not want it to be a singleton
// this service is in charge of flipping the boolean values of the calendar cells and should be the only place they are flipped

export interface CellController {
	onDateCellSelected(newSelectedDateCell: ICalendarCell, newSelectedDate: Date): void;
	onYearCellSelected(newSelectedYearCell: ICalendarCell): void;
}

export class DatepickerCellController implements CellController {

	private selectedDate: Date;

	private selectedDateCell: ICalendarCell;

	private selectedYearCell: ICalendarCell;

	constructor() {}

	public onDateCellSelected(newSelectedDateCell: ICalendarCell, newSelectedDate: Date): void {
		newSelectedDateCell.isSelected = true;

		if (this.selectedDateCell) { this.selectedDateCell.isSelected = false; }

		this.selectedDateCell = (this.selectedDateCell === newSelectedDateCell ? null : newSelectedDateCell);

		this.selectedDate = newSelectedDate;
	}

	public onYearCellSelected(newSelectedYearCell: ICalendarCell): void {
		newSelectedYearCell.isSelected = true;

		if (this.selectedYearCell) { this.selectedYearCell.isSelected = false; }

		this.selectedYearCell = (this.selectedYearCell === newSelectedYearCell ? null : newSelectedYearCell);
	}
}

export class DaterangepickerCellController implements CellController {

	public get firstDate(): Date { return this.firstSelectedDate; }
	private firstSelectedDate: Date;
	public get secondDate(): Date { return this.secondSelectedDate; }
	private secondSelectedDate: Date;

	private firstSelectedDateCell: ICalendarCell;
	private secondSelectedDateCell: ICalendarCell;

	private firstSelectedYearCell: ICalendarCell;
	private secondSelectedYearCell: ICalendarCell;

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

		if (!this.firstSelectedDate) {
			this.firstSelectedDate = newSelectedDate;
		} else if (!this.secondSelectedDate) {
			this.secondSelectedDate = newSelectedDate;
		} else {
			this.firstSelectedDate = newSelectedDate;
			this.secondSelectedDate = null;
		}
	}

	public onYearCellSelected(newSelectedYearCell: ICalendarCell): void {
		if (!this.firstSelectedYearCell) {
			this.firstSelectedYearCell = newSelectedYearCell;
			this.firstSelectedYearCell.isSelected = true;
		} else if (!this.secondSelectedYearCell) {
			this.secondSelectedYearCell = newSelectedYearCell;
			this.secondSelectedYearCell.isSelected = true;
		} else {
			this.firstSelectedYearCell.isSelected = false;
			this.firstSelectedYearCell = newSelectedYearCell;
			this.firstSelectedYearCell.isSelected = true;
			this.secondSelectedYearCell.isSelected = false;
			this.secondSelectedYearCell = null;
		}
	}
}
