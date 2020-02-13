import { ComponentFactoryResolver, Directive, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { DaterangepickerCellController } from '../services/cell-controller';
import { PickerDirective } from './picker.directive';

@Directive({
	selector: '[appDaterangepicker]'
})
export class DaterangepickerDirective extends PickerDirective {

	@Input() secondInput: string;

	private daterangepickerCellController: DaterangepickerCellController = new DaterangepickerCellController();

	// the datepicker component associated with this input form
	private leftPicker: DatepickerComponent;
	private rightPicker: DatepickerComponent;
	// reference to the datepicker element
	private leftPickerElem: HTMLElement;
	private rightPickerElem: HTMLElement;

	private leftSelectedDate: Date = this.daterangepickerCellController.firstDate;
	private rightSelectedDate: Date = this.daterangepickerCellController.secondDate;

	private leftInput: HTMLInputElement = this.elementRef.nativeElement;
	private rightInput: HTMLInputElement = document.getElementById(this.secondInput) as HTMLInputElement;

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

		this.leftPicker = this.generatePickerComponent();
		this.rightPicker = this.generatePickerComponent();

		this.leftPicker.cellController = this.daterangepickerCellController;
		this.rightPicker.cellController = this.daterangepickerCellController;

		this.leftPickerElem = this.leftPicker.elementRef.nativeElement;
		this.rightPickerElem = this.rightPicker.elementRef.nativeElement;

		this.generatePickerContainer();

		this.appendPickerComponent(this.leftPickerElem);
		this.appendPickerComponent(this.rightPickerElem);

		this.leftSelectedDate = this.leftPicker.selectedDate;
		this.rightSelectedDate = this.rightPicker.selectedDate;

		this.hidePicker();
	}

	protected onEnter(targetElement: HTMLElement): void {
		super.onEnter(targetElement);
	}

	protected onClick(targetElement: HTMLElement): void {
		super.onClick(targetElement);
	}
}
