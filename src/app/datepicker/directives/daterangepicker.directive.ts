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

	private leftInput: HTMLInputElement = this.elementRef.nativeElement;
	private rightInput: HTMLInputElement;

	constructor(
		elementRef: ElementRef,
		componentFactoryResolver: ComponentFactoryResolver,
		viewContainerRef: ViewContainerRef
	) {
		super(elementRef, componentFactoryResolver, viewContainerRef);
	}

	ngOnInit(): void {

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

		this.hidePicker();

		this.rightInput = document.getElementById(this.secondInput) as HTMLInputElement;
	}

	protected onEnter(targetElement: HTMLElement): void {
		super.onEnter(targetElement);

		this.setInputValues(this.daterangepickerCellController.startDate, this.daterangepickerCellController.endDate);
	}

	protected onClick(targetElement: HTMLElement): void {
		super.onClick(targetElement);

		this.setInputValues(this.daterangepickerCellController.startDate, this.daterangepickerCellController.endDate);
	}

	private setInputValues(startDate: Date, endDate: Date): void {
		this.leftInput.value = startDate ? startDate.toLocaleDateString() : '';
		this.rightInput.value = endDate ? endDate.toLocaleDateString() : '';
	}
}
