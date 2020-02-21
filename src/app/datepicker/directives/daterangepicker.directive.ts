import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, Input, Type, ViewContainerRef } from '@angular/core';
import { DaterangepickerComponent } from '../daterangepicker/daterangepicker.component';
import { PickerDirective } from './picker.directive';

@Directive({
	selector: '[appDaterangepicker]'
})
export class DaterangepickerDirective extends PickerDirective {

	@Input() secondInput: string;

	// the datepicker component associated with this input form
	protected pickerComponent: DaterangepickerComponent;

	private leftInput: HTMLInputElement;
	private rightInput: HTMLInputElement;

	private oldStartDate: Date;
	private oldEndDate: Date;

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

		this.pickerComponent = this.generatePickerComponent();

		this.pickerElement = this.pickerComponent.elementRef.nativeElement;

		this.generatePickerContainer();

		this.appendPickerComponent(this.pickerElement);

		this.leftInput = this.elementRef.nativeElement;
		this.rightInput = document.getElementById(this.secondInput) as HTMLInputElement;

		this.rightInput.addEventListener('focus', this.showPicker.bind(this));

		this.hidePicker();
	}

	protected generatePickerComponent(): DaterangepickerComponent {
		// using the componentFactoryResolver to create, attach, and gain a reference to a datepicker component
		const daterangepickerComponent: Type<DaterangepickerComponent> = DaterangepickerComponent;
		const componentFactory: ComponentFactory<DaterangepickerComponent>
			= this.componentFactoryResolver.resolveComponentFactory(daterangepickerComponent);
		// this.viewContainerRef.clear();
		const componentRef: ComponentRef<DaterangepickerComponent> = this.viewContainerRef.createComponent(componentFactory);
		return componentRef.instance;
	}

	protected onEnter(targetElement: HTMLElement): void {
		super.onEnter(targetElement);
	}

	protected onClick(targetElement: HTMLElement): void {
		super.onClick(targetElement);
	}

	protected updateInput(): void {
	}

	private cloneDate(date: Date): Date {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate());
	}
}
