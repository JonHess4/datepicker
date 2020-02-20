export interface ICalendarCell {
	value: number;
	displayValue: any;
	isSelected: boolean;
	isToday: boolean;
	tabIndex: number;
}

export interface IDateCell extends ICalendarCell {
	date: Date;
}
