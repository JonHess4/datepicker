import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DatepickerModule } from './datepicker/datepicker.module';
import { PickerModule } from './picker/picker.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		DatepickerModule,
		PickerModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
