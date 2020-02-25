import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPickerMenu } from '../models/picker-menu';

@Component({
	selector: 'app-menu-picker',
	template: '',
	styleUrls: ['./menu-picker.component.scss']
})
export class MenuPickerComponent implements OnInit {

	@Input() pickerMenu: IPickerMenu;
	@Input() disablePaginationLeft: boolean;
	@Input() disablePaginationRight: boolean;
	@Output() paginationEmitter: EventEmitter<number> = new EventEmitter<number>();

	constructor() { }

	ngOnInit(): void {
	}

	protected onPagination(pagesFlipped: number): void {
		if (!(this.disablePaginationLeft && pagesFlipped < 0) && !(this.disablePaginationRight && pagesFlipped > 0)) {
			this.paginationEmitter.emit(pagesFlipped);
		}
	}
}
