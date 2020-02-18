import { ICalendarCell, IDateCell } from '../models/calendar-cell';

// each time a date is selected, this resolves the styling and holds the selected Date(s)

export interface SelectedDateResolver {
	onDateCellSelected(newSelectedDateCell: ICalendarCell): void;
}

export class DatepickerSelectedDateResolver implements SelectedDateResolver {

	public get selectedDate(): Date { return this.selectedDateCell ? this.selectedDateCell.date : null; }
	private selectedDateCell: IDateCell;

	constructor() {}

	public onDateCellSelected(newSelectedDateCell: IDateCell): void {
		newSelectedDateCell.isSelected = true;

		if (this.selectedDateCell) { this.selectedDateCell.isSelected = false; }

		this.selectedDateCell = (this.selectedDateCell === newSelectedDateCell ? null : newSelectedDateCell);
	}
}

export class DaterangepickerSelectedDateResolver implements SelectedDateResolver {

	public get startDate(): Date { return this.startDateCell ? this.startDateCell.date : null; }
	public get endDate(): Date { return this.endDateCell ? this.endDateCell.date : null; }

	private startDateCell: IDateCell;
	private endDateCell: IDateCell;

	constructor() {}

	public onDateCellSelected(newDateCell: IDateCell): void {
		newDateCell.isSelected = true;

		if (!this.startDateCell) {
			this.startDateCell = newDateCell;
		} else if (!this.endDateCell) {
			if (this.startDateCell.date > newDateCell.date) {
				this.endDateCell = this.startDateCell;
				this.startDateCell = newDateCell;
			} else {
				this.endDateCell = newDateCell;
			}
		} else {
			this.startDateCell.isSelected = false;
			this.startDateCell = newDateCell;
			this.endDateCell.isSelected = false;
			this.endDateCell = null;
		}
	}
}
