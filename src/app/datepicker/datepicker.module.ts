import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CellDaterangepickerComponent } from './cell-daterangepicker/cell-daterangepicker.component';
import { CellPickerComponent } from './cell-picker/cell-picker.component';
import { CalendarMenuComponent } from './datepicker-menu/datepicker-menu.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DaterangepickerMenuComponent } from './daterangepicker-menu/daterangepicker-menu.component';
import { DaterangepickerComponent } from './daterangepicker/daterangepicker.component';
import { DatepickerDirective } from './directives/datepicker.directive';
import { DaterangepickerDirective } from './directives/daterangepicker.directive';

@NgModule({
	declarations: [
		CellPickerComponent,
		CalendarMenuComponent,
		DatepickerComponent,
		DatepickerDirective,
		DaterangepickerDirective,
		DaterangepickerComponent,
		DaterangepickerMenuComponent,
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
