import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-month-label',
	templateUrl: './month-label.component.html',
	styleUrls: ['./month-label.component.scss']
})
export class MonthLabelComponent implements OnInit {

	@Input() month: string;
	@Input() year: number;
	@Output() viewChangeEmitter: EventEmitter<string> = new EventEmitter<string>();

	constructor() { }

	ngOnInit(): void {
	}

	private changeView(newView: string): void {
		this.viewChangeEmitter.emit(newView);
	}

}
