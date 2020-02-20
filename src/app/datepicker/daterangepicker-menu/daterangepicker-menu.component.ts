import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDaterangepickerMenu } from '../models/picker-menu';

@Component({
	selector: 'app-daterangepicker-menu',
	templateUrl: './daterangepicker-menu.component.html',
	styleUrls: ['./daterangepicker-menu.component.scss']
})
export class DaterangepickerMenuComponent implements OnInit {
	@Input() daterangepickerMenu: IDaterangepickerMenu;
	@Output() leftDisplayEmitter: EventEmitter<string> = new EventEmitter<string>();
	@Output() rightDisplayEmitter: EventEmitter<string> = new EventEmitter<string>();
	@Output() leftPaginationEmitter: EventEmitter<number> = new EventEmitter<number>();
	@Output() rightPaginationEmitter: EventEmitter<number> = new EventEmitter<number>();

	constructor() { }

	ngOnInit(): void {
	}

	private onDisplayChangeLeft(newDisplay: string): void {
		if (this.daterangepickerMenu.leftMenu.display === newDisplay) {
			newDisplay = 'day';
		}
		this.leftDisplayEmitter.emit(newDisplay);
	}

	private onDisplayChangeRight(newDisplay: string): void {
		if (this.daterangepickerMenu.rightMenu.display === newDisplay) {
			newDisplay = 'day';
		}
		this.rightDisplayEmitter.emit(newDisplay);
	}

	private onPaginationLeft(pagesFlipped: number): void {
		this.leftPaginationEmitter.emit(pagesFlipped);
	}

	private onPaginationRight(pagesFlipped: number): void {
		this.rightPaginationEmitter.emit(pagesFlipped);
	}

}
