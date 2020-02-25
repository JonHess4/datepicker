import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuPickerComponent } from '../menu-picker/menu-picker.component';
import { IDatepickerMenu } from '../models/picker-menu';

@Component({
	selector: 'app-menu-datepicker',
	templateUrl: './menu-datepicker.component.html',
	styleUrls: ['./menu-datepicker.component.scss']
})
export class MenuDatepickerComponent extends MenuPickerComponent implements OnInit {

	@Input() pickerMenu: IDatepickerMenu;
	@Output() displayToggle: EventEmitter<string> = new EventEmitter<string>();

	constructor() { super(); }

	ngOnInit(): void {
	}

	private toggleDisplay(): void {
		const newType: string = this.pickerMenu.display === 'day' ? 'year' : 'day';
		this.displayToggle.emit(newType);
	}

}
