export interface ICalendarCell {
	date: Date;
	value: number;
	displayValue: string;
	type: string;
	isToday: boolean;
}

export class YearCell implements ICalendarCell {

	private year: number;
	private mIsToday: boolean;

	public get date(): Date { return null; }
	public get value(): number { return this.year; }
	public get displayValue(): string { return this.year.toString(); }
	public readonly type: string = 'year';
	public get isToday(): boolean { return this.mIsToday; }

	constructor(year: number, isToday: boolean) {
		this.year = year;
		this.mIsToday = isToday;
	}
}

export class MonthCell implements ICalendarCell {

	private monthNum: number;
	private mIsToday: boolean;

	public get date(): Date { return null; }
	public get value(): number { return this.monthNum; }
	public get displayValue(): string { return this.monthNames[this.monthNum]; }
	public readonly type: string = 'month';
	public get isToday(): boolean { return this.mIsToday; }

	private readonly monthNames: string[] = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	];

	constructor(monthNum: number, isToday: boolean) {
		this.monthNum = monthNum;
		this.mIsToday = isToday;
	}
}

export class DateCell implements ICalendarCell {

	private mDate: Date;
	private mIsToday: boolean;

	public get date(): Date { return this.mDate; }
	public get value(): number { return this.dateToNum(this.date); }
	public get displayValue(): string { return this.date.getDate().toString(); }
	public readonly type: string = 'date';
	public get isToday(): boolean { return this.mIsToday; }

	constructor(date: Date, isToday: boolean) {
		this.mDate = date;
		this.mIsToday = isToday;
	}

	private dateToNum(dateObj: Date): number {
		let value: number;

		const year: number = dateObj.getFullYear();
		const month: number = dateObj.getMonth();
		const date: number = dateObj.getDate();

		value = ((year * 10000) + (month * 100) + date);

		return value;
	}
}
