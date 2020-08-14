import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-right-arrow',
	templateUrl: './right-arrow.component.html',
	styleUrls: ['./right-arrow.component.scss']
})
export class RightArrowComponent implements OnInit {

	@Input() isDisabled: boolean;
	@Output() paginationEmitter: EventEmitter<string> = new EventEmitter<string>();

	constructor() { }

	ngOnInit(): void {
	}

	private onPagination(): void {
		this.paginationEmitter.emit('right');
	}

}
