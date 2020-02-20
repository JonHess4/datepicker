import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarCellComponent } from './calendar-cell/calendar-cell.component';
import { CalendarMenuComponent } from './datepicker-menu/datepicker-menu.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DaterangepickerMenuComponent } from './daterangepicker-menu/daterangepicker-menu.component';
import { DaterangepickerComponent } from './daterangepicker/daterangepicker.component';
import { DatepickerDirective } from './directives/datepicker.directive';
import { DaterangepickerDirective } from './directives/daterangepicker.directive';
import { PickerComponent } from './picker/picker.component';

@NgModule({
	declarations: [
		CalendarCellComponent,
		CalendarMenuComponent,
		DatepickerComponent,
		DatepickerDirective,
		DaterangepickerDirective,
		DaterangepickerComponent,
		DaterangepickerMenuComponent,
		PickerComponent
	],
	imports: [
		CommonModule
	],
	entryComponents: [
		DatepickerComponent
	],
	exports: [
		DatepickerComponent,
		DatepickerDirective,
		DaterangepickerComponent,
		DaterangepickerDirective
	]
})
export class DatepickerModule { }
