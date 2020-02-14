import { ComponentFactoryResolver, Directive, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { DaterangepickerSelectedDateResolver } from '../services/selected-date-resolver';
import { PickerDirective } from './picker.directive';

@Directive({
	selector: '[appDaterangepicker]'
})
export class DaterangepickerDirective extends PickerDirective {

	@Input() secondInput: string;

	// the datepicker component associated with this input form
	private leftPicker: DatepickerComponent;
	private rightPicker: DatepickerComponent;
	// reference to the datepicker element
	private leftPickerElem: HTMLElement;
	private rightPickerElem: HTMLElement;
	//
	private leftTrackerDate: Date;
	private rightTrackerDate: Date;

	private leftInput: HTMLInputElement;
	private rightInput: HTMLInputElement;

	protected selectedDateResolver: DaterangepickerSelectedDateResolver;

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

		this.leftPicker = this.generatePickerComponent();
		this.rightPicker = this.generatePickerComponent();

		this.selectedDateResolver = new DaterangepickerSelectedDateResolver();
		this.leftPicker.selectedDateResolver = this.selectedDateResolver;
		this.rightPicker.selectedDateResolver = this.selectedDateResolver;

		this.leftPickerElem = this.leftPicker.elementRef.nativeElement;
		this.rightPickerElem = this.rightPicker.elementRef.nativeElement;

		this.generatePickerContainer();

		this.appendPickerComponent(this.leftPickerElem);
		this.appendPickerComponent(this.rightPickerElem);

		this.leftInput = this.elementRef.nativeElement;
		this.rightInput = document.getElementById(this.secondInput) as HTMLInputElement;

		this.leftTrackerDate = this.leftPicker.trackerDate;
		this.rightTrackerDate = this.rightPicker.trackerDate;

		this.hidePicker();
	}

	protected onEnter(targetElement: HTMLElement): void {
		super.onEnter(targetElement);
	}

	protected onClick(targetElement: HTMLElement): void {
		super.onClick(targetElement);
	}

	protected updateInput(): void {
		const startDate: Date = this.selectedDateResolver.startDate;
		const endDate: Date = this.selectedDateResolver.endDate;
		this.leftInput.value = startDate ? startDate.toLocaleDateString() : '';
		this.rightInput.value = endDate ? endDate.toLocaleDateString() : '';
	}
}
