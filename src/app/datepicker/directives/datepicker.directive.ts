import { ComponentFactoryResolver, Directive, ElementRef, ViewContainerRef } from '@angular/core';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { PickerDirective } from './picker.directive';
import { DatepickerCellController } from '../services/cell-controller';

@Directive({
	selector: '[appDatepicker]'
})
export class DatepickerDirective extends PickerDirective {

	// the datepicker component associated with this input form
	private datepicker: DatepickerComponent;
	// reference to the datepicker element
	private pickerElem: HTMLElement;
	// the currently selected Date
	private selectedDate: Date;

	constructor(
		elementRef: ElementRef,
		componentFactoryResolver: ComponentFactoryResolver,
		viewContainerRef: ViewContainerRef
	) {
		super(elementRef, componentFactoryResolver, viewContainerRef);
		this.init();
	}

	private init(): void {

		this.setParentElement(this.elementRef.nativeElement);

		this.datepicker = this.generatePickerComponent();
		this.pickerElem = this.datepicker.elementRef.nativeElement;

		this.generatePickerContainer();
		this.appendPickerComponent(this.pickerElem);

		this.selectedDate = this.datepicker.selectedDate;

		this.hidePicker();
	}

	protected onEnter(targetElement: HTMLElement): void {
		super.onEnter(targetElement);

		if (this.pickerElem.contains(targetElement) && this.selectedDate !== this.datepicker.selectedDate) {
			this.selectedDate = this.datepicker.selectedDate;
			this.setInputValue(this.elementRef.nativeElement, this.selectedDate.toString());
			if (this.selectedDate.toString() !== '') {
				this.hidePicker();
			}
		}
	}

	protected onClick(targetElement: HTMLElement): void {
		super.onClick(targetElement);

		if (this.selectedDate !== this.datepicker.selectedDate) {
			this.selectedDate = this.datepicker.selectedDate;
			this.setInputValue(this.elementRef.nativeElement, this.selectedDate.toLocaleDateString());
			if (this.selectedDate.toLocaleDateString() !== '') {
				this.hidePicker();
			}
		}
	}
}
