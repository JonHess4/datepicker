import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CalendarCellComponent } from './calendar-cell/calendar-cell.component';
import { LeftArrowComponent } from './calendar-menu/left-arrow.component';
import { MonthLabelComponent } from './calendar-menu/month-label.component';
import { RightArrowComponent } from './calendar-menu/right-arrow.component';
import { UpDownArrowComponent } from './calendar-menu/up-down-arrow.component';
import { PickerDirective } from './directives/picker.directive';
import { DatePickerComponent } from './pickers/date-picker.component';
import { MultiPickerComponent } from './pickers/multi-picker.component';
import { RangePickerComponent } from './pickers/range-picker.component';

@NgModule({
	declarations: [
		PickerDirective,
		CalendarCellComponent,
		DatePickerComponent,
		MultiPickerComponent,
		RangePickerComponent,
		LeftArrowComponent,
		RightArrowComponent,
		UpDownArrowComponent,
		MonthLabelComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		DatePickerComponent
	]
})
export class PickerModule { }
