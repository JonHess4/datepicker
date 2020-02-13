import { ComponentFactoryResolver, Directive, ElementRef, ViewContainerRef } from '@angular/core';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { PickerDirective } from './picker.directive';

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
	}

	// tslint:disable-next-line: use-lifecycle-interface
	ngOnInit(): void {

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

		if (this.selectedDate !== this.datepicker.selectedDate) {
			this.selectedDate = this.datepicker.selectedDate;
			this.elementRef.nativeElement.value = this.selectedDate ? this.selectedDate.toLocaleDateString() : '';
			if (this.selectedDate.toString() !== '') {
				this.hidePicker();
			}
		}
	}

	protected onClick(targetElement: HTMLElement): void {
		super.onClick(targetElement);

		if (this.selectedDate !== this.datepicker.selectedDate) {
			this.selectedDate = this.datepicker.selectedDate;
			this.elementRef.nativeElement.value = this.selectedDate ? this.selectedDate.toLocaleDateString() : '';
			if (this.selectedDate.toLocaleDateString() !== '') {
				this.hidePicker();
			}
		}
	}
}
