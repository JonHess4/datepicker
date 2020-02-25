import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CellDaterangepickerComponent } from './cell-daterangepicker/cell-daterangepicker.component';
import { CellPickerComponent } from './cell-picker/cell-picker.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DaterangepickerComponent } from './daterangepicker/daterangepicker.component';
import { DatepickerDirective } from './directives/datepicker.directive';
import { DaterangepickerDirective } from './directives/daterangepicker.directive';
import { MenuDatepickerComponent } from './menu-datepicker/menu-datepicker.component';
import { MenuDaterangepickerComponent } from './menu-daterangepicker/menu-daterangepicker.component';

@NgModule({
	declarations: [
		CellPickerComponent,
		MenuDatepickerComponent,
		DatepickerComponent,
		DatepickerDirective,
		DaterangepickerDirective,
		DaterangepickerComponent,
		MenuDaterangepickerComponent,
		CellDaterangepickerComponent
	],
	imports: [
		CommonModule
	],
	entryComponents: [
		DatepickerComponent,
		DaterangepickerComponent
	],
	exports: [
		DatepickerComponent,
		DatepickerDirective,
		DaterangepickerComponent,
		DaterangepickerDirective
	]
})
export class DatepickerModule { }
