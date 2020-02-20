import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDatepickerMenu } from '../models/picker-menu';

@Component({
	selector: 'app-datepicker-menu',
	templateUrl: './datepicker-menu.component.html',
	styleUrls: ['./datepicker-menu.component.scss']
})
export class CalendarMenuComponent implements OnInit {

	@Input() datepickerMenu: IDatepickerMenu;
	@Output() displayToggle: EventEmitter<string> = new EventEmitter<string>();
	@Output() pagination: EventEmitter<number> = new EventEmitter<number>();

	constructor() { }

	ngOnInit(): void {
	}

	private toggleDisplay(): void {
		const newType: string = this.datepickerMenu.display === 'day' ? 'year' : 'day';
		this.displayToggle.emit(newType);
	}

	private emitNewPage(newPage: number): void {
		this.pagination.emit(newPage);
	}

}
