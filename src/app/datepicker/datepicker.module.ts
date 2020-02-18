import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarCellComponent } from './calendar-cell/calendar-cell.component';
import { CalendarMenuComponent } from './calendar-menu/datepicker-menu.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DatepickerDirective } from './directives/datepicker.directive';
import { DaterangepickerDirective } from './directives/daterangepicker.directive';
import { DaterangepickerComponent } from './daterangepicker/daterangepicker.component';

@NgModule({
	declarations: [
		CalendarCellComponent,
		CalendarMenuComponent,
		DatepickerComponent,
		DatepickerDirective,
		DaterangepickerDirective,
		DaterangepickerComponent
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
		DaterangepickerDirective
	]
})
export class DatepickerModule { }
