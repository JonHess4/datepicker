import { Component, ElementRef, OnInit } from '@angular/core';
import { CalendarCellService } from '../services/calendar-cell.service';
import { Picker } from './picker';

@Component({
	selector: 'app-multi-picker',
	templateUrl: './multi-picker.component.html',
	styleUrls: ['./multi-picker.component.scss']
})
export class MultiPickerComponent extends Picker implements OnInit {

	constructor(
		calendarCellService: CalendarCellService,
		elementRef: ElementRef
	) {
		super(calendarCellService, elementRef);
	}

	ngOnInit(): void {
	}

	protected onPagination(direction: string): void {
		throw new Error('Method not implemented.');
	}
	protected onViewChange(newDisplay: string): void {
		throw new Error('Method not implemented.');
	}
	protected onSelect(selectedCell: any): void {
		throw new Error('Method not implemented.');
	}
	protected onTraversal(direction: string): void {
		throw new Error('Method not implemented.');
	}
	protected onHoverChange(newHoveredCell: any): void {
		throw new Error('Method not implemented.');
	}
}
