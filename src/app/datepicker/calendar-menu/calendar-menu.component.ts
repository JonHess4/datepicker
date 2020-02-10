import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICalendarMenu } from '../models/calendar-menu';

@Component({
	selector: 'app-calendar-menu',
	templateUrl: './calendar-menu.component.html',
	styleUrls: ['./calendar-menu.component.scss']
})
export class CalendarMenuComponent implements OnInit {

	@Input() calendarMenu: ICalendarMenu;
	@Output() displayToggle: EventEmitter<string> = new EventEmitter<string>();
	@Output() pagination: EventEmitter<number> = new EventEmitter<number>();

	constructor() { }

	ngOnInit(): void {
	}

	private toggleDisplay(): void {
		const newType: string = this.calendarMenu.type === 'day' ? 'year' : 'day';
		this.displayToggle.emit(newType);
	}

	private emitNewPage(newPage: number): void {
		this.pagination.emit(newPage);
	}

}
