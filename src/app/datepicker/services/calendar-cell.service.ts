import { Injectable } from '@angular/core';
import { ICalendarCell } from '../models/calendar-cell';

/**
 * this service creates and holds the calendarCells.
 * passes reference to calendar cells on request.
 * calendarCell values do not get changed in this service, their values are changed by those who ask for reference to them
 */

@Injectable({
	providedIn: 'root'
})
export class CalendarCellService {

	private calendarCells: Map<string, ICalendarCell[]> = new Map<string, ICalendarCell[]>();

	constructor(
	) { }

	public getMonthOffset(month: number, year: number): number {
		let monthOffset: number;
		let firstOfMonth: Date;
		firstOfMonth = new Date(year, month, 1);
		monthOffset = firstOfMonth.getDay();
		return monthOffset;
	}

	private getNumDaysInMonth(date: Date): number {
		const lastDateOfMonth: Date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
		return lastDateOfMonth.getDate();
	}

	public getDateCells(pickerKey: number, month: number, year: number): ICalendarCell[] {

		let dateCells: ICalendarCell[];
		const key: string = pickerKey + '-' + month + '-' + year;

		if (this.calendarCells.has(key)) {
			dateCells = this.calendarCells.get(key);

		} else {
			const monthOffset: number = this.getMonthOffset(month, year);
			const numDaysInMonth: number = this.getNumDaysInMonth(new Date(year, month, 1));
			dateCells = this.createCalendarCells(key, 1, monthOffset, numDaysInMonth);
		}

		return dateCells;
	}

	public getMonthCells(): ICalendarCell[] {
		return null;
	}

	public getYearCells(pickerKey: number, year: number): ICalendarCell[] {

		let yearCells: ICalendarCell[];
		const key: string = pickerKey + '-' + year;

		if (this.calendarCells.has(key)) {
			yearCells = this.calendarCells.get(key);

		} else {
			yearCells = this.createCalendarCells(key, year, 0, 28);
		}
		return yearCells;
	}

	private createCalendarCells(key: string, startingValue: number, offset: number, range: number): ICalendarCell[] {
		const calendarCells: ICalendarCell[] = [];

		for (let i: number = 0; i < offset; i++) {
			calendarCells.push(null);
		}

		for (let i: number = 0; i < range; i++) {
			const calendarCell: ICalendarCell = {
				value: startingValue + i,
				isSelected: false,
				isToday: false,
				tabIndex: -1,
				fillBoxLeft: false,
				fillBoxRight: false,
				fillCircleLeft: false,
				fillCircleRight: false,
				outlineBoxLeft: false,
				outlineBoxRight: false,
				outlineCircleLeft: false,
				outlineCircleRight: false
			};
			calendarCells.push(calendarCell);
		}

		this.calendarCells.set(key, calendarCells);
		return calendarCells;
	}

}
