// tslint:disable-next-line: max-line-length
import { ComponentFactoryResolver, ElementRef, HostListener, Input, OnInit, ViewContainerRef } from '@angular/core';
import { PickerComponent } from '../picker.component';

export abstract class PickerDirective implements OnInit {

	@Input() min: any;
	@Input () max: any;

	// a reference to the parent element of this input form that contains both this input form and the pickerContainer
	protected parentElement: HTMLElement;
	// the element to put the datepicker(s) in and control their visibility on the screen
	protected pickerContainer: HTMLElement;

	protected pickerComponent: PickerComponent;

	protected pickerElement: HTMLElement;

	protected readonly key: number = Math.floor(Math.random() * 10000);

	constructor(
		protected elementRef: ElementRef,
		protected componentFactoryResolver: ComponentFactoryResolver,
		protected viewContainerRef: ViewContainerRef
	) { }

	abstract ngOnInit(): void;

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

	protected abstract generatePickerComponent(): PickerComponent;

	protected generatePickerContainer(): void {
		this.pickerContainer = document.createElement('div');
		this.parentElement.appendChild(this.pickerContainer);
		this.pickerContainer.style.position = 'absolute';
		this.pickerContainer.style.top = '100%';
		this.pickerContainer.style.left = '0%';
		this.pickerContainer.style.zIndex = '9999';
		this.pickerContainer.style.borderRadius = '5px';
		this.pickerContainer.style.boxShadow = '1px 1px 5px grey';
		this.pickerContainer.style.backgroundColor = 'white';
	}

	protected appendPickerComponent(pickerElem: HTMLElement): void {
		this.pickerContainer.appendChild(pickerElem);
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

		if (this.pickerContainer.contains(targetElement) && targetElement.classList.contains('circle')) {
			this.updateInput(targetElement);
		}
	}

	@HostListener('document:click', ['$event.target'])
	protected onClick(targetElement: HTMLElement): void {
		if (!this.parentElement.contains(targetElement)) {
			this.hidePicker();
		} else if (this.elementRef.nativeElement === targetElement) {
			this.showPicker();
		}

		if (this.pickerContainer.contains(targetElement) && targetElement.classList.contains('circle')) {
			this.updateInput(targetElement);
		}
	}

	protected abstract updateInput(targetElement: HTMLElement): void;

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
