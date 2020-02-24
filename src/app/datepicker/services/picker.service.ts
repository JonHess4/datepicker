import { Injectable } from '@angular/core';
import { ICalendarCell, IDateCell } from '../models/picker-cell';

/**
 * this service creates the pickerCells and provides others with references to their location in memory
 * each picker accesses their own personal cells via the key property they possess
 */

@Injectable({
	providedIn: 'root'
})
export class PickerService {

	private calendarCells: Map<string, ICalendarCell[]> = new Map<string, ICalendarCell[]>();

	public readonly monthNames: string[] = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	];

	private monthCells: ICalendarCell[] = this.createMonthCells();

	constructor() {}

	private generateKey(keyPref: number, year: number, month?: number): string {
		return (keyPref + '-' + year + '-' + month);
	}

	public getMonthOffset(month: number, year: number): number {
		const firstOfMonth: Date = new Date(year, month, 1);
		const monthOffset: number = firstOfMonth.getDay();
		return monthOffset;
	}

	public getNumDaysInMonth(date: Date): number {
		const lastDateOfMonth: Date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
		return lastDateOfMonth.getDate();
	}

	public getDateCells(pickerKey: number, date: Date): IDateCell[] {
		let dateCells: IDateCell[];
		const month: number = date.getMonth();
		const year: number = date.getFullYear();
		const key: string = this.generateKey(pickerKey, year, month);

		if (this.calendarCells.has(key)) {
			dateCells = this.calendarCells.get(key) as IDateCell[];

		} else {
			const monthOffset: number = this.getMonthOffset(month, year);
			const numDaysInMonth: number = this.getNumDaysInMonth(new Date(year, month, 1));
			dateCells = this.createDateCells(pickerKey, month, year, monthOffset, numDaysInMonth);
		}

		return dateCells;
	}

	public getMonthName(index: number): string {
		return this.monthNames[index];
	}

	public getMonthCells(): ICalendarCell[] {
		return this.monthCells;
	}

	public getYearCells(pickerKey: number, year: number): ICalendarCell[] {

		let yearCells: ICalendarCell[];
		const key: string = this.generateKey(pickerKey, year);

		if (this.calendarCells.has(key)) {
			yearCells = this.calendarCells.get(key);

		} else {
			yearCells = this.createYearCells(key, year);
		}
		return yearCells;
	}

	private createDateCells(keyPref: number, month: number, year: number, offset: number, range: number): IDateCell[] {
		const dateCells: IDateCell[] = [];
		const key: string = this.generateKey(keyPref, year, month);

		for (let i: number = 0; i < offset; i++) {
			dateCells.push(null);
		}

		for (let i: number = 0; i < range; i++) {
			const dateCell: IDateCell = {
				date: new Date(year, month, i + 1),
				value: i + 1,
				displayValue: i + 1,
				isSelected: false,
				isToday: false,
				tabIndex: -1
			};
			dateCells.push(dateCell);
		}

		this.calendarCells.set(key, dateCells);
		return dateCells;
	}

	private createMonthCells(): ICalendarCell[] {
		const monthCells: ICalendarCell[] = [];
		let i: number = 0;
		this.monthNames.forEach((name: string): void => {
			const monthCell: ICalendarCell = {
				value: i++,
				displayValue: name.substr(0, 3),
				isSelected: false,
				isToday: false,
				tabIndex: -1
			};
			monthCells.push(monthCell);
		});
		return monthCells;
	}

	private createYearCells(key: string, startingValue: number): ICalendarCell[] {
		const yearCells: ICalendarCell[] = [];

		for (let i: number = 0; i < 28; i++) {
			const yearCell: ICalendarCell = {
				value: startingValue + i,
				displayValue: startingValue + i,
				isSelected: false,
				isToday: false,
				tabIndex: -1
			};
			yearCells.push(yearCell);
		}

		this.calendarCells.set(key, yearCells);
		return yearCells;
	}
}
