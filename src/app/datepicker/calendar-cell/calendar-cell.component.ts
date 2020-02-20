import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';
import { ICalendarCell } from '../models/picker-cell';

@Component({
	selector: 'app-calendar-cell',
	templateUrl: './calendar-cell.component.html',
	styleUrls: ['./calendar-cell.component.scss']
})
export class CalendarCellComponent implements OnInit {

	@Input() calendarCell: ICalendarCell;
	@Output() selectEmitter: EventEmitter<ICalendarCell> = new EventEmitter<ICalendarCell>();
	@Output() hoverEmitter: EventEmitter<ICalendarCell> = new EventEmitter<ICalendarCell>();
	@Output() unhoverEmitter: EventEmitter<ICalendarCell> = new EventEmitter<ICalendarCell>();
	@Output() traversalEmitter: EventEmitter<string> = new EventEmitter<string>();

	constructor() { }

	ngOnInit(): void {}

	private onSelect(event: UIEvent, calendarCell: ICalendarCell): boolean {
		this.selectEmitter.emit(calendarCell);
		return false;
	}

	private onHover(event: UIEvent, calendarCell: ICalendarCell): void {
		this.hoverEmitter.emit(calendarCell);
	}

	private onUnhover(event: UIEvent, calendarCell: ICalendarCell): void {
		this.unhoverEmitter.emit(calendarCell);
	}

	private onTraversal(direction: string): void {
		this.traversalEmitter.emit(direction);
	}

}
