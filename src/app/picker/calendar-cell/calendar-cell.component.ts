import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICalendarCell } from '../models/calendar-cell';

@Component({
	selector: 'app-calendar-cell',
	templateUrl: './calendar-cell.component.html',
	styleUrls: ['./calendar-cell.component.scss']
})
export class CalendarCellComponent implements OnInit {

	@Input() calendarCell: ICalendarCell;
	@Input() isToday: boolean;
	@Input() isSelected: boolean;
	@Input() isDisabled: boolean;
	@Output() selectEmitter: EventEmitter<ICalendarCell> = new EventEmitter<ICalendarCell>();
	@Output() traversalEmitter: EventEmitter<string> = new EventEmitter<string>();
	@Output() hoverChangeEmitter: EventEmitter<ICalendarCell> = new EventEmitter<ICalendarCell>();

	constructor() { }

	ngOnInit(): void {
	}

	private onSelect(selectedCell: ICalendarCell): void {
		this.selectEmitter.emit(selectedCell);
	}

	private onTraversal(direction: string): void {
		this.traversalEmitter.emit(direction);
	}

	private onHoverChange(hoveredCell: ICalendarCell): void {
		this.hoverChangeEmitter.emit(hoveredCell);
	}

}
