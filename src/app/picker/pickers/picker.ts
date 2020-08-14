import { ElementRef, OnInit } from '@angular/core';
import { DateCell, ICalendarCell } from '../models/calendar-cell';
import { CalendarCellService } from '../services/calendar-cell.service';

export abstract class Picker implements OnInit {

	// the month and year that should be initially displayed when the picker is first opened, defaults to today
	protected mInitialDate: Date = new Date();
	public set initialDate(date: Date) { this.mInitialDate = date; }

	// the minimum date that can be selected
	protected mMinSelectableDate: Date;
	public set minSelectableDate(min: Date) { this.mMinSelectableDate = min; }

	// the maximum date that can be selected
	protected mMaxSelectableDate: Date;
	public set maxSelectableDate(max: Date) { this.mMaxSelectableDate = max; }

	// the cell that can be tabbed to currently
	protected mTabableCell: ICalendarCell;

	// the list of cells that are currently being displayed
	protected mCalendarCells: ICalendarCell[];

	// the list of date cells that have been selected, should only be date cells
	protected mSelectedCells: DateCell[];

	// tells us if we are currently showing dates, months or years
	protected mCurrentView: string;

	// tells us which cell is currently being hovered, only useful in the range-picker currently, should only be a date cell
	protected mHoveredCell: DateCell;

	constructor(
		protected calendarCellService: CalendarCellService,
		protected elementRef: ElementRef
	) { }

	abstract ngOnInit(): void;

	/**
	 * is called when a paging event is emitted
	 * @param direction denotes if we are paging left or right
	 */
	protected abstract onPagination(direction: string): void;

	/**
	 * is called when an event is emitted that wants to set the view
	 * @param newDisplay denotes if the new view should be dates, months or years
	 */
	protected onViewChange(newView: string): void {
		if (this.mCurrentView === newView) {
			this.mCurrentView = 'date';
		} else {
			this.mCurrentView = newView;
		}
	}

	/**
	 * is called when a cell in the picker is selected
	 * @param selectedCell the cell that was selected
	 */
	protected abstract onSelect(selectedCell: ICalendarCell): void;

	/**
	 * is called when an event is emitted for traversing the cells via events rather than via mouse
	 * @param direction the direction of traversal (up, down, left, right)
	 */
	protected abstract onTraversal(direction: string): void;

	/**
	 * is called whenever there an event emitted saying the hovered cell has changed (needs to handle both mouse hover and focus)
	 * @param newHoveredCell the cell that is hovered (or null if unhovered)
	 */
	protected abstract onHoverChange(newHoveredCell: ICalendarCell): void;

}
