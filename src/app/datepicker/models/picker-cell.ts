export interface ICalendarCell {
	value: number;
	isSelected: boolean;
	isToday: boolean;
	tabIndex: number;
}

export interface IDateCell extends ICalendarCell {
	date: Date;
}
