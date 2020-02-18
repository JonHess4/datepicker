import { ComponentFactoryResolver, Directive, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { IDateCell } from '../models/calendar-cell';
import { CalendarCellService } from '../services/calendar-cell.service';
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

	private leftInput: HTMLInputElement;
	private rightInput: HTMLInputElement;

	protected selectedDateResolver: DaterangepickerSelectedDateResolver;

	private oldStartDate: Date;
	private oldEndDate: Date;

	constructor(
		elementRef: ElementRef,
		componentFactoryResolver: ComponentFactoryResolver,
		viewContainerRef: ViewContainerRef,
		private calendarCellService: CalendarCellService
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

		this.rightInput.addEventListener('focus', this.showPicker.bind(this));

		this.hidePicker();
	}

	protected onEnter(targetElement: HTMLElement): void {
		super.onEnter(targetElement);

		this.keepOrder();
	}

	protected onClick(targetElement: HTMLElement): void {
		super.onClick(targetElement);

		this.keepOrder();
	}

	private keepOrder(): void {
		if (this.leftPicker.trackerDate >= this.rightPicker.trackerDate) {
			const year: number = this.leftPicker.trackerDate.getFullYear();
			const month: number = this.leftPicker.trackerDate.getMonth() + 1;
			this.rightPicker.trackerDate = new Date(year, month, 1);
			this.rightPicker.update();
		}
	}

	protected updateInput(): void {
		const startDate: Date = this.selectedDateResolver.startDate;
		const endDate: Date = this.selectedDateResolver.endDate;
		this.leftInput.value = startDate ? startDate.toLocaleDateString() : '';
		this.rightInput.value = endDate ? endDate.toLocaleDateString() : '';

		let earlierDate: Date;
		let laterDate: Date;

		if (this.oldStartDate && this.oldStartDate < startDate) {
			earlierDate = this.cloneDate(this.oldStartDate);
		} else {
			earlierDate = this.cloneDate(startDate);
		}
		this.oldStartDate = this.cloneDate(startDate);

		if (this.oldEndDate && this.oldEndDate > endDate) {
			laterDate = this.cloneDate(this.oldEndDate);
		} else if (endDate) {
			laterDate = this.cloneDate(endDate);
		} else if (this.oldEndDate) {
			laterDate = this.cloneDate(this.oldEndDate);
		}

		if (endDate) {
			this.oldEndDate = this.cloneDate(endDate);
		}

		const trackerDate: Date = this.cloneDate(earlierDate);
		trackerDate.setDate(1);
		let dateCells: IDateCell[];
		let dateCell: IDateCell;
		let monthOffset: number;
		let numDaysInMonth: number;

		while (trackerDate <= laterDate) {
			dateCells = this.calendarCellService.getDateCells(this.key, trackerDate.getMonth(), trackerDate.getFullYear());
			monthOffset = this.calendarCellService.getMonthOffset(trackerDate.getMonth(), trackerDate.getFullYear());
			numDaysInMonth = this.calendarCellService.getNumDaysInMonth(trackerDate);
			for (let i: number = monthOffset; i < numDaysInMonth + monthOffset; i++ ) {
				dateCell = dateCells[i];
				dateCell.fillBoxLeft = (dateCell.date > startDate && dateCell.date <= endDate);
				dateCell.fillBoxRight = (dateCell.date >= startDate && dateCell.date < endDate);
			}
			trackerDate.setMonth(trackerDate.getMonth() + 1);
		}
	}

	private cloneDate(date: Date): Date {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate());
	}
}
