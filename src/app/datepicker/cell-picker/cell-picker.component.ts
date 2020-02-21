import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';
import { ICalendarCell } from '../models/picker-cell';

@Component({
	selector: 'app-cell-picker',
	templateUrl: './cell-picker.component.html',
	styleUrls: ['./cell-picker.component.scss']
})
export class CellPickerComponent implements OnInit {

	@Input() calendarCell: ICalendarCell;
	@Output() selectEmitter: EventEmitter<ICalendarCell> = new EventEmitter<ICalendarCell>();
	@Output() traversalEmitter: EventEmitter<string> = new EventEmitter<string>();

	constructor() { }

	ngOnInit(): void {}

	protected onSelect(event: UIEvent, calendarCell: ICalendarCell): boolean {
		this.selectEmitter.emit(calendarCell);
		return false;
	}

	protected onTraversal(direction: string): void {
		this.traversalEmitter.emit(direction);
	}

}
