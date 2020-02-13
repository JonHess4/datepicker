export interface ICalendarCell {
	value: number;
	isSelected: boolean;
	isToday: boolean;
	tabIndex: number;
}

export interface IDateCell extends ICalendarCell {
	date: Date;
	fillBoxLeft: boolean;
	fillBoxRight: boolean;
	fillCircleLeft: boolean;
	fillCircleRight: boolean;
	outlineBoxLeft: boolean;
	outlineBoxRight: boolean;
	outlineCircleLeft: boolean;
	outlineCircleRight: boolean;
}