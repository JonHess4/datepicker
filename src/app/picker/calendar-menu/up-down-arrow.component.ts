import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-up-down-arrow',
	templateUrl: './up-down-arrow.component.html',
	styleUrls: ['./up-down-arrow.component.scss']
})
export class UpDownArrowComponent implements OnInit {

	@Input() currentView: string;
	@Output() viewToggleEmitter: EventEmitter<string> = new EventEmitter<string>();

	constructor() { }

	ngOnInit(): void {}

	private toggleView(): void {
		const newView = (this.currentView === 'date' ? 'year' : 'date');
		this.viewToggleEmitter.emit(newView);
	}

}
