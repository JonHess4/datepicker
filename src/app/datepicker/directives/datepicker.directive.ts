import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, Type, ViewContainerRef } from '@angular/core';
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

	private oldDate: Date;

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
	}

	protected generatePickerComponent(): DatepickerComponent {
		// using the componentFactoryResolver to create, attach, and gain a reference to a datepicker component
		const datepickerComponent: Type<DatepickerComponent> = DatepickerComponent;
		const componentFactory: ComponentFactory<DatepickerComponent>
			= this.componentFactoryResolver.resolveComponentFactory(datepickerComponent);
		// this.viewContainerRef.clear();
		const componentRef: ComponentRef<DatepickerComponent> = this.viewContainerRef.createComponent(componentFactory);
		return componentRef.instance;
	}

	protected onEnter(targetElement: HTMLElement): void {
		super.onEnter(targetElement);
	}

	protected onClick(targetElement: HTMLElement): void {
		super.onClick(targetElement);
	}

	protected updateInput(targetElement: HTMLElement): void {
		const selectedDate: Date = this.datepicker.selectedDate;
		if (this.oldDate !== selectedDate && selectedDate) {
			this.oldDate = selectedDate;
			this.elementRef.nativeElement.value = selectedDate.toLocaleDateString();
			this.hidePicker();
		} else if (!selectedDate) {
			this.elementRef.nativeElement.value = null;
			this.oldDate = null;
		}
	}
}
