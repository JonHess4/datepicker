import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CellPickerComponent } from '../cell-picker/cell-picker.component';
import { IDateCell } from '../models/picker-cell';

@Component({
	selector: 'app-cell-daterangepicker',
	templateUrl: './cell-daterangepicker.component.html',
	styleUrls: ['./cell-daterangepicker.component.scss']
})
export class CellDaterangepickerComponent extends CellPickerComponent implements OnInit, OnChanges {

	@Input() calendarCell: IDateCell;
	@Input() startDate: Date;
	@Input() endDate: Date;
	@Input() hoveredDate: Date;

	private fillBoxLeft: boolean;
	private fillBoxRight: boolean;
	private outlineBoxLeft: boolean;
	private outlineBoxRight: boolean;

	@Output() hoverEmitter: EventEmitter<IDateCell> = new EventEmitter<IDateCell>();
	@Output() unhoverEmitter: EventEmitter<IDateCell> = new EventEmitter<IDateCell>();

	constructor() {
		super();
	}

	ngOnInit(): void {
	}

	test(): void {
		console.log('here');
	}

	ngOnChanges(): void {

		// created these variables to shorten them

		const hovDate: Date = this.hoveredDate;
		const startDate: Date = this.startDate;
		// if end date is falsy, then the startDate is also the end date as far as this component is concerned
		const endDate: Date = (this.endDate ? this.endDate : this.startDate);
		const cellDate: Date = (this.calendarCell ? this.calendarCell.date : null);

		this.fillBoxLeft = (startDate && cellDate > startDate && cellDate <= endDate);

		this.fillBoxRight = (startDate && cellDate >= startDate && cellDate < endDate);

		this.outlineBoxLeft = (hovDate && startDate && (
			(cellDate > hovDate && cellDate <= startDate) ||
			(cellDate > endDate && cellDate <= hovDate)
		));

		this.outlineBoxRight = (hovDate && startDate && (
			(cellDate >= hovDate && cellDate < startDate) ||
			(cellDate >= endDate && cellDate < hovDate)
		));
	}

	private onHover(event: UIEvent, calendarCell: IDateCell): void {
		this.hoverEmitter.emit(calendarCell);
	}

	private onUnhover(event: UIEvent, calendarCell: IDateCell): void {
		this.unhoverEmitter.emit(calendarCell);
	}

}
