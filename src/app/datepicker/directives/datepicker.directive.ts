import { ComponentFactoryResolver, Directive, ElementRef, ViewContainerRef } from '@angular/core';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { DatepickerDateCellStyler } from '../services/date-cell-styler';
import { PickerDirective } from './picker.directive';

@Directive({
	selector: '[appDatepicker]'
})
export class DatepickerDirective extends PickerDirective {

	// the datepicker component associated with this input form
	private datepicker: DatepickerComponent;
	// reference to the datepicker element
	private pickerElem: HTMLElement;

	private datepickerDateCellStyler: DatepickerDateCellStyler = new DatepickerDateCellStyler();

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

		this.hidePicker();

		this.datepicker.dateCellStyler = this.datepickerDateCellStyler;
	}

	protected onEnter(targetElement: HTMLElement): void {
		super.onEnter(targetElement);

		this.updateInputValue(targetElement);
	}

	protected onClick(targetElement: HTMLElement): void {
		super.onClick(targetElement);

		this.updateInputValue(targetElement);
	}

	private updateInputValue(targetElement: HTMLElement): void {
		if (this.pickerElem.contains(targetElement) && targetElement.classList.contains('circle')) {
			const selectedDate: Date = this.datepickerDateCellStyler.selectedDate;
			this.elementRef.nativeElement.value = selectedDate ? selectedDate.toLocaleDateString() : '';
			if (this.elementRef.nativeElement.value !== '') {
				this.hidePicker();
			}
		}
	}
}
