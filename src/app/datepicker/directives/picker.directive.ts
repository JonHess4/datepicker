import { ComponentFactory, ComponentFactoryResolver, ComponentRef, ElementRef, HostListener, Type, ViewContainerRef } from '@angular/core';
import { DatepickerComponent } from '../datepicker/datepicker.component';

export abstract class PickerDirective {

	// a reference to the parent element of this input form that contains both this input form and the pickerContainer
	protected parentElement: HTMLElement;
	// the element to put the datepicker(s) in and control their visibility on the screen
	protected pickerContainer: HTMLElement;

	private readonly key: number = Math.floor(Math.random() * 10000);

	constructor(
		protected elementRef: ElementRef,
		protected componentFactoryResolver: ComponentFactoryResolver,
		protected viewContainerRef: ViewContainerRef
	) { }

	protected setParentElement(childElement: HTMLInputElement): void {
		// a parent element is required for this directive to work
		this.parentElement = childElement.parentElement;
		try {
			this.parentElement.style.position = 'relative';
		} catch (exception) {
			// customized message to help person using this understand why it is crashing
			if (!this.parentElement) {
				console.error('Error: no parent element found for: ');
				console.error(this.elementRef.nativeElement);
			}
			// and then we throw the exception
			throw (exception);
		}
	}

	protected generatePickerComponent(): DatepickerComponent {
		// using the componentFactoryResolver to create, attach, and gain a reference to a datepicker component
		const datepickerComponent: Type<DatepickerComponent> = DatepickerComponent;
		const componentFactory: ComponentFactory<DatepickerComponent>
			= this.componentFactoryResolver.resolveComponentFactory(datepickerComponent);
		// this.viewContainerRef.clear();
		const componentRef: ComponentRef<DatepickerComponent> = this.viewContainerRef.createComponent(componentFactory);
		componentRef.instance.key = this.key;
		return componentRef.instance;
	}

	protected generatePickerContainer(): void {
		this.pickerContainer = document.createElement('div');
		this.parentElement.appendChild(this.pickerContainer);
		this.pickerContainer.style.position = 'absolute';
		this.pickerContainer.style.top = '100%';
		this.pickerContainer.style.left = '0%';
		this.pickerContainer.style.zIndex = '9999';
	}

	protected appendPickerComponent(pickerElem: HTMLElement): void {
		this.pickerContainer.appendChild(pickerElem);
	}

	protected setInputValue(input: HTMLInputElement, newValue: string): void {
		input.value = newValue;
	}

	@HostListener('focus')
	protected onFocus(): void {
		this.showPicker();
	}

	@HostListener('document:keydown.enter', ['$event.target'])
	protected onEnter(targetElement: HTMLElement): void {
		if (this.pickerContainer.classList.contains('show') && this.elementRef.nativeElement === targetElement) {
			this.hidePicker();
		}
	}

	@HostListener('document:click', ['$event.target'])
	protected onClick(targetElement: HTMLElement): void {
		if (!this.parentElement.contains(targetElement) && !targetElement.classList.contains('year-item')) {
			this.hidePicker();
		} else if (this.elementRef.nativeElement === targetElement) {
			this.showPicker();
		}
	}

	// This closes datepicker if the user tabs out of the container.
	@HostListener('document:keyup.tab')
	@HostListener('document:keyup.shift.tab')
	protected onTab(): void {
		if (!this.parentElement.contains(document.activeElement)) {
			this.hidePicker();
		}
	}

	@HostListener('document:keydown.escape')
	protected onEscape(): void {
		this.hidePicker();
	}

	protected showPicker(): void {
		this.pickerContainer.classList.add('show');
		this.pickerContainer.classList.remove('hide');
	}

	protected hidePicker(): void {
		this.pickerContainer.classList.add('hide');
		this.pickerContainer.classList.remove('show');
	}
}
