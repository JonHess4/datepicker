import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuPickerComponent } from '../menu-picker/menu-picker.component';
import { IDaterangepickerMenu } from '../models/picker-menu';

@Component({
	selector: 'app-menu-daterangepicker',
	templateUrl: './menu-daterangepicker.component.html',
	styleUrls: ['./menu-daterangepicker.component.scss']
})
export class MenuDaterangepickerComponent extends MenuPickerComponent implements OnInit {
	@Input() pickerMenu: IDaterangepickerMenu;

	constructor() { super(); }

	ngOnInit(): void {
	}
}
