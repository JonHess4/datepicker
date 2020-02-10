import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';
import { ICalendarCell } from '../models/calendar-cell';

@Component({
	selector: 'app-calendar-cell',
	templateUrl: './calendar-cell.component.html',
	styleUrls: ['./calendar-cell.component.scss']
})
export class CalendarCellComponent implements OnInit {

	@Input() calendarCell: ICalendarCell;
	@Output() selectedCell: EventEmitter<ICalendarCell> = new EventEmitter<ICalendarCell>();
	@Output() mousedOverCell: EventEmitter<ICalendarCell> = new EventEmitter<ICalendarCell>();
	@Output() mousedOutCell: EventEmitter<ICalendarCell> = new EventEmitter<ICalendarCell>();
	@Output() direction: EventEmitter<string> = new EventEmitter<string>();

	constructor() { }

	ngOnInit(): void {
	}

	private onSelect(event: UIEvent, calendarCell: ICalendarCell): void {
		if (event instanceof KeyboardEvent && event.key === 'Enter') {
			event.preventDefault();
		}
		this.selectedCell.emit(calendarCell);
	}

	private onMouseenter(event: UIEvent, calendarCell: ICalendarCell): void {
		this.mousedOverCell.emit(calendarCell);
	}

	private onMouseleave(event: UIEvent, calendarCell: ICalendarCell): void {
		this.mousedOutCell.emit(calendarCell);
	}

	private onMove(direction: string): void {
		this.direction.emit(direction);
	}

}
