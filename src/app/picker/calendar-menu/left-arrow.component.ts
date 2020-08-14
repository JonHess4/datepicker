import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-left-arrow',
	templateUrl: './left-arrow.component.html',
	styleUrls: ['./left-arrow.component.scss']
})
export class LeftArrowComponent implements OnInit {

	@Input() isDisabled: boolean;
	@Output() paginationEmitter: EventEmitter<string> = new EventEmitter<string>();

	constructor() { }

	ngOnInit(): void {
	}

	private onPagination(): void {
		this.paginationEmitter.emit('left');
	}

}
